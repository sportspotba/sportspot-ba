import './globals.css';

export const metadata = {
  title: 'SportSpot BA — Centros Deportivos en Buenos Aires y GBA',
  description: 'El directorio más completo de centros deportivos en Buenos Aires y GBA. Gimnasios, canchas de fútbol, pádel, CrossFit, pilates, yoga, boxeo, natación, tenis y running. Info verificada y actualizada.',
  keywords: 'gimnasios buenos aires, canchas fútbol CABA, pádel buenos aires, crossfit, pilates, yoga, boxeo, natación, tenis, running, GBA',
  openGraph: {
    title: 'SportSpot BA — Tu lugar para entrenar',
    description: 'El directorio más completo de centros deportivos en Buenos Aires y GBA.',
    type: 'website',
    locale: 'es_AR',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
