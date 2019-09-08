/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { Platform, View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

export default function IconComponent({ name, size = 22 }: { name: string; size?: number }) {
    return (
        <View style={{marginBottom: -4}}>
            <IonIcon
                name={`${Platform.OS === "ios" ? "ios" : "md"}-${name}`}
                size={size}
                color={"#2f95dc"}
            />
        </View>
    );
}