import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Button,
} from "@mui/material";

import { Container, PaymentBox } from "./styled";
import CardDetailsForm from "../CardDetailsForm";

const CUSTOMER_ID = "502N12P6";
const API_KEY = "b7691ebb-2ba8-469a-abb2-bfb469f23aac";
const ORDER_ID = "ORDER_ID";
const PAYMENT_AMOUNT = "2";
const CURRENCY = "USD";
const API_BASE_URL = "https://getcryptofast.com";

const PaymentForm = () => {
  const [paymentData, setPaymentData] = useState({
    cardHolder: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    email: "",
  });
  const [ddcUrl, setDdcUrl] = useState(null);
  const [challengeUrl, setChallengeUrl] = useState(null);
  const [transactionReference, setTransactionReference] = useState(null);
  const [challengeRef, setChallengeRef] = useState(null);

  useEffect(() => {
    window.addEventListener("message", async (event) => {
      if (!event.data) return;
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (data.MessageType === "profile.completed") {
          await authenticate3DS(data.SessionId);
        }
        if (data.MessageType === "3dsauthenticated") {
          await verify3DS();
        }
      } catch (error) {
        console.error("Error processing message: ", error);
      }
    });
  }, []);

  const initializePayment = async () => {
    try {
      const payload = {
        customer: CUSTOMER_ID,
        amount: PAYMENT_AMOUNT,
        currency: CURRENCY,
        cardholder: paymentData.cardHolder,
        cc: paymentData.cardNumber.replace(/\D/g, ""),
        expmo: paymentData.expiryMonth,
        expyr: paymentData.expiryYear,
        cvv: paymentData.cvv,
        apikey: API_KEY,
        //externalid: ORDER_ID,
        customeremail: paymentData.email,
      };

      const response = await axios.post(`/api/wp3dsinit`, payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      });

      const result = response.data;
      if (result.deviceDataCollection) {
        setTransactionReference(result.transactionReference);
        setDdcUrl(`/api/wp3dsddc?url=${encodeURIComponent(result.deviceDataCollection.url)}&bin=${result.deviceDataCollection.bin}&jwt=${result.deviceDataCollection.jwt}`);
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
    }
  };

  const authenticate3DS = async (sessionId) => {
    try {
      const response = await axios.post(`/api/wp3dsauth`, {
        refid: transactionReference,
        colref: sessionId,
        customer: CUSTOMER_ID,
        apikey: API_KEY,
      }, { timeout: 10000 });

      const result = response.data;
      if (result.url) {
        setChallengeRef(result.reference);
        setChallengeUrl(result.url);
      } else {
        await finalizePayment();
      }
    } catch (error) {
      console.error("3DS authentication failed:", error);
    }
  };

  const verify3DS = async () => {
    try {
      const response = await axios.post(`/api/wp3dsverify`, {
        refid: transactionReference,
        challengeref: challengeRef,
        customer: CUSTOMER_ID,
        apikey: API_KEY,
      }, { timeout: 10000 });

      const result = response.data;
      if (result.outcome === "authenticated" || result.bypass) {
        await finalizePayment();
      }
    } catch (error) {
      console.error("3DS verification failed:", error);
    }
  };

  const finalizePayment = async () => {
    try {
      const response = await axios.post(`/api/wppay`, {
        customer: CUSTOMER_ID,
        amount: PAYMENT_AMOUNT,
        currency: CURRENCY,
        cc: paymentData.cardNumber.replace(/\D/g, ""),
        expmo: paymentData.expiryMonth,
        expyr: paymentData.expiryYear,
        cvv: paymentData.cvv,
        apikey: API_KEY,
        //externalid: ORDER_ID,
      }, { timeout: 10000 });

      console.log("Payment successful: ", response.data);
    } catch (error) {
      console.error("Final payment failed:", error);
    }
  };

  return (
    <Container>
      <PaymentBox>
        <Typography variant="h6" gutterBottom>
          Payment Details
        </Typography>
        <CardDetailsForm paymentData={paymentData} setPaymentData={setPaymentData} />
          {ddcUrl && <iframe title="3DS DDC" src={ddcUrl} style={{ display: "none" }} />}
          {challengeUrl && <iframe title="3DS Challenge" src={challengeUrl} width={390} height={400} />}
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={initializePayment}>
            Continue
          </Button>
      </PaymentBox>
    </Container>
  );
};

export default PaymentForm;
