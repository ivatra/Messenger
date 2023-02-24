

async function bebra2(){
    console.log('4')
}
const bebra = async ()=>{
    console.log('2')
    Promise.resolve().then(async ()=> {
        bebra2()
    })
}

  

console.log('1')
bebra()
console.log('3')
