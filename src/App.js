import React, { useState } from "react";

function Calculator() {
  const [displayValue, setDisplayValue] = useState("");

  const handleButtonClick = (value) => {
    const lastChar = displayValue.slice(-1);

    // Check if the last character is a symbol and the new value is also a symbol
    if (isSymbol(lastChar) && isSymbol(value)) {
      return; // Don't add the new symbol
    }

    if (isSymbol(value) && !/\d/.test(displayValue)) {
      return; // Don't add the symbol if no digits are present
    }

    if (value === "=" && displayValue !== "") {
      try {
        const calculatedResult = evaluateExpression(displayValue);
        setDisplayValue(calculatedResult.toString());
      } catch (error) {
        setDisplayValue("Error");
      }
    } else if (value === "AC") {
      setDisplayValue("");
      setDisplayValue("");
    } else if (value === "Del") {
      setDisplayValue(displayValue.toString().slice(0, -1));
    } else if (value === "%" && displayValue !== "") {
      try {
        const calculatedResult = evaluateExpression(displayValue) / 100;
        setDisplayValue(calculatedResult.toString());
      } catch (error) {
        setDisplayValue("Error");
      }
    } else {
      setDisplayValue(displayValue + value.toString());
    }
  };

  const evaluateExpression = (expression) => {
    try {
      // eslint-disable-next-line
      return new Function("return " + expression)();
    } catch (error) {
      throw new Error("Invalid expression");
    }
  };
  const isSymbol = (char) => {
    const symbols = ["=", "+", "*", "-", "/", "%", "."];
    return symbols.includes(char);
  };

  const buttons = [
    "7",
    "8",
    "9",
    "*",

    "4",
    "5",
    "6",
    "-",

    "1",
    "2",
    "3",
    "+",

    "%",
    "0",
    ".",
    "=",

    "AC",
    "Del",
    "/",
  ];

  return (
    <div className="bg-black h-[100vh] flex items-center">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto bg-black bg-opacity-20 p-4 rounded-md shadow-md shadow-slate-50">
          <h1 className="text-white text-2xl font-medium mb-4">Calculator</h1>
          <div className="mb-4">
            <input
              type="text"
              className="w-full bg-transparent p-2 text-green-500 text-right text-4xl font-medium outline-none"
              value={displayValue}
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {buttons.map((button, index) => (
              <button
                key={index}
                className="bg-black py-6 text-white text-xl font-bold shadow-inner shadow-md shadow-slate-50 focus:bg-green-500 rounded-full"
                onClick={() => handleButtonClick(button)}
              >
                {button}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
