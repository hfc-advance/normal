const publish = require('ali-oss-publish')
const path = require('path')
const config = require('./config.js')

async function compile() {
   publish({
      id: config.id,
      secret: config.secret,
      region: 'oss-cn-shanghai',
      bucket: 'hfcui-site',
      entry: path.resolve(__dirname, '..', 'build'), // defaults to '.'
      headers: {
        'Cache-Control': 'max-age=30672000',
        'Access-Control-Allow-Origin': '*'
      },
      output: 'personal-site/'
    }, (err, stats) => {
      if (err) {
        console.error('ali-oss-publish encountered a fatal error.')
        console.error(err)
        process.exit(1)
      }
      if (stats.hasProgress()) {
        const {
          type,
          index,
          current,
          total,
          message
        } = stats
        console.log('[%s] [%s/%s] #%s: %s', type, current, total, index, message)
      } else {
        console.log(stats.message)
      }
      if (stats.hasWarnings()) {
        console.warn('ali-oss-publish encountered some warnings.')
        stats.warnings.forEach((x) => {
          console.warn(x)
        })
      }
      if (stats.hasErrors()) {
        console.error('ali-oss-publish encountered some errors.')
        stats.errors.forEach((x) => {
          console.error(x)
        })
      }
    })
}

compile()
