import type { NextConfig } from "next";

// GitHub Pages のリポジトリ名
const repo = "test-strategy";
// 本番環境かどうか
const isProd = process.env.NODE_ENV === "production";

// Next.js の設定
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  // GitHub Pages で公開する場合は basePath を設定
  ...(isProd
    ? {
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
      }
    : {}),

  // next/image を使う場合の設定
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
