import React, { useContext } from "react";
import { DarkModeContext } from "../context/DarkContext";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <button
      style={{ background: "transparent", border: "none", padding: 0 }}
      onClick={toggleDarkMode}
      className="dark-mode-toggle"
    >
      <i className={darkMode ? "fa-solid fa-moon" : "fa-regular fa-sun"}></i>
    </button>
  );
};

export default DarkModeToggle;
