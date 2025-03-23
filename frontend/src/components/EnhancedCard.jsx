import { FiLink, FiClipboard } from "react-icons/fi";
import toast from "react-hot-toast";
import { QRCodeCanvas } from "qrcode.react";

const EnhancedCard = ({
  url,
  setUrl,
  shortUrl,
  handleShorten,
  layout,
  loading,
  showQR,
}) => {
  return (
    <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg text-center transition-all duration-300">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">URL Shortener</h1>

      {/* === Stacked Layout === */}
      {layout === "stacked" ? (
        <>
          {/* Input field */}
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to shorten"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            disabled={loading}
          />

          {/* Shorten Button */}
          <button
            onClick={handleShorten}
            disabled={loading}
            className={`mt-4 w-full py-3 rounded text-white transition dark:bg-blue-500 dark:hover:bg-blue-600 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-5 w-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                <span>Shortening...</span>
              </div>
            ) : (
              "Shorten URL"
            )}
          </button>

          {/* Result section */}
          {shortUrl && (
            <div className="mt-6 p-6 bg-white rounded-lg shadow-md border border-gray-300 dark:bg-gray-800 dark:border-gray-600 space-y-4">
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

              {/* Copy button */}
              <button
                onClick={() => navigator.clipboard.writeText(shortUrl)}
                className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Copy to Clipboard
              </button>

              {/* QR Code (if toggled) */}
              {showQR && (
                <div className="mt-4 flex justify-center">
                  <QRCodeCanvas value={shortUrl} size={128} />
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          {/* === Row Layout === */}

          {/* Input and shorten button side-by-side */}
          <div className="flex items-center gap-2 mt-4 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-2 py-2 rounded-lg shadow">
            <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide px-2">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL to shorten"
                className="w-full bg-transparent focus:outline-none dark:text-white"
                disabled={loading}
              />
            </div>

            <button
              onClick={handleShorten}
              disabled={loading}
              className={`p-2 bg-blue-600 text-white rounded-lg transition ${
                loading
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              }`}
              title="Shorten"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
              ) : (
                <FiLink className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Shortened result and copy button side-by-side */}
          {shortUrl && (
            <>
              <div className="flex items-center gap-2 mt-4 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-2 py-2 rounded-lg shadow">
                <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide px-2">
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-600 hover:underline text-sm sm:text-base dark:text-blue-400"
                  >
                    {shortUrl}
                  </a>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shortUrl);
                    toast.success("Copied to clipboard!");
                  }}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
                  title="Copy"
                >
                  <FiClipboard className="w-5 h-5" />
                </button>
              </div>

              {/* QR Code (if toggled) */}
              {showQR && (
                <div className="mt-4 flex justify-center animate-fade-in">
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md border dark:border-gray-600">
                    <QRCodeCanvas value={shortUrl} size={128} />
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EnhancedCard;
