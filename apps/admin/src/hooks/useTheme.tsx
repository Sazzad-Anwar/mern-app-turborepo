import { FC, useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
      localStorage.theme = "light";
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
      localStorage.theme = "light";
    }
  };

  return { theme, toggleTheme };
};

export default useTheme;
