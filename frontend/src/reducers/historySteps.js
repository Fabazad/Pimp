import { 
    ADD_HISTORY_STEP, 
    UPDATE_LAST_HISTORY_STEP, 
    INIT_HISTORY_STEPS, 
    REMOVE_LAST_HISTORY_STEPS, 
    REMOVE_LAST_HISTORY_STEP
} from "../actions/historySteps";

const todos = (state = [], action) => {
    switch (action.type) {
        case ADD_HISTORY_STEP:
            console.log(state);
            return [
                ...state,
                action.step
            ]
        case UPDATE_LAST_HISTORY_STEP:
            return [
                ...state.slice(0, state.length - 1),
                action.step
            ]
        case INIT_HISTORY_STEPS:
            return action.historySteps
        case REMOVE_LAST_HISTORY_STEPS:
            return [...state.slice(0, action.index)]
        case REMOVE_LAST_HISTORY_STEP:
            return[...state.slice(0, state.length - 1)]
        default:
            return state
    }
}
  
export default todos