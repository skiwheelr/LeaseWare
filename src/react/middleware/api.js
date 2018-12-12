import request from 'request'
import { NetworkConfig }  from '../constants/netconfig'
import fetch from 'isomorphic-fetch'
import { AuthRetriever, RestApiRetriever, ODataApiRetriever } from './retrievers'
import CredentialStore from './credentialStore';


function fetchCredentials(host, body)
{
    
    let uri = host + "/api/Login/"
    let response = fetch(uri,
			 {
			     method:'POST',
			     body: JSON.stringify(body),
			     headers :{'Content-Type': 'application/json'}
			 })
    return response;
}

/*
 * Handler for the API 
 **/
const apiHandler = {
    'OData': new ODataApiRetriever(NetworkConfig['baseUri']),
    'Rest': new RestApiRetriever(NetworkConfig['baseUri']),
    'Auth': new AuthRetriever(NetworkConfig['baseUri'])
    
}

var credentialStore = new CredentialStore()

async function storeCredential(action, credentialStore)
{
    const data = await apiHandler[action.apiType].fetchData(action, (token=>{
	credentialStore.store(token)
    }))							   
}

export const api = ({ dispatch }) => next=> action =>{
    
    if ((action.apiType !== 'OData') &&
	(action.apiType !== 'Rest') &&
	(action.apiType !== 'Auth'))
    {
	return next(action)
    }
    
    const [requestType, successType, errorType] = action.types;    
    const token = credentialStore.get() || null;
   
	
    // we fetch/get/post just when we dont need the auth token
    if (action.apiType !=='Auth')
    {

	apiHandler[action.apiType].fetchData(action, token, (error,response,body)=>{
	    if ((error) || (response.statusCode !== 200))
	    {
		dispatch({ type: errorType, error: error})
	    }
	    else
	    {
	 	
		dispatch({ response: JSON.parse(body), filters: action.filters,
			   type: successType })
	    }
	})
    }
    else
    {
	storeCredential(action)
    }
}

    
