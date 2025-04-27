const nextConfig = {
  output: "standalone",
  generateBuildId: async () => {
    return "build-" + Date.now();
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
