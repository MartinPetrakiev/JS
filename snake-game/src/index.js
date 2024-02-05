import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GameControlsProvider } from "./ContextProviders";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <GameControlsProvider>
            <App />
        </GameControlsProvider>
    </React.StrictMode>
);
