import { action, observable } from "mobx";
import { IAdvisory, IClassBlock, LunchBlock } from "./types/Block";
import { defaultSchoolDay, ISchoolDay } from "./types/SchoolDay";
import { loadAdvisory, loadClasses, saveAdvisory, saveClasses } from "./util/BlocksUtil";
import { fetchSchoolDay } from "./util/CalendarUtil";

export class AppState {
    @observable
    /** The current school day */
    public schoolDay: ISchoolDay = defaultSchoolDay;

    @observable
    /** The users classes */
    public classes: IClassBlock[] = [];

    @observable
    /** The users advisory */
    public advisory: IAdvisory = {
        name: "Advisory",
        room: "",
        teacher: ""
    };

    @observable
    /** The users advisory */
    public lunches: LunchBlock[] = [0, 0, 0, 0, 0, 0, 0];

    @action.bound
    /** Edit the given class */
    public async editClass(index: number, newClass: IClassBlock) {
        // Create a copy of the array
        let classes = this.classes.slice();
        // Edit the element
        classes[index] = newClass;
        // Update classes
        this.classes = classes;
        await saveClasses(this.classes);
    }

    @action.bound
    /** Add a class */
    public async addClass(newClass: IClassBlock) {
        let index = this.classes.push(newClass);
        await saveClasses(this.classes);
        return index;
    }

    @action.bound
    /** Remove a class */
    public async removeClass(index: number) {
        // Create a copy of the array
        let classes = this.classes.slice();
        // Delete the class
        classes.splice(index, 1);
        // Update classes
        this.classes = classes;
        await saveClasses(this.classes);
    }

    @action.bound
    /** Clear the classes */
    public async clearClasses() {
        // Clear classes
        this.classes = [];
        await saveClasses(this.classes);
    }

    @action.bound
    /** Edit the users advisory */
    public async editAdvisory(advisory: IAdvisory) {
        this.advisory = advisory;
        await saveAdvisory(this.advisory);
    }

    @action.bound
    /** Edit the users advisory */
    public async editLunches(lunches: LunchBlock[]) {
        this.lunches = lunches;
        await saveAdvisory(this.advisory);
    }

    @action.bound
    /** Update the current school day */
    public async updateSchoolDay() {
        let day = await fetchSchoolDay();
        this.schoolDay = day;
    }

    constructor() {
        loadClasses().then((classes) => this.classes = classes || []);
        loadAdvisory().then((advisory) => this.advisory = advisory || this.advisory);
    }
}

export const Store = new AppState();