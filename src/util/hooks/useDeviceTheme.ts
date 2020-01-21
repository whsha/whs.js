/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { useColorScheme } from "react-native-appearance";
import { Theme } from "../../stores/preferencesStore";

/** A hook to get the device's theme */
export default function useDeviceTheme() {
    const scheme = useColorScheme();

    if (scheme === "dark") {
        return Theme.Dark;
    } else if (scheme === "light") {
        return Theme.Light;
    } else {
        return undefined;
    }
}