import { ActionType } from "typesafe-actions";
import * as SchoolDayActions from "./actions/SchoolDay";

export type SchoolDayAction = ActionType<typeof SchoolDayActions>;