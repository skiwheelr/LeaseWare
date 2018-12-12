import {
    CANCEL_ACTION_REQUEST,
    CANCEL_ACTION_SUCCESS,
    CANCEL_ACTION_FAILURE
} from "../constants/actions";

export function cancelAction()
{
 
    return {
        apiType: 'Local',
	openDeleteDialog: false,
        types: [CANCEL_ACTION_REQUEST, CANCEL_ACTION_SUCCESS, CANCEL_ACTION_FAILURE]
    }
};
