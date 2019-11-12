/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";
import { headerStyles } from "../../layout/default";

interface IMultilineHeaderProps {
    title: string;
    subtitle: string;
    onClick?(event: GestureResponderEvent): void;
}

/** A header title with multiple lines. A Title and a subtitle */
export default function MultilineHeaderTitle({ title, subtitle, onClick }: IMultilineHeaderProps) {
    return (
        <TouchableOpacity onPress={onClick}>
            <Text style={headerStyles.headerTitle}>{title}</Text>
            <Text style={headerStyles.headerSubtitle}>{subtitle}</Text>
        </TouchableOpacity>
    );
}