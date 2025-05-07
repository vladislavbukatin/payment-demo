import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Typography, Button, FormControlLabel, Checkbox, Modal, CircularProgress, Backdrop } from "@mui/material";
import {
  Container,
  ErrorIcon,
  FullScreenIframe,
  LogoWrapper,
  ModalContent,
  PaymentBox,
  SuccessIcon,
  TermsWrapper,
  ThemeIconButton,
} from "./styled";
import CardDetailsForm from "../CardDetailsForm";
import { DarkMode, LightMode } from "@mui/icons-material";
import PropTypes from 'prop-types';
import lightLogo from "../../../assets/logo-light.svg";
import darkLogo from "../../../assets/logo-dark.svg";
import logError from "../../utils/logger";
import CurrencyRate from "../CurrencyRate";
import { getApiKeyByCustomer } from "../../utils/getCustomerApiKey";

const ORDER_ID = "ORDER_ID";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const PaymentForm = ({ isDarkMode, setIsDarkMode }) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    amount: "",
    currency: "USD",
    saveCard: false,
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [ddcUrl, setDdcUrl] = useState(null);
  const [challengeUrl, setChallengeUrl] = useState(null);
  const [transactionReference, setTransactionReference] = useState(null);
  const [challengeRef, setChallengeRef] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [modalDisableClose, setModalDisableClose] = useState(false);
  const apiKey = getApiKeyByCustomer(customerId);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const customerId = queryParams.get("customerId");
  
    if (!customerId) {
      handleOpenModal("Missing customer ID. Please check the URL.", false, true);
      return;
    }
  
    setCustomerId(customerId);
  }, []);

  useEffect(() => {
    const handleMessage = async (event) => {
      if (!event.data) return;
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        if (data.MessageType === "profile.completed") {
          await authenticate3DS(data.SessionId);
        }

        if (data.MessageType === "3dsauthenticated") {
          setChallengeUrl(null);
          await verify3DS();
        }
      } catch (error) {
        console.error("Error processing message: ", error);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [transactionReference, challengeRef]);

  const handleOpenModal = (message, success = false, disableClose = false) => {
    setModalMessage(message);
    setIsSuccess(success);
    setModalOpen(true);
    setModalDisableClose(disableClose);
    setLoading(false);
  };

  const handleCloseModal = () => {
    if (modalDisableClose) return;
    setModalOpen(false);
    if (isSuccess) {
      window.location.href = "/";
    }
  };

  const initializePayment = useCallback(async () => {
    setLoading(true);
    try {
      const payload = {
        customer: customerId,
        co: "al",
        product: "1000",
        productdescription: "IPTV subscription sale",
        cc: paymentData.cardNumber.replace(/\D/g, ""),
        cvv: paymentData.cvv,
        expmo: paymentData.expiryMonth,
        expyr: paymentData.expiryYear,
        cardholder: paymentData.cardHolder,
        amount: paymentData.amount,
        currency: paymentData.currency,
        usdc: "",
        pool: "",
        apikey: apiKey,
        externalid: ORDER_ID,
        customeremail: paymentData.email,
      };

      const response = await axios.post(`${API_BASE_URL}/wp3dsinit`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.transactionReference) {
        setTransactionReference(response.data.transactionReference);
        setDdcUrl(
          `${API_BASE_URL}/wp3dsddc?url=${encodeURIComponent(response.data.deviceDataCollection.url)}&bin=${response.data.deviceDataCollection.bin}&jwt=${response.data.deviceDataCollection.jwt}`
        );
      }
    } catch (error) {
      logError("Error initializing payment", error);
      handleOpenModal("Payment initialization failed. Please try again.");
    }
  }, [paymentData]);

  const authenticate3DS = useCallback(async (sessionId) => {
    try {
      if (!transactionReference) return;

      const payload = {
        customer: customerId,
        co: "al",
        product: "1000",
        productdescription: "IPTV subscription sale",
        cc: paymentData.cardNumber.replace(/\D/g, ""),
        cvv: paymentData.cvv,
        expmo: paymentData.expiryMonth,
        expyr: paymentData.expiryYear,
        cardholder: paymentData.cardHolder,
        amount: paymentData.amount,
        currency: paymentData.currency,
        usdc: "",
        pool: "",
        apikey: apiKey,
        externalid: ORDER_ID,
        customeremail: paymentData.email,
        colref: sessionId,
        refid: transactionReference,
      };

      const response = await axios.post(`${API_BASE_URL}/wp3dsauth`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.url) {
        setChallengeRef(response.data.reference);
        setChallengeUrl(
          `${API_BASE_URL}/wp3dschallengeform?url=${encodeURIComponent(response.data.url)}&jwt=${response.data.jwt}&md=${response.data.md}`
        );
      } else {
        await finalizePayment(response.data);
      }
    } catch (error) {
      logError("Error authenticating 3DS", error);
      console.error("Error authenticating 3DS", error);
      handleOpenModal("3DS Authentication failed. Please try again.");
    }
  }, [transactionReference, paymentData]);

  const verify3DS = useCallback(async () => {
    try {
      if (!transactionReference || !challengeRef) return;

      const payload = {
        refid: transactionReference,
        challengeref: challengeRef,
        customer: customerId,
      };

      const response = await axios.post(`${API_BASE_URL}/wp3dsverify`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.outcome === "authenticated") {
        await finalizePayment(response.data.authentication);
      } else {
        handleOpenModal("3DS Verification failed. Please try again.");
      }
    } catch (error) {
      logError("Error verifying 3DS", error);
      handleOpenModal("3DS Verification failed. Please try again.");
    }
  }, [transactionReference, challengeRef]);

  const finalizePayment = useCallback(async (auth3ds) => {
    try {
      if (!transactionReference) return;

      const payload = {
        customer: customerId,
        co: "al",
        product: "1000",
        productdescription: "IPTV subscription sale",
        cc: paymentData.cardNumber.replace(/\D/g, ""),
        cvv: paymentData.cvv,
        expmo: paymentData.expiryMonth,
        expyr: paymentData.expiryYear,
        cardholder: paymentData.cardHolder,
        amount: paymentData.amount,
        currency: paymentData.currency,
        usdc: "",
        pool: "",
        apikey: apiKey,
        externalid: ORDER_ID,
        customeremail: paymentData.email,
        refid: transactionReference,
        ...(auth3ds ? { auth3ds } : {}),
      };

      await axios.post(`${API_BASE_URL}/wppay`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      handleOpenModal("Payment successful! Thank you.", true);
    } catch (error) {
      logError("Error finalizing payment", error);
      handleOpenModal("Final payment failed. Please try again.");
    }
  }, [transactionReference, paymentData]);

  const validateField = (name, value) => {
    let error = "";

    if (name === "cardNumber") {
      if (!value.trim()) error = "Card number is required";
      else if (!/^\d{16}$/.test(value.replace(/\s/g, ""))) error = "Invalid card number (16 digits required)";
    }

    if (name === "cardHolder") {
      if (!value.trim()) error = "Cardholder name is required";
    }

    if (name === "expiryMonth" || name === "expiryYear") {
      if (!paymentData.expiryMonth || !paymentData.expiryYear) error = "Expiration date is required";
      else if (!/^\d{2}$/.test(paymentData.expiryMonth) || !/^\d{2}$/.test(paymentData.expiryYear)) error = "Invalid format (MM/YY)";
    }

    if (name === "cvv") {
      if (!value) error = "CVV is required";
      else if (!/^\d{3}$/.test(value)) error = "Invalid CVV (3 digits required)";
    }

    if (name === "amount") {
      if (!value) error = "Payment amount is required";
      else if (parseFloat(value) <= 0) error = "Amount must be greater than 0";
    }

    if (name === "termsAccepted") {
      if (!value) error = "You must accept the terms & policy";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const validateForm = useCallback(() => {
    const errors = Object.keys(paymentData).map((field) => validateField(field, paymentData[field]));
    return Object.values(errors).every((err) => err === "");
  }, [paymentData]);

  const handleContinue = (e) => {
    e.preventDefault();
    if (validateForm()) {
      initializePayment();
    }
  };

  return (
    <Container>
      <PaymentBox>
        <LogoWrapper>
          <img src={isDarkMode ? darkLogo : lightLogo} alt="Logo" />
          <ThemeIconButton onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </ThemeIconButton>
        </LogoWrapper>
        <Typography variant="h6" className="payment-title">
          Confirm payment details
        </Typography>
        <CurrencyRate currency={paymentData.currency} />
        <CardDetailsForm
          paymentData={paymentData}
          errors={errors}
          setErrors={setErrors}
          setPaymentData={setPaymentData}
          validateField={validateField}
        />
        <Button
          disabled={Object.keys(errors).some((key) => errors[key])}
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleContinue}
        >
          Continue
        </Button>
        <TermsWrapper>
          <FormControlLabel
            control={
              <Checkbox
                checked={paymentData.termsAccepted}
                onBlur={(e) => validateField("termsAccepted", e.target.checked)}
                onChange={(e) => setPaymentData({ ...paymentData, termsAccepted: e.target.checked })}
              />
            }
            label={
              <Typography variant="body2" color={errors.termsAccepted ? "error" : "textPrimary"}>
                I&apos;ve read and accept <a>Terms & Policy</a>
              </Typography>
            }
          />
        </TermsWrapper>
        {ddcUrl && <iframe title="3DS DDC" src={ddcUrl} style={{ display: "none", zIndex: 9999 }} />}
        {challengeUrl && <FullScreenIframe title="3DS Challenge" src={challengeUrl} />}
      </PaymentBox>

      <Backdrop open={loading} sx={{ zIndex: 2, color: "#ffffff" }}>
        <CircularProgress size={50} color="inherit" />
      </Backdrop>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <ModalContent>
          {isSuccess ? <SuccessIcon /> : <ErrorIcon />}
          <Typography>{modalMessage}</Typography>
          <Button onClick={handleCloseModal} fullWidth variant="contained">
            {isSuccess ? "Return to Home" : "Try Again"}
          </Button>
        </ModalContent>
      </Modal>
    </Container>
  );
};

PaymentForm.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  setIsDarkMode: PropTypes.func.isRequired
};

export default PaymentForm;