/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const goTrueClient = require('./sidebar_spec_gotrue')
const postgrestClient = require('./sidebar_spec_postgrest')
const realtimeClient = require('./sidebar_spec_realtime')
const supabaseClient = require('./sidebar_spec_supabase')

// Babel: ['enginee/babel/babel', 'enginee/babel/babelPlugins', 'enginee/babel/babelVersions', 'enginee/babel/babelPluginAna', 'enginee/babel/babelBase'],
// webpack: ['enginee/webpack/webpackOftenPkg', 'enginee/webpack/webpackFood', 'enginee/webpack/webpackComponentNotice', 'enginee/webpack/webpackPlugin'],
// npm: ['enginee/npm/packagejsonKeys', 'enginee/npm/npmShell', 'enginee/npm/.npmrc', 'enginee/npm/node_modules'],
// typescript: ['enginee/typescript/typescriptBseconfig'],
// postcss: ['enginee/postcss/postcssPlugin'],
// prettier: ['enginee/prettier/prettierPlugin'],
// 配置项: ['enginee/projectConfigItem', 'enginee/projectUpdatePac'],
// stylus: ['enginee/stylus/stylusUsefulPlugin']
module.exports = {
  goTrueClient: goTrueClient.docs,
  postgrestClient: postgrestClient.docs,
  realtimeClient: realtimeClient.docs,
  supabaseClient: supabaseClient.docs,
  docs: [
    { type: 'category', label: 'Babel', items: ['enginee/babel/babel', 'enginee/babel/babelPlugins', 'enginee/babel/babelVersions', 'enginee/babel/babelPluginAna', 'enginee/babel/babelBase'], collapsed: false },
    {
      type: 'category',
      label: 'webpack',
      collapsed: false,
      items: ['enginee/webpack/webpackOftenPkg', 'enginee/webpack/webpackFood', 'enginee/webpack/webpackComponentNotice', 'enginee/webpack/webpackPlugin'],
    },
    {
      type: 'category',
      label: 'npm',
      collapsed: false,
      items: ['enginee/npm/packagejsonKeys', 'enginee/npm/npmShell', 'enginee/npm/.npmrc', 'enginee/npm/node_modules'],
    },
    {
      type: 'category',
      label: 'typescript',
      collapsed: false,
      items: ['enginee/typescript/typescriptBseconfig'],
    },
    {
      type: 'category',
      label: 'postcss',
      collapsed: false,
      items: ['enginee/postcss/postcssPlugin'],
    },
    {
      type: 'category',
      label: 'prettier',
      collapsed: false,
      items: ['enginee/prettier/prettierPlugin'],
    },
    {
      type: 'category',
      label: '配置项',
      collapsed: false,
      items: ['enginee/projectConfigItem', 'enginee/projectUpdatePac'],
    },
    {
      type: 'category',
      label: 'stylus',
      collapsed: false,
      items: ['enginee/stylus/stylusUsefulPlugin'],
    },
  ],
  goTrueServer: [
    {
      type: 'category',
      label: 'GoTrue',
      collapsed: false,
      items: ['gotrue/server/about'],
    },
  ],
  realtimeServer: [
    {
      type: 'category',
      label: 'Realtime',
      collapsed: false,
      items: ['realtime/server/about'],
    },
    {
      type: 'category',
      label: 'Self hosting',
      collapsed: false,
      items: [
        'realtime/server/docker',
        'realtime/server/aws',
        'realtime/server/digitalocean',
        'realtime/server/source',
      ],
    },
  ],
  // realtimeClient: [
  //   {
  //     type: 'category',
  //     label: 'Realtime',
  //     collapsed: false,
  //     items: ['realtime/client/about'],
  //   },
  // ],
  postgrestServer: [
    {
      type: 'category',
      label: 'PostgREST',
      collapsed: false,
      items: ['postgrest/server/about'],
    },
  ],
  postgresServer: [
    {
      type: 'category',
      label: 'Postgres',
      collapsed: false,
      items: ['postgres/server/about'],
    },
    {
      type: 'category',
      label: 'Self hosting',
      collapsed: false,
      items: ['postgres/server/docker', 'postgres/server/aws', 'postgres/server/digitalocean'],
    },
  ],
  postgresApi: [
    {
      type: 'category',
      label: 'Postgres API',
      collapsed: false,
      items: ['postgres/api/about'],
    },
  ],
}
