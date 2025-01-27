// src/app/layout.js

import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
