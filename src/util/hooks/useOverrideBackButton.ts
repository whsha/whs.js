/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { useFocusEffect } from "@react-navigation/core";
import { BackHandler } from "react-native";

/** A hook to override the hardware back button for the whole view (android only) */
export default function useOverrideBackButton(callback: () => void) {
    useFocusEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", callback);

        return () => BackHandler.removeEventListener("hardwareBackPress", callback);
    });
}