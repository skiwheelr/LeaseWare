import { RestApiRetriever, RestApiDeleter, RestApiUpdater, RestApiCreator, AuthRetriever, ODataApiRetriever } from '../../src/middleware/retrievers'
import CredentialStore from '../../src/middleware/credentialStore';
import odataget from '../../src/middleware/odatafetch'

require('constants')

async function setCredentials()
{
    let authRetriever = new AuthRetriever('http://test.karveinformatica.com:14000')
    let credentialStore = new CredentialStore()
    let payload = {
	Code: 'CV',
	Password: '1929',
	Blowfish: false,
        Office: { 'Code': 'C1'},
        Token: ''
    }
    let credentialData = null
    try
    {
	// this saves to the localStorage the data	
	credentialData = await authRetriever.fetchData(payload, (token=>{
	    credentialStore.store(token)
	}));		

	// now the api should be authenticate or throw an error
    } catch (authError)
    {
	console.log(authError)     
    }
    return credentialStore
}
test('Should login correctly', async function (){
    let authRetriever = new AuthRetriever('http://test.karveinformatica.com:14000')
    let credentialStore = new CredentialStore()
    let payload = {
	Code: 'CV',
	Password: '1929',
	Blowfish: false,
        Office: { 'Code': 'C1'},
        Token: ''
    }
    try
    {
	// this saves to the localStorage the data	
	const data = await authRetriever.fetchData(payload, (token=>{
	    credentialStore.store(token)
	}));		

	// now the api should be authenticate or throw an error
    } catch (authError)
    {
	console.log(authError)     
    }
    expect(credentialStore.get()).toBeDefined()
    expect(credentialStore.get()['PasetoToken']).toBeDefined()
})


test('Should get a contract correctly', async function(){

    let odata = await odataget('http://test.karveinformatica.com:14000/odata/Contracts')
    let candidateId = odata[0].Code   

    let store = await setCredentials()
    let credentials = store.get()['PasetoToken']
    // now in the store we have to get a contract
    var restApi = new RestApiRetriever('http://test.karveinformatica.com:14000')
    restApi.setCredentials(credentials)
    let data = null
    let contractEP = "api/Contract/"+candidateId
    try
    {
	data = await restApi.fetchData({endpoint : contractEP})
    }catch (error)
    {
	expect(data).not.toBeNull()
	console.error(error)
    }
    expect(data).not.toBeNull()
    expect(data).toHaveProperty('Code')
    expect(data.Code).toBe(candidateId)
})
test('Should delete a contract correctly', async function() {

    let odata = await odataget('http://test.karveinformatica.com:14000/odata/Contracts')
    let candidateId = odata[0].Code   
    let store = await setCredentials()
    let credentials = store.get()['PasetoToken']
    var restApi = new RestApiRetriever('http://test.karveinformatica.com:14000')
    let deleteApi = new RestApiDeleter('http://test.karveinformatica.com:14000')

    restApi.setCredentials(credentials)
    deleteApi.setCredentials(credentials)
    
    let resultMessage = { AppResultCode: 0,
			  AppResultMessage: '' }
    try
    {
	resultMessage = await deleteApi.deleteData('Contract',candidateId)
    }
    catch(error)
    {
	console.error(error)
    }
    expect(resultMessage.AppResultCode).toBe(0)
})

test('Should create a contract correctly', async function(){
	 let store = await setCredentials()
	 let credentials = store.get()['PasetoToken']
	 var restApi = new RestApiCreator('http://test.karveinformatica.com:14000', credentials)

	 let data = { BookingNumber:'892829',
		      CreationDate:"2018-11-28T16:21:01.1726289+01:00",
	              DepartureDate:"2018-11-28T10:00:00+01:00",
		      ArrivalDate:"2019-01-07T16:21:01.1726289+01:00",	       
		      ContractNo: null,
		      CreationOffice: null,
		      DepartureOffice: null,
		      ArrivalOffice: null,
		      Rsc: null,
		      Frigoshours: 0,
		      Subtotal: 0,
		      Iva: 0,
		      Total: 0,
		      Selfbond: false,
		      Existbond: false,
		      BondNumber: 0,
		      TotalOverDiscount: false,
		      Notpendingbilling: false,
		      Contractitems:[{ Concept:{
			  Code:"1",
			  Description:"Alquiler"
		      },Unity:1,Quantity:1,Price:200.0,Discount:0.2,Subtotal:200.0}],
		      DriversAndClients:[
			  { Code:"000077",
			    Name:"ANDALUCIA DIGIT. MULTIMEDIA SA",
			    isDriver:false,
			    Taxcode:null,
			    Birthplace: "Malaga",
			    Birthdate:"0001-01-01T00:00:00",
			    DrivingLicense:null,
			    DrivingNumber:null,
			    Address:null,
			    Phone:null,
			    Mobile:null,
			    Fax:null,
			    Email:null,
			    HotelDirection:null}]
            }
     let noExcept = false
	 try
	 {
  	     let created = await restApi.createData('Contract',data)
         noExcept = true
         expect(created).not.toBeNull()
	     expect(created.AppResultMessage).not.toBeNull()	     
	 } catch(error)
     {
	     console.log('Error '+error)
     }
     expect(noExcept).toBeTruthy()
})
test('Should retrieve a contract list correctly', async function(){
    let retriever = new ODataApiRetriever('http://test.karveinformatica.com:14000')
    let value = await retriever.fetchData({ endpoint: 'odata/Contracts'})
    expect(value.length).toBe(1000)
})


     
	



