import { combineReducers } from 'redux';
import historySteps from './historySteps';
import step from "./step";

export default combineReducers({
    historySteps,
    step
});