import {
    LOAD_BOOKINGS_REQUEST,
    LOAD_BOOKINGS_SUCCESS,
    LOAD_BOOKINGS_FAILURE
} from "../constants/actions";
//contract actions
export function loadBookings(filters) {
    let token = localStorage.getItem("PasetoToken")
    return {
        endpoint: "/odata/Bookings",
	contracts: [],
	authToken: token,
	success: false,
	response: null,
        apiType: 'OData',
        filters: filters,	
        types: [LOAD_BOOKINGS_REQUEST, LOAD_BOOKINGS_SUCCESS, LOAD_BOOKINGS_FAILURE]
    }
};
