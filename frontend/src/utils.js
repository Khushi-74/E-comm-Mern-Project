export function getTokenType (token){
    try {
      console.log(token);
      const base64Url = token.split(".")[1]; // Extract payload
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Fix Base64 format
      const payload = JSON.parse(atob(base64)); // Decode

      if (payload.iss?.includes("securetoken.google.com")) {
        return "firebase"; // Firebase ID token
      } else {
        return "jwt"; // Custom JWT
      }
    } catch (error) {
      console.error("Invalid token:", error);
      return "invalid";
    }
  };