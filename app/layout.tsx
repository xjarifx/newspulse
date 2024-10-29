import "./globals.css";

export const metadata = {
  title: "NewsPulse",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/news.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
