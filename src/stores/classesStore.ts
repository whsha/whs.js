/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { observable, toJS } from "mobx";
import { persist } from "mobx-persist";
import { IAdvisory } from "../util/class/advisory";
import { IDR, IMajor, IMinor } from "../util/class/full";

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
        const store = toJS(linkedstore, { exportMapsAsObjects: false, recurseEverything: true });

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
}