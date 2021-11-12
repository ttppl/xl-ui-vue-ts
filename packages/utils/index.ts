const utils = {}
const utilsModule = require.context('./', true, /[A-Za-z0-9-_,\s]+\.ts$/i)
utilsModule.keys().forEach(k => {
  const name = k.match(/(\.\/)(.+)(\.ts)/)[2]
  if (!k.includes('index')) { utils[name] = utilsModule(k).default }
})

export default utils
