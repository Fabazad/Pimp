import stepService from "services/step.service"

export const FETCH_STEP_REQUEST = "FETCH_STEP_REQUEST";
export const FETCH_STEP_FAILURE = "FETCH_STEP_FAILURE";
export const FETCH_STEP_SUCCESS = "FETCH_STEP_SUCCESS";

export const fetchStep = _id => {
    const request = () => ({
        type: FETCH_STEP_REQUEST
    });
    
    const failure = error => ({
        type: FETCH_STEP_FAILURE,
        error
    });
    
    const success = step => ({
        type: FETCH_STEP_SUCCESS,
        step
    });

    return dispatch => {
        dispatch(request());
        stepService.getOne(_id).then(
            step => dispatch(success(step)),
            error => dispatch(failure(error))
        )

    }
}
