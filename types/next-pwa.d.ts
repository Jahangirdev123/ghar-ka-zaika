declare module "next-pwa" {
  import type { NextConfig } from "next";

  type PWAOptions = {
    dest?: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    cacheStartUrl?: boolean;
    fallbacks?: {
      document?: string;
    };
  };

  function withPWA(
    options?: PWAOptions,
  ): (config: NextConfig) => NextConfig;

  export default withPWA;
}
