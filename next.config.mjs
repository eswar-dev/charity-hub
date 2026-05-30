/** @type {import('next').NextConfig} */

function getRemotePatterns() {
  const patterns = [
    { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
    { protocol: "https", hostname: "imagedelivery.net", pathname: "/**" },
    { protocol: "https", hostname: "storage.googleapis.com", pathname: "/**" },
  ];

  const base = process.env.NEXT_PUBLIC_CF_CDN_BASE_URL;
  if (base) {
    try {
      const { protocol, hostname } = new URL(base);
      patterns.push({
        protocol: protocol.replace(":", ""),
        hostname,
        pathname: "/**",
      });
    } catch {
      /* ignore */
    }
  }

  const stream = process.env.NEXT_PUBLIC_CF_STREAM_BASE_URL;
  if (stream) {
    try {
      patterns.push({
        protocol: "https",
        hostname: new URL(stream).hostname,
        pathname: "/**",
      });
    } catch {
      /* ignore */
    }
  }

  return patterns;
}

const nextConfig = {
  images: {
    remotePatterns: getRemotePatterns(),
  },
};

export default nextConfig;
