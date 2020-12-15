const path = require('path')

const file = require.context('./',true,/\.ts/)

const modules:any = {}

file.keys().forEach(key=>{
    const name = path.basename(key,'.ts')
    if(name==='index') return
    modules[name] = file(key).default || file(key)
})


export default modules