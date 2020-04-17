/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { Cell, CellProps } from "react-native-tableview-simple";

/** Interface for style prop on component */
interface IStyled<T> {
    /** The style to apply */
    style?: StyleProp<T>;
}

/** A tableview cell with the style mapped to the title style for use with styled components */
export function CellWithStyleMappedToTitleStyle({ style, ...rest }: CellProps & IStyled<TextStyle>) {
    return (
        <Cell titleTextStyle={style} {...rest} />
    );
}