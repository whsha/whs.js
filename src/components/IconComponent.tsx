/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { Platform, StyleProp, TextStyle, View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

function IconComponent({ name, size = 22, color = "#2f95dc", style, onPress }: { name: string; size?: number; color?: string; style?: StyleProp<TextStyle>; onPress?(): void }) {
    return (
        <View style={{marginBottom: -2}}>
            <IonIcon
                name={`${Platform.OS === "ios" ? "ios" : "md"}-${name}`}
                size={size}
                color={color}
                style={style}
                onPress={onPress}
            />
        </View>
    );
}

export default memo(IconComponent);