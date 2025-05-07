export const getApiKeyByCustomer = (customerId) => {
    const keyMap = {
      "89UT5fjx": import.meta.env.VITE_API_KEY_89UT5fjx
    };
  
    return keyMap[customerId] || null;
  };