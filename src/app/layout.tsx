"use client";
import SideMenu from "@/components/Layout/SideMenu";
import ContextConsumer from "@/context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Poppins } from "next/font/google";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
const queryClient = new QueryClient();

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' dir='' className={poppins.className}>
      <body className=' '>
        <ContextConsumer>
          <QueryClientProvider client={queryClient}>
            {children}
            <SideMenu />
            <ToastContainer
              position='top-right'
              theme='dark'
              hideProgressBar
              autoClose={2000}
              style={{ color: "#E25148" }}
              transition={Slide}
            />
          </QueryClientProvider>
        </ContextConsumer>
      </body>
    </html>
  );
}
