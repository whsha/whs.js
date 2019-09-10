/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { Platform, Text, View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { tabBarIconNotSelectedColor, tabBarIconSelectedColor, tabBarStyle } from "../../themes/light";

export default function TabBarIcon(icon: string, text: string) {
    return ({ match }: {
        match: {} | null;
    }) => (
        <View>
            <IonIcon
                name={`${Platform.OS === "ios" ? "ios" : "md"}-${icon}`}
                // tslint:disable-next-line:no-magic-numbers
                size={22}
                style={tabBarStyle.icon}
                color={match !== null ? tabBarIconSelectedColor : tabBarIconNotSelectedColor}
            />
            <Text style={[tabBarStyle.text, match !== null ? tabBarStyle.textMatch : undefined ]}>{text}</Text>
        </View>
    );
}
