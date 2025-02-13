import "bootstrap/dist/css/bootstrap.min.css";

import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";

import i18n from "../i18n/i18n.ts";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import SpinnerComponent from "./components/common/spinner/spinner.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <BrowserRouter>
        <SpinnerComponent />
        <App />
      </BrowserRouter>
    </Provider>
  </I18nextProvider>
);
