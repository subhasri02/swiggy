
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { CartProvider } from "./context/CartContext";
// import { AuthProvider } from "./context/AuthContext";

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <React.StrictMode>
//     <AuthProvider>
//       <CartProvider>
//         <App />
//       </CartProvider>
//     </AuthProvider>
//   </React.StrictMode>
// );






import React from "react";
import ReactDOM from "react-dom/client";
import { Elements } from "@stripe/react-stripe-js";

import App from "./App";
import { stripePromise } from "./stripe";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

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
