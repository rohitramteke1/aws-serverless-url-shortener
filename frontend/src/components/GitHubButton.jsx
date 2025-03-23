import { FaGithub } from "react-icons/fa";

const GitHubButton = ({ url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        p-2 rounded-full shadow-md
        bg-gray-800 text-white hover:bg-gray-700
        dark:bg-white dark:text-black dark:hover:bg-gray-200
        transition-all duration-300 ease-in-out transform hover:scale-110
      "
      aria-label="View source on GitHub"
    >
      <FaGithub size={20} className="transition-transform duration-300 ease-in-out" />
    </a>
  );
};

export default GitHubButton;
