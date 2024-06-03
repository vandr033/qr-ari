// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'my-blob-store.public.blob.vercel-storage.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'ygouyltqwgnnumylnpps.supabase.co',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
