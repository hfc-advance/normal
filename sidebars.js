/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const babeldoc = require('./sidebar/sidebar_babel.js')
const jsdoc = require('./sidebar/sidebar_js.js')
const reactdoc = require('./sidebar/sidebar_react.js')
const tsdoc = require('./sidebar/sidebar_ts.js')
const cssdoc = require('./sidebar/sidebar_css.js')
const nodedoc = require('./sidebar/sidebar_node.js')
const otherdoc = require('./sidebar/sidebar_other.js')

module.exports = {
  babeldoc,
  jsdoc,
  reactdoc,
  tsdoc,
  cssdoc,
  nodedoc,
  otherdoc
}
