const path = require('path')
const del = require('del')
const fsEx = require('fs-extra')
const execa = require('execa')
const targetDir = path.resolve(__dirname, '../../hfci.github.io/docs')
const gitCWD = path.resolve(targetDir, '../')

async function commit () {
  // await del([targetDir], { force: true })
  await fsEx.copy(path.resolve(__dirname, '../build'), targetDir)

  await execa(
    'git',
    ['add', '.'],
    { stdio: 'inherit', cwd: gitCWD }
  )
  await execa(
    'git',
    ['commit', '-m', 'auto'],
    { stdio: 'inherit', cwd: gitCWD }
  )
  await execa(
    'git',
    ['push'],
    { stdio: 'inherit', cwd: gitCWD }
  )
  await execa(
    'git',
    ['commit'],
    { stdio: 'inherit', cwd: gitCWD }
  )
}

commit()

