/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
module.exports = {
  title: 'advance',
  tagline: 'The open source Firebase alternative.',
  url: 'https://hfcui.com',
  baseUrl: '/',
  favicon: '/favicon.ico',
  organizationName: 'supabase', // Usually your GitHub org/user name.
  projectName: 'supabase', // Usually your repo name.
  themeConfig: {
    forceDarkMode: true,
    darkMode: true,
    colorMode: {
      // "light" | "dark"
      defaultMode: 'dark',

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: false,

      // Should we use the prefers-color-scheme media-query,
      // using user system preferences, instead of the hardcoded defaultMode
      respectPrefersColorScheme: false,

      // Dark/light switch icon options
      switchConfig: {
        // Icon for the switch while in dark mode
        darkIcon: '  ',
        darkIconStyle: {
          marginTop: '1px',
        },
        lightIcon: '  ',
        lightIconStyle: {
          marginTop: '1px',
        },
      },
    },
    sidebarCollapsible: false,
    algolia: {
      apiKey: '766d56f13dd1e82f43253559b7c86636',
      indexName: 'supabase',
    },
    image: '/img/supabase-og-image.png', // used for meta tag, in particular og:image and twitter:image
    metaImage: '/img/supabase-og-image.png',
    navbar: {
      // classNames: 'shadow--md',
      // title: 'supabase',
      hideOnScroll: true,
      logo: {
        alt: 'Supabase',
        src: '/advance-dark.svg',
        srcDark: '/advance-dark.svg',
      },
      items: [
        {
          to: '/docs/enginee/babel/babel',
          activeBasePath: '/docs/enginee/babel/babel',
          label: 'Enginee',
          position: 'left',
        },
        {
          label: 'javascript',
          activeBasePath: '/docs/js/goods/jsDecorator',
          to: '/docs/js/goods/jsDecorator',
          position: 'left',
        },
        {
          label: 'react',
          activeBasePath: '/docs/react/goods/reactGoods1',
          to: '/docs/react/goods/reactGoods1',
          position: 'left',
        },
        {
          label: 'ts',
          activeBasePath: '/docs/ts/goods/tsGoods2',
          to: '/docs/ts/goods/tsGoods2',
          position: 'left',
        },
        {
          label: 'css',
          activeBasePath: '/docs/css/goods/cssSetKeyboard',
          to: '/docs/css/goods/cssSetKeyboard',
          position: 'left',
        },
        {
          label: 'node',
          activeBasePath: '/docs/node/nodeKnowledge',
          to: '/docs/node/nodeKnowledge',
          position: 'left',
        },
        {
          label: 'javascript',
          activeBasePath: '/docs/js/goods/jsDecorator',
          to: '/docs/js/goods/jsDecorator',
          position: 'left',
        },
        {
          label: 'javascript',
          activeBasePath: '/docs/js/goods/jsDecorator',
          to: '/docs/js/goods/jsDecorator',
          position: 'left',
        },
        {
          label: 'javascript',
          activeBasePath: '/docs/js/goods/jsDecorator',
          to: '/docs/js/goods/jsDecorator',
          position: 'left',
        },
        {
          label: 'javascript',
          activeBasePath: '/docs/js/goods/jsDecorator',
          to: '/docs/js/goods/jsDecorator',
          position: 'left',
        },
        {
          label: 'javascript',
          activeBasePath: '/docs/js/goods/jsDecorator',
          to: '/docs/js/goods/jsDecorator',
          position: 'left',
        },
        {
          label: 'javascript',
          activeBasePath: '/docs/js/goods/jsDecorator',
          to: '/docs/js/goods/jsDecorator',
          position: 'left',
        },
        {
          label: 'javascript',
          activeBasePath: '/docs/js/goods/jsDecorator',
          to: '/docs/js/goods/jsDecorator',
          position: 'left',
        },
        {
          label: 'javascript',
          activeBasePath: '/docs/js/goods/jsDecorator',
          to: '/docs/js/goods/jsDecorator',
          position: 'left',
        },
        {
          label: 'other',
          activeBasePath: '/docs/other/cookies/cookiesBaseAttr',
          to: '/docs/other/cookies/cookiesBaseAttr',
          position: 'left',
        }
        /* 一级菜单下拉例子 */
        // {
        //   to: 'docs/',
        //   activeBasePath: 'Tools',
        //   label: 'Tools',
        //   position: 'left',
        //   items: [
        //     {
        //       label: 'GoTrue',
        //       to: '/docs/gotrue/server/about',
        //     },
        //     {
        //       label: 'GoTrue Client',
        //       to: '/docs/gotrue/client/gotrue-client',
        //     },
        //     {
        //       label: 'Postgres',
        //       to: '/docs/postgres/server/about',
        //     },
        //     {
        //       label: 'Postgres API',
        //       to: '/docs/postgres/api/about',
        //     },
        //     {
        //       label: 'PostgREST',
        //       to: '/docs/postgrest/server/about',
        //     },
        //     {
        //       label: 'PostgREST Client',
        //       to: '/docs/postgrest/client/postgrest-client',
        //     },
        //     {
        //       label: 'Realtime',
        //       to: '/docs/realtime/server/about',
        //     },
        //     {
        //       label: 'Realtime Client',
        //       to: '/docs/realtime/client/realtime-client',
        //     },
        //   ],
        // }
      ],
    },
    prism: {
      defaultLanguage: 'js',
      plugins: ['line-numbers', 'show-language'],
      theme: require('@kiwicopple/prism-react-renderer/themes/vsDark'),
      darkTheme: require('@kiwicopple/prism-react-renderer/themes/vsDark'),
    },
    // footer: {
    //   links: [
    //     {
    //       title: 'Company',
    //       items: [
    //         {
    //           label: 'Blog',
    //           to: '/blog',
    //         },
    //         {
    //           label: 'Open source',
    //           to: '/oss',
    //         },
    //         {
    //           label: 'Humans.txt',
    //           to: 'https://supabase.io/humans.txt',
    //         },
    //         {
    //           label: 'Lawyers.txt',
    //           to: 'https://supabase.io/lawyers.txt',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Resources',
    //       items: [
    //         {
    //           label: 'Docs',
    //           to: '/docs',
    //         },
    //         {
    //           label: 'Pricing',
    //           to: '/docs/pricing',
    //         },
    //         {
    //           label: 'Support',
    //           to: '/docs/support',
    //         },
    //         {
    //           label: 'System Status',
    //           to: 'https://status.supabase.io/',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Community',
    //       items: [
    //         {
    //           label: 'GitHub',
    //           href: 'https://github.com/supabase/supabase',
    //         },
    //         {
    //           label: 'Twitter',
    //           href: 'https://twitter.com/supabase_io',
    //         },
    //         {
    //           label: 'DevTo',
    //           href: 'https://dev.to/supabase',
    //         },
    //         {
    //           label: 'RSS',
    //           href: 'https://supabase.io/blog/rss.xml',
    //         },
    //         // {
    //         //   label: "Discord",
    //         //   href: "https://discordapp.com/invite/docusaurus"
    //         // }
    //       ],
    //     },
    //     {
    //       title: 'Beta',
    //       items: [
    //         {
    //           label: 'Join our beta',
    //           href: 'https://app.supabase.io',
    //         },
    //       ],
    //     },
    //   ],
    //   copyright: `Copyright © ${new Date().getFullYear()} Supabase.`,
    // },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [
            require('remark-admonitions')
          ]
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        }
      },
    ],
  ],
  themes: ['@docusaurus/theme-live-codeblock']
}
