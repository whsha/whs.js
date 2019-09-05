/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { observable } from "mobx";
import { persist } from "mobx-persist";
import { IAdvisory } from "../util/advisory";
import { IDR, IElective, IMajor } from "../util/class/storage";

export default class ClassesStore {
    @persist("object") @observable
    public advisory: IAdvisory = { room: 0, teacher: "" };

    public updateAdvisory(part: Partial<IAdvisory>) {
        this.advisory = {... this.advisory, ... part};
    }

    @persist("object") @observable
    public majors: IMajor[] = [];
    @persist("object") @observable
    public electives: IElective[] = [];
    @persist("object") @observable
    public DRs: IDR[] = [];

    // TODO: public updateClasses(classes: StorageClass[]) {
    //     this.classes = classes;
    // }

// TODO: Make this after classes get configured and stored
//     @computed
//     public displayClasses() {
//         // tslint:disable: object-literal-sort-keys
//         let output: {[K in keyof typeof SchoolDay]: DisplayClass[]} = {
//             One: [],
//             Two: [],
//             Three: [],
//             Four: [],
//             Five: [],
//             Six: [],
//             Seven: []
//         };
//         // tslint:enable: object-literal-sort-keys

//         for (let block of Object.keys(SchoolDay)) {
//             console.log(getBlockColorsForDay(block as keyof typeof SchoolDay));
//         }

//         for (let singleClass of this.classes) {
//             // singleClass.
//         }

//         return output;
//     }
}