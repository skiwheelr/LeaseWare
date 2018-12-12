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
    DELETE_CONTRACT_CONFIRM_REQUEST,
    DELETE_CONTRACT_CONFIRM_SUCCESS,
    DELETE_CONTRACT_CONFIRM_FAILURE,
    NEW_CONTRACT_REQUEST
} from "../constants/actions";

//contract actions

export function loadContracts(filters) {

    return {
        endpoint: "/odata/Contracts",
	contracts: [],
	success: false,
	response: null,
        apiType: 'OData',
        filters: filters,	
        types: [LOAD_CONTRACTS_REQUEST, LOAD_CONTRACTS_SUCCESS, LOAD_CONTRACTS_FAILURE]
    }
};
export function getContract(id) {
    return {
	endpoint: `/api/Contract/${id}`,	
	method: 'GET',
	entityName: 'Contract',
	apiType:'Rest',
	contract: {},
	types: [GET_CONTRACT_REQUEST, GET_CONTRACT_SUCCESS, GET_CONTRACT_FAILURE] 
    };
}

export function updateContract(contract) {
    return {
	endpoint: `/api/contract/${contract.id}`,
	data: contract,
	method: 'PUT',
	entityName: 'Contract',
	apiType: 'Rest',
	authenticated: true,
	updateSuccess: false,
	types: [UPDATE_CONTRACT_REQUEST, UPDATE_CONTRACT_SUCCESS, UPDATE_CONTRACT_FAILURE]
    };
}

export function addContract(contract) {
    return {
	endpoint: `/api/contract/${contract.id}`,
	data: contract,
	type: 'API',
	method: "POST",
	apiType: 'Rest',
	entityName: 'Contract',
	authenticated: true,
	addSuccess: false,
	types: [ADD_CONTRACT_REQUEST, ADD_CONTRACT_SUCCESS, ADD_CONTRACT_FAILURE]
	
    };
}
export function newContract() {
    return {
	entityName: 'Contract',
	type: NEW_CONTRACT_REQUEST
    };
}
export function deleteContract(id) {
    return {
	endpoint: `api/contract/${id}`,
	method: "DELETE",
	entityName: 'Contract',
	apiType: 'Rest',
	authenticated: true,
	types: [DELETE_CONTRACT_REQUEST, DELETE_CONTRACT_SUCCESS, DELETE_CONTRACT_FAILURE]
    }
}
export function deleteContractConfirm(id) {
    return {
	endpoint: `api/contract/${id}`,
	method: "DELETE",
	apiType: 'Local',
	entityName: 'Contract',
	openDeleteDialog: true,
	workingId: id,
	type: DELETE_CONTRACT_CONFIRM_REQUEST,
	types: [DELETE_CONTRACT_CONFIRM_REQUEST, DELETE_CONTRACT_CONFIRM_SUCCESS, DELETE_CONTRACT_CONFIRM_FAILURE]
    }
}




