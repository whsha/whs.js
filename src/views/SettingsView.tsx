/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SafeAreaView from "react-native-safe-area-view";
import { settingsViewStyles } from "../themes/light";
import ClassesConfigureView from "./settings/ClassesConfigureView";
import MainView from "./settings/MainSettingsView";

const Stack = createStackNavigator();

export default function SettingsView() {
    return (
        // <SafeAreaView style={settingsViewStyles.container}>
            <Stack.Navigator>
                <Stack.Screen name="AllSettings" component={MainView} options={{ title: "Settings" }} />
                <Stack.Screen name="ClassesSettings" component={ClassesConfigureView} options={{ title: "Classes Settings" }} />
            </Stack.Navigator>
            // {/* <Switch>
            //     <Route path="/settings/classes" component={ClassesConfigureView}/>
            //     <Route path="/settings" component={MainView}/>
            // </Switch> */}
        // </SafeAreaView>
    );
}