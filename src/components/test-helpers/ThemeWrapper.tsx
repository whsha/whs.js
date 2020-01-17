/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { ThemeProvider } from "styled-components/native";
import { lightTheme } from "../../styles/theme";

/** The wrapper around a tested component to provide it with a theme */
const ThemeWrapper: React.FC = ({ children }) => (
    <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
);

export default ThemeWrapper;