export const Url=(ruta)=>{
    const base='https://209.105.239.29/PruebaReactJs/Api/'
    return base+ruta
}

export const HeaderRuta=(access)=>{
    const obj={"Content-Type":"application/json",
    "x-access-token":access,
    "Accept":"*/*",
    "Accept-Encoding":"gzip, deflate, br"
 }
    return obj
}