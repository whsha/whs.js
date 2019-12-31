/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { useContext } from "react";
import { PreferencesStoreContext } from "../../contexts";

/** A helper hook to hook into the user's preferences */
export default function usePreferences() {
    return useContext(PreferencesStoreContext);
}