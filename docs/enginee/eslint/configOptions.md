---
id: eslintConfigOptions
title: eslint options
hide_title: true
sidebar_label: 配置项
---
import Parser, { rightToc as ParserRightToc } from './configOptions/_partial-parser.md'
import ParserOptions, { rightToc as ParserOptionsRightToc } from './configOptions/_partial-parserOptions.md'
import Processor, { rightToc as ProcessorRightToc } from './configOptions/_partial-processor.md'
import Env, { rightToc as EnvRightToc } from './configOptions/_partial-env.md'
import Global, { rightToc as GlobalRightToc } from './configOptions/_partail-global.md'
import Plugins, { rightToc as PluginsRightToc } from './configOptions/_partial-plugins.md'
import Extends, { rightToc as ExtendsRightToc } from './configOptions/_partial-extends.md'
import Root, { rightToc as RootRightToc } from './configOptions/_partial-root.md'
import Overrides, { rightToc as OverridesRightToc } from './configOptions/_partial-overrides.md'
import Settings, { rightToc as SettingsRightToc } from './configOptions/_partial-settings.md'
import BestUsage, { rightToc as BestUsageRightToc } from './configOptions/_partial-best-usage.md'

<Parser />
<ParserOptions />
<Processor />
<Env />
<Global />
<Plugins />
<Extends />
<Root />
<Overrides />
<Settings />
<BestUsage />

export const rightToc = [
  ...ParserRightToc,
  ...ParserOptionsRightToc,
  ...ProcessorRightToc,
  ...EnvRightToc,
  ...GlobalRightToc,
  ...PluginsRightToc,
  ...ExtendsRightToc,
  ...RootRightToc,
  ...OverridesRightToc,
  ...SettingsRightToc,
  ...BestUsageRightToc
]
