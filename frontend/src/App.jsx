import { useState, useEffect } from "react";
// import Card from "./components/Card"; // Optional: fallback component (currently not used)
import Footer from "./components/Footer";
import ThemeButton from "./components/ThemeButton";
import GitHubButton from "./components/GitHubButton";
import EnhancedCard from "./components/EnhancedCard";
import QRButton from "./components/QRButton";

import { BsLayoutThreeColumns } from "react-icons/bs";
import { MdViewHeadline } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

const githubRepoUrl = import.meta.env.VITE_REPO_URL;

const App = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [layout, setLayout] = useState("stacked"); // Toggles between stacked/row layout
  const [showQR, setShowQR] = useState(false);     // QR Code visibility
  const [loading, setLoading] = useState(false);   // Loader state

  // Get theme from localStorage or default to "light"
  const getSavedTheme = () => localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(getSavedTheme());

  // Handle theme switching by updating <html> class and saving to localStorage
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Shorten URL handler
  const handleShorten = async () => {
    if (!url.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }

    try {
      new URL(url); // Validate URL format
    } catch {
      toast.error("Invalid URL format");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl: url }),
      });

      const data = await res.json();
      setShortUrl(data.shortUrl);
      setUrl("");

      // Auto-copy shortened URL to clipboard
      navigator.clipboard.writeText(data.shortUrl);
      toast.success("Short URL copied to clipboard!");
    } catch {
      // console.error("Failed to shorten URL", err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "light" ? "bg-gray-100" : "bg-gray-800"
      } px-4 text-gray-900 dark:text-white`}
    >
      <Toaster position="top-center" reverseOrder={false} />

      {/* Top-right control panel */}
      <div className="fixed top-4 right-4 flex items-center space-x-3 z-50">
        <GitHubButton url={githubRepoUrl} />
        <ThemeButton theme={theme} setTheme={setTheme} />
        <QRButton showQR={showQR} setShowQR={setShowQR} />
        <button
          onClick={() =>
            setLayout((prev) => (prev === "stacked" ? "row" : "stacked"))
          }
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          title="Toggle Layout"
        >
          {layout === "stacked" ? (
            <BsLayoutThreeColumns className="w-5 h-5" />
          ) : (
            <MdViewHeadline className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center">
        {/* Fallback component (disabled for now) */}
        {/* <Card ...props /> */}

        <EnhancedCard
          url={url}
          setUrl={setUrl}
          shortUrl={shortUrl}
          handleShorten={handleShorten}
          theme={theme}
          setTheme={setTheme}
          layout={layout}
          loading={loading}
          showQR={showQR}
        />
      </div>

      <Footer />
    </div>
  );
};

export default App;
