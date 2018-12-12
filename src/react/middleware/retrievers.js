import fetch from 'isomorphic-fetch'
import request from 'request'

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
class BasicRetriever
{
    constructor(serviceRoot)
    {
	this.serviceRoot = serviceRoot
	this.headers = { 'Content-Type': 'application/json',
			 'User-Agent': 'KarveAgent 4.0',
			 'Authorization': '',
			 'Accept': 'application/json'};
    }
    addAuthenticator(token)
    {
	this.headers['Authorization'] = token
    }
}

/*
 * RestApiRetriever. Retrieve the endpoint value 
 */
export class RestApiRetriever extends BasicRetriever
{
    
    constructor(serviceRoot)
    {	
	super(serviceRoot)
    }
    async fetchData(payload, authToken, callback)
    {
	return await fetchSubject(this.serviceRoot, authToken, payload.endpoint, callback)
    }  
}
export  class ODataApiRetriever extends BasicRetriever
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
    fetchData(payload, authToken, callback)
    {
	//this.addAuthenticator(authToken)	
	let baseService = this.serviceRoot + "/" + payload.endpoint
	let sortQuery = ""
	if ((payload.sorted || []).length)
	    
	{  sortQuery = `&$orderby=` + (payload).sorted.map((obj) =>
							   { return obj.direction === 'descending' ? `${obj.Code} desc` : obj.Code; }).reverse().join(',');
	}
	this.options['url'] = `${baseService}?${sortQuery}&$inlinecount=allpages&$format=json`;
	this.options['headers'] = this.headers
	
	request(this.options, callback)
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
