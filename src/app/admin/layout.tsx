import type { Metadata } from "next"
import { ThemeProvider } from "@/components/ui/theme-provider"

export const metadata: Metadata = {
	title: "Score Bug - Admin",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="dark"
			enableSystem
			disableTransitionOnChange
		>
			{children}
		</ThemeProvider>
	)
}
