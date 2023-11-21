import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/Header";
import { GlobalProvider } from "./GlobalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Video-Lib-App",
  // description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          precedence="default"
        />
      </head>
      <body className={inter.className}>
        <GlobalProvider>
          <Header />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
