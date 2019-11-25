/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { action, observable, toJS } from "mobx";
import { persist } from "mobx-persist";
import { IAdvisory, IDR, IMajor, IMinor } from "../util/class/classes";

/** Store containig the users classes */
export default class ClassesStore {
    /** The users advisory */
    @persist("object") @observable
    public advisory: IAdvisory = { room: "", teacher: "" };

    /** A map of the users Majors by their uuid */
    @persist("map") @observable
    public majors: Map<string, IMajor> = observable.map();
    /** A map of the users Minors by their uuid */
    @persist("map") @observable
    public minors: Map<string, IMinor> = observable.map();
    /** A map of the users DRs by their uuid */
    @persist("map") @observable
    public DRs: Map<string, IDR> = observable.map();

    /** Load the data from another classes store into this classes store without linking the two */
    // tslint:disable-next-line: no-unbound-method
    @action.bound
    public hydrateFrom(linkedstore: ClassesStore) {
        // Clone store as to not link to it
        const store = toJS(linkedstore, { exportMapsAsObjects: false, recurseEverything: true });

        this.majors = store.majors;
        this.minors = store.minors;
        this.DRs = store.DRs;
        this.advisory = store.advisory;
    }

    /** Clear the classes store */
    // tslint:disable-next-line: no-unbound-method
    @action.bound
    public clear() {
        this.advisory = { room: "", teacher: "" };
        this.majors = observable.map();
        this.minors = observable.map();
        this.DRs = observable.map();
    }

}