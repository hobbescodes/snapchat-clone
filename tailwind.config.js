module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        chats: "1 -7px 7px -6px rgba(0, 0, 0, 0.44)",
      },
    },
  },
  important: true,
  plugins: [require("tailwind-scrollbar-hide")],
};
