export const ADD_HISTORY_STEP = "ADD_HISTORY_STEP";
export const UPDATE_LAST_HISTORY_STEP = "REPLACE_LAST_HISTORY_STEP";
export const REMOVE_LAST_HISTORY_STEP = "REMOVE_LAST_HISTORY_STEP";
export const INIT_HISTORY_STEPS = "INIT_HISTORY_STEPS";
export const REMOVE_LAST_HISTORY_STEPS = "REMOVE_LAST_HISTORY_STEPS";

export const addHistoryStep = step => ({
    type: ADD_HISTORY_STEP,
    step
});

export const updateLastHistoryStep = step => ({
    type: UPDATE_LAST_HISTORY_STEP,
    step
});

export const initHistorySteps = historySteps => ({
    type: INIT_HISTORY_STEPS,
    historySteps
});

export const removeLastHistorySteps = index => ({
    type: REMOVE_LAST_HISTORY_STEPS,
    index
});

export const removeLastHistoryStep = () => ({
    type: REMOVE_LAST_HISTORY_STEP
});