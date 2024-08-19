import React from "react";
import "./App.scss";
import PasswordGenerator from "./components/PasswordGenerator/PasswordGenerator";

const App: React.FC = () => {
  return (
    <div className="App">
      <PasswordGenerator />
    </div>
  );
};

export default App;
