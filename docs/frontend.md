# 🖥️ Frontend – Vite + React URL Shortener

This is a modern UI to interact with the serverless URL Shortener API.

---

## 🛠 Tech Stack

- Vite (React-based)
- Tailwind CSS (fully responsive)
- Axios or Fetch API
- React Toast (for notifications)
- QR Code toggle with icons
- Dark/Light theme toggle
- Layout switch (stacked / row)

---

## 📂 Folder Structure

```bash
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── UrlInput.jsx
│   │   ├── Button.jsx
│   │   ├── ShortenedResult.jsx
│   │   ├── ThemeButton.jsx
│   │   └── QRButton.jsx
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── tailwind.config.js
└── vite.config.js
```

---

## 🌐 Integration with Backend

Set up `.env`:

```env
VITE_API_URL=https://<your-api-id>.execute-api.ap-south-1.amazonaws.com/Prod
```

---

## 📥 Example Fetch Usage

```js
fetch(`${import.meta.env.VITE_API_URL}/shorten`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '<your-api-key>',
  },
  body: JSON.stringify({ longUrl: url }),
})
  .then(res => res.json())
  .then(data => {
    setShortUrl(data.shortUrl);
    toast.success("Copied to clipboard!");
    navigator.clipboard.writeText(data.shortUrl);
  });
```

---

## 🎯 Features

- 🔗 Shortens any valid URL
- 📋 Auto-copies result
- 🎨 Theme toggle (light/dark)
- 📐 Responsive layout toggle (row vs stacked)
- 📸 QR Code toggle
- 🔥 Smooth animations with Tailwind
- ✅ Fully linted and production ready

---

## 🧪 Testing

Use your own deployed API + key, or a mock API locally:
```bash
npm run dev
```

---

## 🔄 Improvements Planned

- Custom domain integration
- Analytics dashboard (views, clicks, countries)
- Save history using localStorage or backend
- Auth integration (JWT or Cognito)

---
