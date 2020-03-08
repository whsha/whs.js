/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { useFocusEffect } from "@react-navigation/core";
import { BackHandler } from "react-native";

/** A hook to override the hardware back button for the whole view (android only) */
export default function useOverrideBackButton(callback: () => boolean | null | undefined | void) {
    useFocusEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", callback as () => boolean | null | undefined);

        return () => BackHandler.removeEventListener("hardwareBackPress", callback as () => boolean | null | undefined);
    });
}