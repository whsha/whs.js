/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { useFocusEffect } from "@react-navigation/core";
import { BackHandler } from "react-native";

export default function useNoHardwareBack() {
    useFocusEffect(() => {
        const backIgnore = () => true;
        BackHandler.addEventListener("hardwareBackPress", backIgnore);

        return () => BackHandler.removeEventListener("hardwareBackPress", backIgnore);
    });
}