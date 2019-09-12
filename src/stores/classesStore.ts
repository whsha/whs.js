/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { observable, toJS } from "mobx";
import { persist } from "mobx-persist";
import { IAdvisory } from "../util/class/advisory";
import { IDR, IMajor, IMinor } from "../util/class/storage";

export default class ClassesStore {
    @persist("object") @observable
    public advisory: IAdvisory = { room: "", teacher: "" };

    @persist("map") @observable
    public majors: Map<string, IMajor> = observable.map();
    @persist("map") @observable
    public minors: Map<string, IMinor> = observable.map();
    @persist("map") @observable
    public DRs: Map<string, IDR> = observable.map();

    public hydrateFrom(linkedstore: ClassesStore) {
        // Clone store as to not link to it
        let store = toJS(linkedstore, { exportMapsAsObjects: false, recurseEverything: true });

        this.majors = store.majors;
        this.minors = store.minors;
        this.DRs = store.DRs;
        this.advisory = store.advisory;
    }

    public clear() {
        this.advisory = { room: "", teacher: "" };
        this.majors = observable.map();
        this.minors = observable.map();
        this.DRs = observable.map();
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