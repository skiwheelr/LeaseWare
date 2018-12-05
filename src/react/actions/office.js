import {
    LOAD_OFFICES_REQUEST,
    LOAD_OFFICES_SUCCESS,
    LOAD_OFFICES_FAILURE
} from "../constants/actions";
//contract actions
export function loadOffices(filters) {
    let token = localStorage.getItem("PasetoToken")
    return {
        endpoint: "/odata/Offices",
	contracts: [],
	authToken: token,
	success: false,
	response: null,
        apiType: 'OData',
        filters: filters,	
        types: [LOAD_OFFICES_REQUEST, LOAD_OFFICES_SUCCESS, LOAD_OFFICES_FAILURE]
    }
};
