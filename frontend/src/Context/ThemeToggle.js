import React from "react";
import { useContext } from "react";
import { globalThemeContext } from "./ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(globalThemeContext);
  return (
    <div>
          <div className="mode">
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
        </button>
      </div>
      </div>
  
  );
};

export default ThemeToggle;
