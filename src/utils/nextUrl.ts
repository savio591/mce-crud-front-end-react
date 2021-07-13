export const nextUrl: string =
  process.env.IS_LOCALHOST === 'true'
    ? 'http://localhost:3000'
    : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
