import { Aside } from "@/components/Aside";
import { Prompt } from "next/font/google"
import "./globals.css";

const prompt = Prompt({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: "Code Connect",
  description: "Devs social media",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={prompt.className}>
      <body>
        <div className="app-container">
          <Aside />
          <div className="main-content">
            {children}  
          </div>
        </div>
      </body>
    </html>
  );
}
