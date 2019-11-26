/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { observable } from "mobx";
import { persist } from "mobx-persist";

/** An enum of the different label positions of the accessability class color labels */
export enum LabelPosition {
    Center,
    Left,
    Right
}

/** A store for the preferenses pertaining to accessibility */
class AccessibilityPreferences {
    /** Weather or not the names of the class colors should be displayed */
    @observable @persist
    public labelColors = false;
    /** Weather or not the names of the class colors should be colored */
    @observable @persist
    public matchLabelColors = false;
    /** The position of where the class label should be */
    @observable @persist
    public labelPosition: LabelPosition = LabelPosition.Center;
}

/** A store of all of the user's preferenses */
export default class PreferencesStore {
    /** The preferenses pertaining to the user's accessibility */
    @persist("object", AccessibilityPreferences) @observable
    public accessibility: AccessibilityPreferences = new AccessibilityPreferences();
}