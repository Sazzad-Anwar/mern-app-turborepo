import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import "antd/dist/reset.css";
import "./assets/css/main.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Index";
import GlobalContextProvider from "./context/GlobalContextProvider";
import { Helmet, HelmetProvider } from "react-helmet-async";
import config from "./config/config";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <HelmetProvider>
        <Helmet>
          <title>{config.name}</title>
          <link rel="icon" href={config.logo} />
        </Helmet>
        <RouterProvider router={router} />
      </HelmetProvider>
    </GlobalContextProvider>
  </React.StrictMode>
);
