import React from "react";
import "./App.css";
import { ResultTypePage } from "./ResultType";
import { ThrowErrorPage } from "./ThrowError";

function App() {
  return (
    <div className="App">
        <ThrowErrorPage />
        <ResultTypePage />
    </div>
  );
}

export default App;
