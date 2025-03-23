import { useState } from "react";
import { FiClipboard } from "react-icons/fi";

const ShortenedResult = ({ shortUrl, layout }) => {
  const [copied, setCopied] = useState(false);

  // Copies the short URL to clipboard and triggers "Copied!" feedback
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  // Don't render anything if there's no short URL
  if (!shortUrl) return null;

  // === Row Layout ===
  if (layout === "row") {
    return (
      <div className="mt-6 flex items-center justify-center gap-2 w-full max-w-md mx-auto">
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-blue-600 hover:underline dark:text-blue-400 break-all"
        >
          {shortUrl}
        </a>
        <button
          onClick={copyToClipboard}
          className="p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
          title="Copy URL"
        >
          <FiClipboard className="w-5 h-5" />
        </button>
      </div>
    );
  }

  // === Stacked Layout ===
  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow-md border border-gray-300 dark:bg-gray-800 dark:border-gray-600 space-y-4">
      <div className="text-center">
        <p className="text-lg text-gray-800 font-semibold dark:text-white">
          Shortened URL:
        </p>
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-lg dark:text-blue-400 break-all"
        >
          {shortUrl}
        </a>
      </div>

      {/* Copy button with "Copied!" feedback */}
      <button
        onClick={copyToClipboard}
        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        {copied ? "Copied!" : "Copy to Clipboard"}
      </button>
    </div>
  );
};

export default ShortenedResult;
