/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { navigationHeaderPaddingStyle } from "../layout/default";
import AdvisoryConfigureView from "./settings/class/AdvisoryEditView";
import ClassesListView from "./settings/class/ClassesListView";
import MajorEditView from "./settings/class/MajorEditView";
import MainView from "./settings/MainSettingsView";

const Stack = createStackNavigator<SettingsParams>();

export type SettingsParams = Pick<ISettingsParams, keyof ISettingsParams>;

interface ISettingsParams {
    AllSettings: undefined;
    ClassesList: undefined;
    ConfigureAdvisory: undefined;
    ConfigureMajor: { majorId: string };
}

export default function SettingsView() {
    return (
        <Stack.Navigator screenOptions={navigationHeaderPaddingStyle}>
            <Stack.Screen name="AllSettings" component={MainView} options={{ title: "Settings" }} />
            <Stack.Screen name="ClassesList" component={ClassesListView} options={{ title: "Class Settings" }} />
            <Stack.Screen name="ConfigureAdvisory" component={AdvisoryConfigureView} options={{ title: "Advisory Settings" }} />
            <Stack.Screen name="ConfigureMajor" component={MajorEditView} options={{ title: "Edit Major" }} />
            {/* <Stack.Screen name="ConfigureMinor" component={MinorEditView}/> */}
            {/* <Stack.Screen name="ConfigureDR" component={DREditView}/> */}
        </Stack.Navigator>
    );
}
