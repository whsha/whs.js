/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import { headerStyles } from "../../themes/light";

interface IMultilineHeaderProps {
    title: string;
    subtitle: string;
    leftButton?: JSX.Element;
    rightButton?: JSX.Element;
    onClick?(event: GestureResponderEvent): void;
}

/** A header with multiple lines. A Title and a subtitle */
export function MultilineHeader({ title, subtitle, leftButton, rightButton, onClick }: IMultilineHeaderProps) {
    return (
        <View style={headerStyles.header}>
            <View style={headerStyles.leftButton}>
                {leftButton}
            </View>
            <TouchableOpacity onPress={onClick}>
                <Text style={headerStyles.headerTitle}>{title}</Text>
                <Text style={headerStyles.headerSubtitle}>{subtitle}</Text>
            </TouchableOpacity>
            <View style={headerStyles.rightButton}>
                {rightButton}
            </View>
        </View>
    );
}