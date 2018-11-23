import { combineReducers } from "redux";
import { getType } from "typesafe-actions";
import { ISchoolDay } from "../types/SchoolDay";
import { SchoolDayAction } from "./Actions";
import * as SchoolActions from "./actions/SchoolDay";

const defaultState: ISchoolDay = {
    dayNumber: 0,
    isHalf: false,
    date: new Date()
};

function SchoolDayReducer(state: ISchoolDay = defaultState, action: SchoolDayAction): ISchoolDay {
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