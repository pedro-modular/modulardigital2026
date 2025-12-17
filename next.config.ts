import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'modulardigital.pt',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  async redirects() {
    return [
      // =====================================================
      // OLD WORDPRESS BLOG POSTS → NEW /artigos/ URLs
      // =====================================================

      // Posts that were at root level in WordPress
      {
        source: '/futuro-comercio-eletronico-portugal-2024',
        destination: '/artigos/futuro-comercio-eletronico-portugal-2025',
        permanent: true,
      },
      {
        source: '/futuro-comercio-eletronico-portugal-2024/',
        destination: '/artigos/futuro-comercio-eletronico-portugal-2025',
        permanent: true,
      },
      {
        source: '/comunicacao-integrada-e-seo-para-o-sucesso-da-sua-empresa',
        destination: '/artigos/comunicacao-integrada-e-seo-para-o-sucesso-da-sua-empresa',
        permanent: true,
      },
      {
        source: '/comunicacao-integrada-e-seo-para-o-sucesso-da-sua-empresa/',
        destination: '/artigos/comunicacao-integrada-e-seo-para-o-sucesso-da-sua-empresa',
        permanent: true,
      },
      {
        source: '/conheca-o-zappservice-o-seu-parceiro-para-a-gestao-de-servicos',
        destination: '/artigos/conheca-o-zappservice-o-seu-parceiro-para-a-gestao-de-servicos',
        permanent: true,
      },
      {
        source: '/conheca-o-zappservice-o-seu-parceiro-para-a-gestao-de-servicos/',
        destination: '/artigos/conheca-o-zappservice-o-seu-parceiro-para-a-gestao-de-servicos',
        permanent: true,
      },

      // Posts under /blog/ path
      {
        source: '/blog/comunicacao-integrada-e-seo-para-o-sucesso-da-sua-empresa',
        destination: '/artigos/comunicacao-integrada-e-seo-para-o-sucesso-da-sua-empresa',
        permanent: true,
      },
      {
        source: '/blog/comunicacao-integrada-e-seo-para-o-sucesso-da-sua-empresa/',
        destination: '/artigos/comunicacao-integrada-e-seo-para-o-sucesso-da-sua-empresa',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/artigos/:slug',
        permanent: true,
      },

      // =====================================================
      // OLD SERVICE/CATEGORY PAGES → NEW PAGES
      // =====================================================
      {
        source: '/agencia-marketing-digital',
        destination: '/servicos',
        permanent: true,
      },
      {
        source: '/agencia-marketing-digital/',
        destination: '/servicos',
        permanent: true,
      },
      {
        source: '/agencia-web-design',
        destination: '/servicos/web-design',
        permanent: true,
      },
      {
        source: '/agencia-web-design/',
        destination: '/servicos/web-design',
        permanent: true,
      },

      // =====================================================
      // TAG PAGES → /artigos (tags no longer exist)
      // =====================================================
      {
        source: '/tag/:slug',
        destination: '/artigos',
        permanent: true,
      },
      {
        source: '/tag/:slug/',
        destination: '/artigos',
        permanent: true,
      },

      // =====================================================
      // CATEGORY PAGES → relevant sections
      // =====================================================
      {
        source: '/category/:slug',
        destination: '/artigos',
        permanent: true,
      },
      {
        source: '/category/:slug/',
        destination: '/artigos',
        permanent: true,
      },

      // =====================================================
      // CATCH-ALL: Root-level posts → /artigos/
      // This handles any old WordPress post at root level
      // =====================================================
      // Note: Be careful with this - it matches any single-segment path
      // Add specific redirects above for known URLs
    ];
  },
};

export default nextConfig;
