/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";
import { headerStyles } from "../../layout/default";

/** The props for a multiline header */
interface IMultilineHeaderProps {
    /** The header title */
    title: string;
    /** The header subtitle */
    subtitle: string;
    /** The header click callback */
    onClick?(event: GestureResponderEvent): void;
}

/** A header title with multiple lines. A Title and a subtitle */
function MultilineHeaderTitle({ title, subtitle, onClick }: IMultilineHeaderProps) {
    return (
        <TouchableOpacity onPress={onClick}>
            <Text style={headerStyles.headerTitle}>{title}</Text>
            <Text style={headerStyles.headerSubtitle}>{subtitle}</Text>
        </TouchableOpacity>
    );
}

export default memo(MultilineHeaderTitle);