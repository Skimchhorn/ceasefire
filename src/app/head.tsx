// src/app/head.tsx
export default function Head() {
  return (
    <>
      {/* Preconnect for faster font loading */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      {/* Nunito Sans with variable optical size, italics & full weight range */}
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap"
        rel="stylesheet"
      />
    </>
  )
}
