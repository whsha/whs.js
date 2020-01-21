/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { useObserver } from "mobx-react-lite";
import useDeviceTheme from "./useDeviceTheme";
import usePreferences from "./usePreferences";

/** A hook to get the theme to use */
export default function useTheme() {
    const preferences = usePreferences();
    const deviceTheme = useDeviceTheme();

    return useObserver(() => ({
        computed: preferences.theme.matchSystemTheme && deviceTheme !== undefined ? deviceTheme : preferences.theme.theme,
        device: deviceTheme,
        user: preferences.theme.theme,
    }));
}