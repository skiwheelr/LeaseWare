import {
    LOAD_CONTRACTS_REQUEST,
    LOAD_CONTRACTS_SUCCESS,
    LOAD_CONTRACTS_FAILURE,
    GET_CONTRACT_REQUEST,
    GET_CONTRACT_SUCCESS,
    GET_CONTRACT_FAILURE,
    UPDATE_CONTRACT_REQUEST,
    UPDATE_CONTRACT_SUCCESS,
    UPDATE_CONTRACT_FAILURE,
    ADD_CONTRACT_REQUEST,
    ADD_CONTRACT_SUCCESS,
    ADD_CONTRACT_FAILURE,
    DELETE_CONTRACT_REQUEST,
    DELETE_CONTRACT_SUCCESS,
    DELETE_CONTRACT_FAILURE,
    NEW_CONTRACT_REQUEST
} from "../constants/actions";


//contract actions

export function loadContracts(filters) {
    let token = localStorage.getItem("PasetoToken")
    return {
        endpoint: "/odata/Contracts",
	contracts: [],
	authToken: token,
	success: false,
	response: null,
        apiType: 'OData',
        filters: filters,	
        types: [LOAD_CONTRACTS_REQUEST, LOAD_CONTRACTS_SUCCESS, LOAD_CONTRACTS_FAILURE]
    }
};

export function getContract(id) {
    let authToken = localStorage.getItem("PasetoToken")
    return {
	endpoint: `/api/Contract/${id}`,	
	method: "GET",
	apiType:'Rest', 
	authToken: authToken,
	contract: {},
	types: [GET_CONTRACT_REQUEST, GET_CONTRACT_SUCCESS, GET_CONTRACT_FAILURE] 
    };
}

export function updateContract(contract) {
    let authToken = localStorage.getItem("PasetoToken")
    return {
	endpoint: `/api/contract/${contract.id}`,
	data: contract,
	authToken: authToken,
	method: "PUT",
	apiType: 'Rest',
	authenticated: true,
	updateSuccess: false,
	types: [UPDATE_CONTRACT_REQUEST, UPDATE_CONTRACT_SUCCESS, UPDATE_CONTRACT_FAILURE]
    };
}

export function addContract(contract) {
    let authToken = localStorage.getItem("PasetoToken")
    return {
	endpoint: `/api/contract/${contract.id}`,
	data: contract,
	type: 'API',
	authToken: authToken,
	method: "POST",
	apiType: 'Rest',
	authenticated: true,
	addSuccess: false,
	types: [ADD_CONTRACT_REQUEST, ADD_CONTRACT_SUCCESS, ADD_CONTRACT_FAILURE]
	
    };
}
export function newContract() {
    return {
	type: NEW_CONTRACT_REQUEST
    };
}
export function deleteContract(id) {
    let authToken = localStorage.getItem("PasetoToken")
    return {
	endpoint: `api/contract/${id}`,
	method: "DELETE",
	authToken: authToken,
	apiType: 'Rest',
	authenticated: true,
	types: [DELETE_CONTRACT_REQUEST, DELETE_CONTRACT_SUCCESS, DELETE_CONTRACT_FAILURE]
    }
}    
