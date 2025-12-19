
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./stripe";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
