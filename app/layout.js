import "./globals.css";

export const metadata = {
  title: "Learning Style Quiz",
  description: "Discover your personalized learning recommendations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}