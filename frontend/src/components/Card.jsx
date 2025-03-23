// import ThemeButton from "./ThemeButton";
import Header from "./Header";
import UrlInput from "./UrlInput";
import Button from "./Button";
import ShortenedResult from "./ShortenedResult";
import { FiLink } from "react-icons/fi";


const Card = ({ url, setUrl, shortUrl, handleShorten, layout }) => (
  <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg text-center transition-all duration-300">
    <Header />

    {layout === "stacked" ? (
      <>
        <UrlInput url={url} setUrl={setUrl} />
        <div className="mt-4">
          <Button onClick={handleShorten} />
        </div>
      </>
    ) : (
      <div className="flex items-center justify-center gap-2 mt-4 w-full max-w-md mx-auto">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to shorten"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
        <button
          onClick={handleShorten}
          className="p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          title="Shorten URL"
        >
          <FiLink className="w-5 h-5" />
        </button>
      </div>
    )}

    <ShortenedResult shortUrl={shortUrl} layout={layout} />
  </div>
);


export default Card;
