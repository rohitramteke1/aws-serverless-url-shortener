import { FaMoon, FaSun } from "react-icons/fa";

const ThemeButton = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-blue-600 text-white rounded-full shadow-md dark:bg-yellow-400 dark:text-black transition"
      aria-label="Toggle theme"
    >

      {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
    </button>
  );
};

export default ThemeButton;
