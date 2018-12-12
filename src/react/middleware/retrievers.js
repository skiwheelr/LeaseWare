import fetch from 'isomorphic-fetch'
import request from 'request'
import odataget from './odatafetch'

function fetchAuthToken(host, body, use)
{
    
    return fetchCredentials(host, body)
	.then(function(response) {
            let error = response.status < 200 && response.status >= 300 
	    if (error)
	    {
		throw new Error("Authorization Error "+  response.status)
	    }
	    return response.json();
	}).then(function(data)
		{
		    use(data)
		})
	.catch(error=>console.log(error))
}

function fetchSubject(host, token, domain, use)
{
    let uri = host + "/api/"+domain
    return fetch(uri, {
	method:'GET',
	headers :{'Content-Type': 'application/json',
		  'Authorization': token}		 
    }).then(function(response)
	    {
		let error = response.status < 200 && response.status >= 300 
		if (error)
		{
		    throw new Error("Error "+  response.status)
		}
		return response.json();
	    }).then(function(data)
		    {
			use(data)
		    })
	.catch(error=>console.log(error))
}

/**
 * fetch the credentials in the api to allow the api 
 * to login.
 * @param {hostname} host 
 * @param {value } body 
 */
function fetchCredentials(host, body)
{    
    let uri = host + "/api/Login/"
    return fetch(uri, {
	method:'POST',
	body: JSON.stringify(body),
	headers :{'Content-Type': 'application/json'}		 
    });
}

/*
 * Basic retriever for interfacing with a remote api.
 */
class BaseRemoteApi
{
    constructor(serviceRoot)
    {
	this.serviceRoot = serviceRoot
	this.credentials = ''
    }
    setCredentials(token)
    {
	this.credentials = token
    }
}

export class ProxyApi extends BaseRemoteApi
{

    constructor(serviceRoot)
    {
	super(serviceRoot)
	this.verbHandler = {
	    'GET': new RestApiRetriever(serviceRoot),
	    'POST': new RestApiCreator(serviceRoot),
	    'PUT': new RestApiUpdater(serviceRoot),
	    'DELETE': new RestApiDeleter(serviceRoot)
	}
    }
    async handleData(action, credentials)
    {
	let verb = action.method
	let handler = this.verbHandler[verb]
	handler.setCredentials(credentials)
	switch(verb)
	{
	    case 'GET':
	    {
		return handler.fetchData(action.payload)
	    }
	    case 'POST':
	    {
	      return handler.createData(action.entityName, action.payload)
	    }
	    case 'PUT':
	    {
	      return handler.updateData(action.entityName, action.payload)
	    }
	    case 'DELETE' :
	    {
	      return handler.deleteData(action.entityName, action.payload.Code)
	    }
	}
    }
}
/*
 * RestApiRetriever. Retrieve the endpoint value 
 */
export class RestApiRetriever extends BaseRemoteApi
{
    
    constructor(serviceRoot)
    {
	super(serviceRoot)
    }	
    /*
     * 
     */
    async fetchData(payload)
    {
	let uri = `${this.serviceRoot}/${payload.endpoint}`
	let result = null
	let token = this.credentials

	try
	{
            result  = await fetch(uri, {
		method:'GET',
		headers :{'Content-Type': 'application/json',
			  'Authorization': token}})
	    let error = result.status < 200 && result.status >= 300 
	    if (error)
	    {
		throw new Error("Retrieving error "+  result.statusText)
	    }
	    else
	    {
		const data = await result.json()
		return data
	    }
	    
	} catch(exc)
	{
	    throw new Error("Retrieving error: " + exc)
	}
	return result
    }
}
/*
 * RestApiUpdater. Update the end point value 
 */
export class RestApiUpdater extends BaseRemoteApi
{
    
    constructor(serviceRoot)
    {
	super(serviceRoot)
    }
    async updateData(modelName, data)
    {
	let uri = `${this.serviceRoot}/api/${modelName}`
	let headers = { 'Content-Type': 'application/json',
			'User-Agent': 'KarveAgent 4.0',
			'Authorization': this.credentials };
	let result = null
	try {
	    result = await fetch(uri, {
		method:'PUT',
		headers : headers,
		body: JSON.stringify(data)
	    })
	    
	} catch (error)
	{
	    throw new Error('Error during updating')
	}
	return result
    }
}
/*
 * RestApiCreator. Create the end point value 
 */
export class RestApiCreator extends BaseRemoteApi
{
    constructor(serviceRoot)
    {
	super(serviceRoot)
    }
    async createData(modelName, data)
    {
	let uri = `${this.serviceRoot}/api/${modelName}`
	let headers = { 'Content-Type': 'application/json',
			'User-Agent': 'KarveAgent 4.0',
			'Authorization': this.credentials };
	console.log(uri)
	let result = null
	let hasError = false
	var resultMessage = { AppResultCode: 0,
			     AppResultMessage: '' }
	try {
	    result = await fetch(uri, {
		method:'POST',
		headers : headers,
		body: JSON.stringify(data)
	    })
	    hasError = result.status < 200 && result.status >= 300 
	    resultMessage = await result.json()
	} catch (error)
	{
	    throw new Error('Error during creation')
	}
	return resultMessage
    }
}
/*
 * RestApiUpdater. Update the end point value 
 */
export class RestApiDeleter extends BaseRemoteApi
{
    constructor(serviceRoot)
    {	
	super(serviceRoot)
    }
    async deleteData(modelName, id)
    {
	let uri = `${this.serviceRoot}/api/${modelName}/${id}`
	let headers = { 'Content-Type': 'application/json',
			'User-Agent': 'KarveAgent 4.0',
			'Authorization': this.credentials };
	let result = null
	let hasError = false
	var resultMessage = { AppResultCode: 0,
			     AppResultMessage: '' }

	try {
	    result = await fetch(uri, {
		method:'DELETE',
		headers : headers
	    })
	    hasError = result.status < 200 && result.status >= 300 
	    resultMessage = await result.json()
	}
	catch (error)
	{
	    throw new Error('Error during deletion')
	}
	if (hasError)
	{
	   throw new Error(resultMessage.AppResultMessage)
	}
	return resultMessage
    }
}
export class ODataApiRetriever extends BaseRemoteApi
{
    constructor(serviceRoot)
    {
	
	super(serviceRoot)
	this.headers = { 'Content-Type': 'application/json',
			 'User-Agent': 'KarveAgent 4.0',
			 'Odata-Version': '4.0',
   			 'OData-MaxVersion': '4.0',
			 'Accept': 'application/json'};
	this.options =
	    {
		url: serviceRoot,
		headers: this.headers
	    }
	
    }
    async fetchData(payload)
    {
	//this.addAuthenticator(authToken)	
	let baseService = this.serviceRoot + "/" + payload.endpoint
	return await odataget(baseService)
	
    }
}
export class AuthRetriever
{
    constructor(serviceRoot)
    {
	this.serviceRoot = serviceRoot;
    }
    
    async fetchData(payload, callback)
    {
	let uri = this.serviceRoot
	return await fetchAuthToken(uri, payload, callback)
    }  
}
