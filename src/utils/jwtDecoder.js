import * as jwt_decode from "jwt-decode";

/**
 * Decodes JWT token without signature verification
 * @param {string} token - JWT token
 * @returns {Object|null}
 */
export const decodePaymentToken = (token) => {
  try {
    return jwt_decode.jwtDecode(token);
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
};

/**
 * Extracts payment data from URL query parameters
 * @returns {Object|null}
 */
export const getPaymentDataFromQuery = () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) return null;

    const decodedData = decodePaymentToken(token);

    if (!decodedData) return null;

    if (!decodedData.paymentAmount || !decodedData.customerId || !decodedData.apiKey) {
      console.error("Missing required fields in JWT token");
      return null;
    }

    return {
      paymentAmount: decodedData.paymentAmount,
      customerId: decodedData.customerId,
      apiKey: decodedData.apiKey,
    };
  } catch (error) {
    console.error("Error extracting payment data from query:", error);
    return null;
  }
};
