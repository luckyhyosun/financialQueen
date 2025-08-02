import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/reducer";
import { makeRouter } from "./ReactRoot";
import { RouterProvider } from "react-router-dom";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { initAuthListenerACB } from "./firebase/authListener.js";

const router = makeRouter();

// Initialize the auth listener immediately after store creation
// This ensures auth state is tracked throughout the app lifecycle
const unsubscribeAuth = initAuthListenerACB(store)();

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
