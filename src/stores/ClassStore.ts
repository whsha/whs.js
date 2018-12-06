/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import { observable } from "mobx";
import { persist } from "mobx-persist";

export default class ClassStore {
    @persist @observable
    public classes = [];
}