/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { useFocusEffect } from "@react-navigation/core";
import { BackHandler } from "react-native";

/** A hook to disable the hardware back button for the whole view (android only) */
export default function useNoHardwareBack() {
    useFocusEffect(() => {
        const backIgnore = () => true;
        BackHandler.addEventListener("hardwareBackPress", backIgnore);

        return () => BackHandler.removeEventListener("hardwareBackPress", backIgnore);
    });
}