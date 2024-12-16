
export const login = async (username, password) => {
  const loginRequest = { username, password };

  try {
    const response = await fetch('/api/auth', {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginRequest)
    });

    if (!response.ok) {
      return "ERROR";
    }

    const data = await response.json();
    // Artık js-cookie ile token set etme yok.
    // Token, sunucu tarafında httpOnly cookie olarak ayarlandı.
    // İsterseniz userType ve userId gibi bilgileri buradan return edebilirsiniz.
    console.log("Result message type:", data.messageType);
    return data.messageType;
  } catch (error) {
    console.log("Burada", error);
    return null;
  }
};
