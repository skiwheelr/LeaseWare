import * as contractActions from '../../src/actions/contracts';
import * as loginActions from '../../src/actions/auth';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mockRequestError, mockRequest } from 'axios';
import axios from 'axios;'
import MockAdapter from 'axios-mock-adapter'

let contractMock100 = {  Code: '100',
			 BookingNumber:'892829',
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

let mockContract = { status: 200, json: () => (contractMock100) }
let mockResponseOk = { status: 200, json: () => ({AppResultCode: 0, AppResultMessage: '100' }) }
const contractBaseUrl = 'http://test.karveinformatica.com/Contract/'
const mockStore = configureStore([ thunk ]);

describe('actions', () => {
    it('should create an action to login', () => {
	
	let payload = {
	    Code: 'CV',
	    Password: '1929',
	    Blowfish: false,
            Office: { 'Code': 'C1'},
            Token: ''
	}
	
	expect(loginActions.requestLogin(payload)).toMatchSnapshot();
    }); 
    it('should create an action to logout', () => {	
	expect(loginActions.requestLogout()).toMatchSnapshot();
    })
    
    describe('contract operations', () => {
	let store;
	beforeEach(() => store = mockStore({}));
	afterEach( () => fetchMock.restore());
	it('should fetch a contract if exists', () => {
	    fetchMock.get(`${contractBaseUrl}/100`, mockContract)
	    return store.dispatch(contractActions.getContract('100'))
		.then(() => expect(store.getActions()).toMatchSnapshot())
	});
	it('should fail fetch if a contract not found', () => {
		fetchMock.get(`${contractBaseUrl}/100`, 404)
	    return store.dispatch(actions.getContract('100'))
		.then(() => expect(store.getActions()).toMatchSnapshot())
	});
	it('should fail insertion of a contract if a contract found', () => {
		fetchMock.post(`${contractBaseUrl}`, 404)
	    return store.dispatch(actions.addContract(contractMock100))
		.then(() => expect(store.getActions()).toMatchSnapshot())
	});
	it('should  insert of a contract if a contract found', () => {
		fetchMock.post(`${contractBaseUrl}`, mockResponseOk)
	    return store.dispatch(actions.addContract(contractMock100))
		.then(() => expect(store.getActions()).toMatchSnapshot())
	});
	it('should fail update  of a contract if a contract not found', () => {
	  	fetchMock.put(`${contractBaseUrl}/100`, 404)  
		return store.dispatch(actions.updateContract(contractMock100))
		.then(() => expect(store.getActions()).toMatchSnapshot())
	});
	it('should fail deletion of fetch if a contract not found', () => {
		fetchMock.delete(`${contractBaseUrl}/100`, 404)  
	    return store.dispatch(actions.deleteContract('100'))
		.then(() => expect(store.getActions()).toMatchSnapshot())
	});
	it('should delete a contract if exists', () => {
		fetchMock.delete(`${contractBaseUrl}/100`, mockResponseOk)  
		    return store.dispatch(actions.deleteContract('100'))
		.then(() => expect(store.getActions()).toMatchSnapshot())
	});      
    });
});
