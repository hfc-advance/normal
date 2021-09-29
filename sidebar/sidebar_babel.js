module.exports = [
  {
    type: 'category',
    label: '工程配置项',
    collapsed: true,
    items: ['enginee/configItems/frontProjectConfigItems'],
  },
  {
    type: 'category',
    label: 'eslint',
    collapsed: true,
    items: ['enginee/eslint/eslintEditorconfig', 'enginee/eslint/eslintConfigOptions'],
  },
  // {
  //   type: 'category', label: '',
  //   items: ['enginee/findConfig/getEngineeConfigFile'],
  //   collapsed: true
  // },
  { type: 'category', label: 'Babel', items: ['enginee/babel/babel', 'enginee/babel/babelPlugins', 'enginee/babel/babelVersions', 'enginee/babel/babelPluginAna', 'enginee/babel/babelBase', 'enginee/babel/babelMacros'], collapsed: true },
  {
    type: 'category',
    label: 'webpack',
    collapsed: true,
    items: ['enginee/webpack/webpackLoader', 'enginee/webpack/webpackOftenFunctional', 'enginee/webpack/webpackCompileProcess', 'enginee/webpack/webpackTapable', 'enginee/webpack/webpackModuleFederation', 'enginee/webpack/webpackAssetModule', 'enginee/webpack/webpack5Changelog', 'enginee/webpack/webpackOptimization', 'enginee/webpack/webpackImportantMethod', 'enginee/webpack/webpackOftenPkg', 'enginee/webpack/webpackFood', 'enginee/webpack/webpackComponentNotice', 'enginee/webpack/webpackPlugin', 'enginee/webpack/webpackUsefulPlugin'],
  },
  {
    type: 'category',
    label: 'npm',
    collapsed: true,
    items: ['enginee/npm/packagejsonKeys', 'enginee/npm/npmShell', 'enginee/npm/.npmrc', 'enginee/npm/node_modules'],
  },
  {
    type: 'category',
    label: 'git',
    collapsed: true,
    items: ['enginee/git/gitNotify'],
  },
  {
    type: 'category',
    label: 'typescript',
    collapsed: true,
    items: ['enginee/typescript/typescriptBseconfig'],
  },
  {
    type: 'category',
    label: 'postcss',
    collapsed: true,
    items: ['enginee/postcss/postcssPlugin'],
  },
  {
    type: 'category',
    label: 'prettier',
    collapsed: true,
    items: ['enginee/prettier/prettierPlugin'],
  },
  {
    type: 'category',
    label: 'stylus',
    collapsed: true,
    items: ['enginee/stylus/stylusUsefulPlugin'],
  },
  {
    type: 'category',
    label: 'lerna',
    collapsed: true,
    items: ['enginee/lerna/lernaApi']
  }
]