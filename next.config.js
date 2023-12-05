const { i18n } = require('./next-i18next.config')

module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    ...defaultConfig,
    reactStrictMode: false,
    i18n: i18n,
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Cross-Origin-Opener-Policy",
              value: "same-origin-allow-popups, same-origin",
            },
          ],
        },
      ];
    },
  };

  return nextConfig;
}
