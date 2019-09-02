/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { observable } from "mobx";
import { persist } from "mobx-persist";
import { IAdvisory } from "../components/blocks/AdvisoryComponent";
import { StorageClass } from "../util/class";

export default class ClassesStore {
    @persist("object") @observable
    public advisory: IAdvisory = { room: 0, teacher: "" };

    public updateAdvisory(part: Partial<IAdvisory>) {
        this.advisory = {... this.advisory, ... part};
    }

    @persist("object") @observable
    public classes: StorageClass[] = [];

    public updateClasses(classes: StorageClass[]) {
        this.classes = classes;
    }

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