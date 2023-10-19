import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// import Home from './modules/admin/pages/Home';
import Store from './Redux/Store'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
// import { PrimeReactProvider } from 'primereact/context';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <BrowserRouter>
    <PrimeReactProvider>

    <Provider store={Store}> 
    <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
      {/* <Home/> */}
    </ThemeProvider>
    </Provider>
    </PrimeReactProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
