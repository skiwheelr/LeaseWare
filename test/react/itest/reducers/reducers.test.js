import reducers from '../../../src/store/reducers/index.js'
import deepFreeze from 'deep-freeze';
import { receiveLogin, receiveLogout, loginError  } from '../../../src/actions/auth.js'
const initialState = deepFreeze(reducers(undefined, { type: 'INIT' }));
var payload = {
    Code: 'CV',
    Password: '1929',
    Blowfish: false,
    Office: { 'Code': 'C1'},
    Token: '666',
    writable: true
}
describe('auth reducer', ()=>
	 {
	     it('should handle unknown actions', () => {
		 expect(reducers(initialState, { type: 'FAKE' })).toBe(initialState);
	     });
	     it('should login when valid',()=>{
	         let currentState = reducers(initialState, receiveLogin(payload, '666'));
		 let userCredentials = currentState.authReducer.user
		 expect(userCredentials.Code).toBe('CV')
		 expect(userCredentials.Password).toBe('1929')
		 expect(userCredentials.Blowfish).toBe(false)
		 expect(userCredentials.Office.Code).toBe('C1')
		 expect(userCredentials.Token).toBe('666')
		 expect(currentState.authReducer.isAuthenticated).toBeTruthy()  
	     })
	     it('should logout out', ()=>{
		 const nonEmptyState = deepFreeze(reducers(initialState, receiveLogin(payload, '666')));
		 let currentState = reducers(nonEmptyState, receiveLogout())
		 let userCredentials = currentState.authReducer.user
		
		 expect(userCredentials.Code).toBe('')
		 expect(userCredentials.Password).toBe('')
		 expect(userCredentials.Blowfish).toBe(false)
		 expect(userCredentials.Office).toBeNull()
		 expect(userCredentials.Token).toBe('')
		 expect(currentState.authReducer.isAuthenticated).toBe(false)  
	     })
	     
	     it('should not be auth when login failed', ()=>{
		 let currentState = reducers(initialState, loginError('Auth failed'));		
		 expect(currentState.authReducer.isAuthenticated).toBe(false)

	     })

	     it('should not login when already logged', ()=>{
		 let localPayload = {
		     Code: 'GZ',
		     Password: '5277',
		     Blowfish: false,
		     Office: { 'Code': 'C3'},
		     Token: '7878',
		     writable: true
		 }
		 const nonEmptyState = deepFreeze(reducers(initialState, receiveLogin(payload)))
		 let currentState = reducers(nonEmptyState, receiveLogin(localPayload))
		 let userCredentials = currentState.authReducer.user
		 expect(currentState.authReducer.isAuthenticated).toBe(true)
		 expect(userCredentials.Code).toBe('CV')
		 expect(userCredentials.Password).toBe('1929')
		 expect(userCredentials.Blowfish).toBe(false)
		 expect(userCredentials.Office.Code).toBe('C1')
		 expect(userCredentials.Token).toBe('666')
		 expect(currentState.authReducer.errorCode).toBe(400)
	     })
	 })
describe('contract reducer', ()=>
	 {
	     it('should add a new contract', () => {
		 expect(reducers(initialState, { type: 'FAKE' })).toBe(initialState);
	     });
	 })


	
