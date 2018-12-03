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
* RestApiRetriever.
*/
export default class RestApiRetriever extends BasicRetriever
{
    
    constructor(serviceRoot)
    {	
	super(serviceRoot)
    	this.options =
	    {
		url: serviceRoot,
		headers: this.headers
	    }
    }
    fetchData(payload, authToken, callback)
    {
	// just for now.
	if (authToken == null)
	{
	    var authRetriever = new AuthRetriever(this.serviceRoot)
	    payload = {
		'user': 'CV',
		'password': '1929',
		'blowfish': false,
		'officeCode': 'C1'
	    }
	    authRetriever.fetchData(payload)
	}
	this.addAuthenticator(authToken)	
	let baseService = this.serviceRoot + "/" + payload.endpoint
	this.options['url'] = baseService;
	this.options['headers'] = this.headers;
	request(this.options, callback)
    }  
}
export default class ODataApiRetriever extends BasicRetriever
{
    constructor(serviceRoot)
    {
	
	super(serviceRoot)
	this.headers = { 'Content-Type': 'application/json',
			 'User-Agent': 'KarveAgent 4.0',
			 'Authorization:': '',
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

export default class AuthRetriever
{
    constructor(serviceRoot)
    {
	this.options =
	    {
		url: serviceRoot,
		method: 'POST',
		headers: {'Content-Type': 'application/json'}
	    }
	this.uri = serviceRoot + "/api/Login" 
    }
    
    fetchData(payload)
    {
	let credentials =
	    {
		Code: payload.user,
		Password: payload.password,
		Office: { "Code": payload.officeCode},
		Blowfish: payload.blowfish		
	    }
	fetchCredentials(this.uri, credentials).
	    then(response=>{
		if (response.status > 200)
		{
		    throw new Error("Bad response from server");
		}
	    })
	    .then(value =>{
		let credential = value["PasetoToken"]
		localStorage.setItem('PasetoToken', credential)
	    })
    }
}
