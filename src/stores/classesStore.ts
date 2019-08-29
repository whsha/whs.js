/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { observable, computed } from "mobx";
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

    @computed
    public displayClasses() {
        
    }
}