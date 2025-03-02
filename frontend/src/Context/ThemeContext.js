import { createContext,useState,useEffect } from "react";

export const globalThemeContext = createContext();

export const ThemeProviderComp = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      }, [theme]);

      return (
        <globalThemeContext.Provider value={{ theme, setTheme }}>
          {children}
        </globalThemeContext.Provider>
      );
    };