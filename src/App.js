import React from "react";
import Weather from "./Weather.js";

export default function App() {
  return (
    <div className="App">
      <Weather defaultCity="Stockholm" />
    </div>
  );
}
