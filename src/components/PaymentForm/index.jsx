import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Typography, Button, FormControlLabel, Checkbox, Modal } from "@mui/material";
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
import lightLogo from "../../../assets/logo-light.svg";
import darkLogo from "../../../assets/logo-dark.svg";

const CUSTOMER_ID = "502N12P6";
const API_KEY = "b7691ebb-2ba8-469a-abb2-bfb469f23aac";
const ORDER_ID = "ORDER_ID";
const PAYMENT_AMOUNT = "1";
const CURRENCY = "USD";

const API_BASE_URL = import.meta.env.MODE === "development" ? "/api" : "https://cors-anywhere.herokuapp.com/https://getcryptofast.com";//remove cors anywhere after deployment

const PaymentForm = ({ isDarkMode, setIsDarkMode }) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    email: "",
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

  useEffect(() => {
    const handleMessage = async (event) => {
      if (!event.data) return;
      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        if (data.MessageType === "profile.completed") {
          console.log("Device Data Collection Completed:", data);
          await authenticate3DS(data.SessionId);
        }

        if (data.MessageType === "3dsauthenticated") {
          console.log("3DS Authentication Completed:", data);
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

  const handleOpenModal = (message, success = false) => {
    setModalMessage(message);
    setIsSuccess(success);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    if (isSuccess) {
      window.location.href = "/";
    }
  };

  const initializePayment = useCallback(async () => {
    try {
      if (
        !paymentData.cardHolder ||
        !paymentData.cardNumber ||
        !paymentData.expiryMonth ||
        !paymentData.expiryYear ||
        !paymentData.cvv
      ) {
        console.error("Missing required payment fields.");
        return;
      }

      const payload = {
        customer: CUSTOMER_ID,
        co: "al",
        product: "1000",
        productdescription: "IPTV subscription sale",
        cc: paymentData.cardNumber.replace(/\D/g, ""),
        cvv: paymentData.cvv,
        expmo: paymentData.expiryMonth,
        expyr: paymentData.expiryYear,
        cardholder: paymentData.cardHolder,
        amount: PAYMENT_AMOUNT,
        currency: CURRENCY,
        usdc: "",
        pool: "",
        apikey: API_KEY,
        externalid: ORDER_ID,
        customeremail: paymentData.email,
      };

      console.log("Initializing Payment:", payload);
      const response = await axios.post(`${API_BASE_URL}/wp3dsinit`, payload);
      console.log("Payment initialized:", response.data);

      if (response.data.transactionReference) {
        setTransactionReference(response.data.transactionReference);
        setDdcUrl(
          `${API_BASE_URL}/wp3dsddc?url=${encodeURIComponent(
            response.data.deviceDataCollection.url
          )}&bin=${response.data.deviceDataCollection.bin}&jwt=${
            response.data.deviceDataCollection.jwt
          }`
        );
      }
    } catch (error) {
      handleOpenModal("Payment initialization failed. Please try again.");
    }
  }, [paymentData]);

  const authenticate3DS = useCallback(
    async (sessionId) => {
      try {
        if (!transactionReference) {
          console.error("Missing transactionReference.");
          return;
        }

        const payload = {
          customer: CUSTOMER_ID,
          co: "al",
          product: "1000",
          productdescription: "IPTV subscription sale",
          cc: paymentData.cardNumber.replace(/\D/g, ""),
          cvv: paymentData.cvv,
          expmo: paymentData.expiryMonth,
          expyr: paymentData.expiryYear,
          cardholder: paymentData.cardHolder,
          amount: PAYMENT_AMOUNT,
          currency: CURRENCY,
          usdc: "",
          pool: "",
          apikey: API_KEY,
          externalid: ORDER_ID,
          customeremail: paymentData.email,
          colref: sessionId,
          refid: transactionReference,
        };

        const response = await axios.post(`${API_BASE_URL}/wp3dsauth`, payload);

        if (response.data.url) {
          setChallengeRef(response.data.reference);
          setChallengeUrl(
            `${API_BASE_URL}/wp3dschallengeform?url=${encodeURIComponent(
              response.data.url
            )}&jwt=${response.data.jwt}&md=${response.data.md}`
          );
        } else {
          await finalizePayment(response.data);
        }
      } catch (error) {
        handleOpenModal("3DS Authentication failed. Please try again.");
      }
    },
    [transactionReference, paymentData]
  );

  const verify3DS = useCallback(async () => {
    try {
      if (!transactionReference || !challengeRef) {
        console.error("Missing required references for verification.");
        return;
      }

      const payload = {
        refid: transactionReference,
        challengeref: challengeRef,
        customer: CUSTOMER_ID,
      };

      const response = await axios.post(`${API_BASE_URL}/wp3dsverify`, payload);

      if (response.data.outcome === "authenticated") {
        await finalizePayment(response.data.authentication);
      }
    } catch (error) {
      handleOpenModal("3DS Verification failed. Please try again.");
    }
  }, [transactionReference, challengeRef]);

  const finalizePayment = useCallback(
    async (auth3ds) => {
      try {
        if (!transactionReference) {
          console.error("Missing transactionReference.");
          return;
        }

        const payload = {
          customer: CUSTOMER_ID,
          co: "al",
          product: "1000",
          productdescription: "IPTV subscription sale",
          cc: paymentData.cardNumber.replace(/\D/g, ""),
          cvv: paymentData.cvv,
          expmo: paymentData.expiryMonth,
          expyr: paymentData.expiryYear,
          cardholder: paymentData.cardHolder,
          amount: PAYMENT_AMOUNT,
          currency: CURRENCY,
          usdc: "",
          pool: "",
          apikey: API_KEY,
          externalid: ORDER_ID,
          customeremail: paymentData.email,
          refid: transactionReference,
          ...(auth3ds ? { auth3ds } : {}),
        };

        const response = await axios.post(`${API_BASE_URL}/wppay`, payload);

        if (response) {
          handleOpenModal("Payment successful! Thank you.", true);
        }
      } catch (error) {
        handleOpenModal("Final payment failed. Please try again.");
      }
    },
    [transactionReference, paymentData]
  );

  const validateField = (name, value) => {
    let error = "";

    if (name === "cardNumber") {
      if (!value.trim()) error = "Card number is required";
      else if (!/^\d{16}$/.test(value.replace(/\s/g, "")))
        error = "Invalid card number (16 digits required)";
    }

    if (name === "cardHolder") {
      if (!value.trim()) error = "Cardholder name is required";
    }

    if (name === "expiryMonth" || name === "expiryYear") {
      if (!paymentData.expiryMonth || !paymentData.expiryYear)
        error = "Expiration date is required";
      else if (
        !/^\d{2}$/.test(paymentData.expiryMonth) ||
        !/^\d{2}$/.test(paymentData.expiryYear)
      )
        error = "Invalid format (MM/YY)";
    }

    if (name === "cvv") {
      if (!value) error = "CVV is required";
      else if (!/^\d{3}$/.test(value))
        error = "Invalid CVV (3 digits required)";
    }

    if (name === "email") {
      if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        error = "Invalid email format";
    }

    if (name === "termsAccepted") {
      if (!value) error = "You must accept the terms & policy";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));

    return error;
  };

  const validateForm = useCallback(() => {
    const errors = Object.keys(paymentData).map((field) =>
      validateField(field, paymentData[field])
    );

    return Object.values(errors).every((err) => err === "");
  }, [paymentData, errors]);

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
                onChange={(e) =>
                  setPaymentData({
                    ...paymentData,
                    termsAccepted: e.target.checked,
                  })
                }
              />
            }
            label={
              <Typography
                variant="body2"
                color={errors.termsAccepted ? "error" : "textPrimary"}
              >
                I've read and accept
                <a>Terms & Policy</a>
              </Typography>
            }
          />
        </TermsWrapper>
        {ddcUrl && (
          <iframe title="3DS DDC" src={ddcUrl} style={{ display: "none" }} />
        )}
        {challengeUrl && (
          <FullScreenIframe
            title="3DS Challenge"
            src={challengeUrl}
          />
        )}
      </PaymentBox>
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

export default PaymentForm;
