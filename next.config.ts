import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // o conteúdo de /movimento agora é a página principal
  async redirects() {
    return [{ source: "/movimento", destination: "/", permanent: false }];
  },
};

export default nextConfig;
