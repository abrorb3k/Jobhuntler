import React from "react";

const ThemeToggle = ({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) => {
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-22 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
