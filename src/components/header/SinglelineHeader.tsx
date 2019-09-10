/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { Text, View } from "react-native";
import { headerStyles } from "../../themes/light";

interface ISinglelineHeader {
    title: string;
    leftButton?: JSX.Element;
    rightButton?: JSX.Element;
}

/** A header with a single line: a Title */
export function SinglelineHeader({ title, leftButton, rightButton }: ISinglelineHeader) {
    return (
        <View style={headerStyles.header}>
            <View style={headerStyles.leftButton}>
                {leftButton}
            </View>
            <Text style={headerStyles.singleHeaderTitle}>{title}</Text>
            <View style={headerStyles.rightButton}>
                {rightButton}
            </View>
        </View>
    );
}
