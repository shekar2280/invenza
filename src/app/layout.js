import { Inter } from "next/font/google"
import "./ui/globals.css";

const inter = Inter({ subsets: ['latin']})

export const metadata = {
  title: "Inveza",
  description: "Retail Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
