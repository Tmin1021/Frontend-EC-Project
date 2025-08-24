async function createPayment(amount) {
  try {
    const response = await fetch("http://localhost:3000/create_payment_url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 100000,              
        bankCode: "VNBANK",
        orderDescription: "Test payment",
        orderType: '100000',
        language: "vn"
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create payment");
    }

    const paymentUrl = await response.text(); // your backend sends back URL
    window.location.href = paymentUrl;        // redirect user to VNPAY page
  } catch (err) {
    console.error(err);
  }
}

export {createPayment}