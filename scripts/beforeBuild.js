const del = require('del')
const path = require('path')


const outDir = path.resolve(__dirname, '../build')
async function beforeBuild() {
  await del([outDir], { force: true })
}

beforeBuild()
