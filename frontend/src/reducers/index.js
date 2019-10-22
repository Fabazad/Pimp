import { combineReducers } from 'redux';
import historySteps from './historySteps';
import step from "./step";
import steps from "./steps";

export default combineReducers({
    historySteps,
    step,
    steps
});