/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { DefaultTheme } from "styled-components";

/** The light theme defaults */
export const lightTheme: DefaultTheme = {
    colors: {
        background: "#efeff4",
        border: "#A0A0A0",
        button: "#1f85cc", // "#2f95dc",
        classBackground: "#ffffff",
        dimText: "#808080",
        disabled: "#dadada",
        error: "#ff5050",
        foreground: "#ffffff",
        input: "#555555",
        text: "#000000",
        title: "#444444",
        warning: "#ffecb3"
    },
};

/** The dark theme defaults */
export const darkTheme: DefaultTheme = {
    colors: {
        background: "#000000",
        border: "#3d3d41", // 48484a
        button: "#1f85cc",
        classBackground: "#000000",
        dimText: "#98989e",
        disabled: "#7a7a7a",
        error: "#ff5050",
        foreground: "#1c1c1e",
        input: "#eeeeee",
        text: "#eeeeee",
        title: "#444444",
        warning: "#664d00"
    },
};