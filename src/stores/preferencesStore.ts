/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { observable } from "mobx";
import { persist } from "mobx-persist";

/** A store for the preferenses pertaining to accessibility */
class AccessibilityPreferences {
    /** Weather or not the names of the class colors should be displayed */
    @observable @persist
    public labelColors = false;
    /** Weather or not the names of the class colors should be colored */
    @observable @persist
    public matchLabelColors = false;
}

/** A store of all of the user's preferenses */
export default class PreferencesStore {
    /** The preferenses pertaining to the user's accessibility */
    @persist("object", AccessibilityPreferences) @observable
    public accessibility: AccessibilityPreferences = new AccessibilityPreferences();
}