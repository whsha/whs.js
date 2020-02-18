/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { IAdvisory, IClass } from "@whsha/classes/v2/class";
import { action, observable, toJS } from "mobx";
import { persist } from "mobx-persist";

/** Store containig the users classes */
export default class ClassesStore {
    /** The users advisory */
    @persist("object") @observable
    public advisory: IAdvisory = { room: "", advisor: "" };

    /** A map of the users Classes by their uuid */
    @persist("map") @observable
    public classes = new Map<string, IClass>();

    /** Load the data from another classes store into this classes store without linking the two */
    // tslint:disable-next-line: no-unbound-method
    @action.bound
    public hydrateFrom(linkedstore: ClassesStore) {
        // Clone store as to not link to it
        const store = toJS(linkedstore, { exportMapsAsObjects: false, recurseEverything: true });

        this.classes = store.classes;
        this.advisory = store.advisory;
    }

    /** Clear the classes store */
    // tslint:disable-next-line: no-unbound-method
    @action.bound
    public clear() {
        this.advisory = { room: "", advisor: "" };
        this.classes = new Map();
    }
}