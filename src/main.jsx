import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './style.css';

import { BrowserRouter  } from "react-router-dom"; // ya BrowserRouter use kar sakte ho

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <App />
</BrowserRouter>
);