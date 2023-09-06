import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// import Home from './modules/admin/pages/Home';
import Store from './Redux/Store'


import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={Store}> 
    <ThemeProvider>
      <App />
      {/* <Home/> */}
    </ThemeProvider>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
