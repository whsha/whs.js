import { action, observable } from "mobx";
import { defaultSchoolDay, ISchoolDay } from "./types/SchoolDay";
import { fetchSchoolDay } from "./util/CalendarUtil";

export class AppState {
    @observable
    public schoolDay: ISchoolDay = defaultSchoolDay;

    @action.bound
    public async updateSchoolDay() {
        let day = await fetchSchoolDay();
        this.schoolDay = day;
    }
}

export const Store = new AppState();