import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store.js";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <provider store={store}>
      <App />
    </provider>
  </BrowserRouter>
);
