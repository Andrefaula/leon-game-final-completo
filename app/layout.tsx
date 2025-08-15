import './globals.css'

export const metadata = {
  title: 'Anile',
  description: 'Criado com Faulya',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  )
}