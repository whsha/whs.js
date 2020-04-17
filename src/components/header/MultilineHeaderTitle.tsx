/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { HeaderSubtitleText, HeaderTitleText } from "../../styles/components/header";

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
            <HeaderTitleText>{title}</HeaderTitleText>
            <HeaderSubtitleText>{subtitle}</HeaderSubtitleText>
        </TouchableOpacity>
    );
}

export default memo(MultilineHeaderTitle);