import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import defaultTheme from "../theme.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      {/* Replace clientId with ownID */}
      <GoogleOAuthProvider clientId="505452981991-517db0bqdkmon0sefg1nc8rnj59lp8q0.apps.googleusercontent.com">
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
