import { createAction } from "typesafe-actions";
import { ISchoolDay } from "../../types/SchoolDay";

export const SetSchoolDay = createAction("SetSchoolDay", resolve => {
    return (schoolDay: Partial<ISchoolDay>) => resolve(schoolDay);
});