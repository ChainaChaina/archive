import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
/**
 * Para permitir imagens de qualquer domínio, use uma expressão regular no `remotePatterns`.
 * O uso de ['**'] em `domains` não é suportado e não terá o efeito desejado.
 */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};