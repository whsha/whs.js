/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ClassesConfigureView from "./settings/ClassesConfigureView";
import MainView from "./settings/MainSettingsView";

const Stack = createStackNavigator();

export default function SettingsView() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AllSettings" component={MainView} options={{ title: "Settings" }} />
            <Stack.Screen name="ClassesSettings" component={ClassesConfigureView} options={{ title: "Classes Settings" }} />
        </Stack.Navigator>
    );
}