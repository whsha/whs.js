/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import styled from "styled-components/native";

/** A scrollview wtih styles */
export const SettingsScrollView = styled.ScrollView(props => ({
    backgroundColor: props.theme.colors.background,
    flex: 1
}));

/** A text input with styles */
export const SettingsTextInput = styled.TextInput(props => ({
    color: props.theme.colors.input,
    flex: 1,
    fontSize: 15,
    height: 40,
    textAlign: "left",
}));