import React, { useState } from "react";
import "./App.css";

function App() {
  const [mappedInput, setMappedInput] = useState("");
  const mapping = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

  const handleInputChange = (event) => {
    const value = event.target.value;

    if (value.length < mappedInput.length) {
      // Handle backspace: Remove the last character
      setMappedInput(mappedInput.slice(0, -1));
    } else {
      // Handle new input
      const lastChar = value[value.length - 1];

      // Check if the last character is a digit (0-9)
      if (!isNaN(lastChar) && lastChar >= "0" && lastChar <= "9") {
        const letter = mapping[parseInt(lastChar, 10)];
        setMappedInput((prev) => prev + letter);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Number to Letter Converter</h1>
        <input
          type="text"
          value={mappedInput}
          onChange={handleInputChange}
          placeholder="Type numbers (0-9)"
          style={{ fontSize: "20px", padding: "10px", borderRadius: "5px",color:"green" }}
        />
        <p>Converted Input: {mappedInput}</p>
        <button
          onClick={() => console.log(mappedInput)}
          style={{ marginTop: "10px", fontSize: "16px" }}
        >
          Log Data
        </button>
      </header>
    </div>
  );
}

export default App;
