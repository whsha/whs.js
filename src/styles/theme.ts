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
        dimText: "#808080",
        disabled: "#dadada",
        error: "#ff5050",
        input: "#555555",
        main: "#ffffff",
        text: "#000000",
        title: "#444444",
        white: "#ffffff",
    },
};

/** The dark theme defaults */
export const darkTheme: DefaultTheme = {
    colors: {
        background: "#000000",
        border: "#A0A0A0",
        button: "#1f85cc",
        dimText: "#808080",
        disabled: "#7a7a7a",
        error: "#ff5050",
        input: "#555555",
        main: "#000000",
        text: "#ffffff",
        title: "#444444",
        white: "#ffffff",
    },
};