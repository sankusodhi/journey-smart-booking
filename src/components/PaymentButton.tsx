import React from "react";

interface PassengerDetails {
  name: string;
  phone: string;
  email: string;
}

interface PaymentButtonProps {
  amount: number;
  passengerDetails: PassengerDetails;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ amount, passengerDetails }) => {
  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const options: any = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: amount, // 🔥 yahan amount props ka use ho raha hai
      currency: "INR",
      name: "TechSpark",
      description: "Test Transaction",
      image: "https://yourlogo.png",
      handler: function (response: any) {
        alert(`Payment successful: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: passengerDetails.name,
        email: passengerDetails.email,
        contact: passengerDetails.phone,
      },
      notes: {
        address: "NavGurukul, Dantewada",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
    >
      Pay ₹{amount / 100}
    </button>
  );
};

export default PaymentButton;
