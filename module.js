import module_ from './module_.js'

await new Promise((resolve) => {
  setTimeout(resolve, 6000);
})

export default module_ + 1