import type { Metadata } from "next"
import "./globals.css"
import { Header, Footer } from "@/components/layout"

export const metadata: Metadata = {
  title: {
    default: "Modular Digital | Consultoria e Implementação Digital",
    template: "%s | Modular Digital",
  },
  description:
    "Agência digital especializada em soluções para instituições de ensino, saúde e setor público. Web design, desenvolvimento, CRM e transformação digital.",
  keywords: [
    "agência digital",
    "web design",
    "desenvolvimento web",
    "Portugal",
    "CRM",
    "consultoria digital",
  ],
  authors: [{ name: "Modular Digital" }],
  creator: "Modular Digital",
  metadataBase: new URL("https://modulardigital.pt"),
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://modulardigital.pt",
    siteName: "Modular Digital",
    title: "Modular Digital | Consultoria e Implementação Digital",
    description:
      "Agência digital especializada em soluções para instituições de ensino, saúde e setor público.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Modular Digital",
    description: "Consultoria e Implementação Digital para Instituições",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
