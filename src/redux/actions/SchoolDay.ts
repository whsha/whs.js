import { createAction } from "typesafe-actions";
import { SchoolDay } from "../../types/SchoolDay";

export const SetSchoolDay = createAction("SetSchoolDay", resolve => {
    return (schoolDay: Partial<SchoolDay>) => resolve(schoolDay);
});