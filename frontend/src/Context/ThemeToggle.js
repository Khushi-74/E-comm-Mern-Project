import React from "react";
import { useContext } from "react";
import { globalThemeContext } from "./ThemeContext";

const ThemeToggle = ()=>{

    const {theme,setTheme} = useContext(globalThemeContext)
    return (
        <div>
             <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
        </div>
    )
}

export default ThemeToggle;