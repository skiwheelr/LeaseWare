import request from 'request'
import { NetworkConfig }  from '../constants/netconfig'
import fetch from 'isomorphic-fetch'
import { AuthRetriever, ProxyApi, ODataApiRetriever } from './retrievers'
import CredentialStore from './credentialStore';
import {requestLogin, receiveLogin,loginError} from '../actions/auth'

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
    'Rest': new ProxyApi(NetworkConfig['baseUri']),
    'Auth': new AuthRetriever(NetworkConfig['baseUri'])
    
}

async function storeCredential(action, credentialStore)
{
    const data = await apiHandler[action.apiType].fetchData(action, (token=>{
	credentialStore.store(token)
    }))
    
}

var credentialStore = new CredentialStore()

export const api = ({ dispatch })=>next=>async(action)=>{
    
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
	    let retriever = apiHandler[action.apiType]
	    retriever.setCredentials(token)
	    let body = null
	    try
	    {
		body = await retriever.fetchData(action)
		dispatch({ response: body, filters: action.filters,
			   type: successType })	    
	    } catch (error)
	    {
		dispatch({ type: errorType, error: error})
	    }
    }
    else
    {
	storeCredential(action, credentialStore)
        let storeAction = credentialStore.get()
	if (storeAction.pasetoToken !== undefined )
	{
            dispatch(receiveLogin(action, storeAction.pasetoToken))
	}
	else
	{
	    dispatch(loginError('Error during login'))
	}
    }
}

    
