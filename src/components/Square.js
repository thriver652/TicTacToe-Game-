import React from "react";

const Square = ({ value, onClick, highlight }) => (
  <button
    className={`square ${highlight ? "highlight" : ""}`}
    onClick={onClick}
  >
    {value}
  </button>
);

export default Square;
