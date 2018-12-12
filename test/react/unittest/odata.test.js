import odataget from '../../src/middleware/odatafetch.js'
test('Should retrieve data from the odata contract correctly',async ()=>{
    let value = await odataget('http://test.karveinformatica.com:14000/odata/Contracts')
    expect(value.length).toBe(1000)
})


