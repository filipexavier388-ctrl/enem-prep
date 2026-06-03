export const metadata = {
  title: 'ENEM Prep — Questões com IA',
  description: 'Plataforma de estudos para o ENEM com questões geradas por IA',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
