"use client";
import SideMenu from "@/components/Layout/SideMenu";
import ContextConsumer from "@/context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Poppins } from "next/font/google";

import { Slide, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";
const queryClient = new QueryClient();

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  console.log("pathNamepathNamepathName", pathName);
  return (
    <html lang='en' dir=''>
      <body className=' '>
        <ContextConsumer>
          <QueryClientProvider client={queryClient}>
            {children}

            {pathName == "/" ||
            pathName == "/chinh-sach-bao-mat" ||
            pathName == "/client/checkin" ||
            pathName == "/client/checkin/select/new-select" ||
            pathName == "/client/waitting" ? null : (
              <SideMenu />
            )}

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
