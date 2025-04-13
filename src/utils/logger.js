import axios from "axios";

const WORKER_LOG_URL = "https://logger.payment-demo.workers.dev/";

export const logError = async (message, details = {}) => {
  console.error(`[Error]: ${message}`, details);

  try {
    await axios.post(WORKER_LOG_URL, {
      message,
      details,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      page: window.location.href,
    });
  } catch (error) {
    console.warn("⚠️ Failed to send log to server:", error);
  }
};

export default logError;
