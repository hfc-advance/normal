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
  clientModules: [
    require.resolve('./role.js')
  ],
  baseUrl: '/',
  favicon: '/favicon.ico',
  organizationName: 'supabase', // Usually your GitHub org/user name.
  projectName: 'supabase', // Usually your repo name.
  onBrokenLinks: 'ignore',
  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: false,
      defaultMode: 'light',
      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: true
    },
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
        src: '/read.svg',
        srcDark: '/read.svg',
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
          label: 'vue',
          activeBasePath: '/docs/vue/base/vueChange',
          to: '/docs/vue/base/vueChange',
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
          label: 'package',
          activeBasePath: '/docs/package/js/jsMaybePkg',
          to: '/docs/package/js/jsMaybePkg',
          position: 'left',
        },
        {
          label: 'good',
          activeBasePath: '/docs/goods/performance/cachePerformance',
          to: '/docs/goods/performance/cachePerformance',
          position: 'left',
        },
        {
          label: 'git',
          activeBasePath: '/docs/git/skill/gitSkillBlack',
          to: '/docs/git/skill/gitSkillBlack',
          position: 'left',
        },
        {
          label: 'tool',
          activeBasePath: '/docs/tools/web/oftenWebTools',
          to: '/docs/tools/web/oftenWebTools',
          position: 'left',
        },
        {
          label: 'other',
          activeBasePath: '/docs/other/cookies/cookiesBaseAttr',
          to: '/docs/other/cookies/cookiesBaseAttr',
          position: 'left',
        },
        {
          label: '性能优化',
          activeBasePath: '/docs/performance/performanceJSplit',
          to: '/docs/performance/performanceJSplit',
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
      plugins: ['line-numbers'],
      theme: require('prism-react-renderer/themes/dracula'),
      additionalLanguages: ['php'],
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
            require('remark-admonitions/styles/classic.css')
          ]
        },
        theme: {
          customCss: [require.resolve('./src/scss/application.scss'), require.resolve('./src/css/custom.css')]
        }
      },
    ],
  ],
  plugins: ['docusaurus-plugin-sass'],
  themes: ['@docusaurus/theme-live-codeblock']
}
