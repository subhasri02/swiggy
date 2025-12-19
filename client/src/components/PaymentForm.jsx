import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const PaymentForm = ({ totalAmount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    const token = localStorage.getItem("token");

    const { data } = await axios.post(
      "http://localhost:8000/api/payment/create-payment-intent",
      { amount: totalAmount },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        onSuccess(result.paymentIntent.id);
      }
    }
  };

  return (
    <>
      <CardElement />
      <button onClick={handlePayment} className="btn">
        Pay ₹{totalAmount}
      </button>
    </>
  );
};

export default PaymentForm;
