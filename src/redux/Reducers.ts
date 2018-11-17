import { combineReducers } from "redux";
import { getType } from "typesafe-actions";
import { SchoolDay } from "../types/SchoolDay";
import { SchoolDayAction } from "./Actions";
import * as SchoolActions from "./actions/SchoolDay";

const defaultState = {
    dayNumber: 0,
    isHalf: false
} as SchoolDay;

function SchoolDayReducer(state: SchoolDay = defaultState, action: SchoolDayAction): SchoolDay {
    switch (action.type) {
        case getType(SchoolActions.SetSchoolDay):
            return {...state, ...action.payload};
        default:
            return {...state};
    }
}

export default combineReducers({
    schoolDay: SchoolDayReducer
});