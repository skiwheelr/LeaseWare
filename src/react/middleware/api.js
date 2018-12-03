import request from 'request'
import { NetworkConfig }  from '../constants/netconfig'
import fetch from 'isomophic-fetch'
import { AuthRetriever, RestApiRetriever, ODataApiRetriever } from 'retrievers'


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

export default const api = ({ dispatch }) => next=> action =>{
    
    if ((action.apiType !== 'OData') &&
	(action.apiType !== 'Rest') &&
	(action.apiType !== 'Auth'))
    {
	return next(action)
    }
    
    const [requestType, successType, errorType] = action.types;    
    const token = localStorage.getItem("pasetoToken") || null;
    const {payload} = action
    // we fetch/get/post just when we dont need the auth token
    if (payload.apiType !=='Auth')
    {
	apiHandler[payload.apiType].fetchData(payload, token, (error,response,body)=>{

	    if ((error) || (response.statusCode !== 200))
	    {
		dispatch({ type: errorType, error: error})
	    }
	    else
	    {
		dispatch({ response: JSON.parse(body), filters: payload.filters,
			   type: successType })
	    }
	})
    }
    else
    {
	apiHandler[payload.apiType].fetchData(payload)
    }
}

    
