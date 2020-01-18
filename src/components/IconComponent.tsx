/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { Platform, StyleProp, TextStyle, View } from "react-native";
import { IonIconButton } from "../styles/components/ionicons";

/** The props for an IconComponent */
interface IIconComponentProps {
    /** The name of the icon */
    name: string;
    /** The size of the icon */
    size?: number;
    /** The color of the icon */
    color?: string;
    /** The extra styles on the icon */
    style?: StyleProp<TextStyle>;
    /** The callback when pressed */
    onPress?(): void;
}

/** A memoized component wrapper for IonIcons */
function IconComponent({ name, size = 22, color, style, onPress }: IIconComponentProps) {
    return (
        <View style={{ marginBottom: -3 }}>
            <IonIconButton
                name={`${Platform.OS === "ios" ? "ios" : "md"}-${name}`}
                size={size}
                color={color}
                style={[style, { color }]}
                onPress={onPress}
            />
        </View>
    );
}

export default memo(IconComponent);