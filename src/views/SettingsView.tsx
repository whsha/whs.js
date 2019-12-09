/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { navigationHeaderPaddingStyle } from "../styles/layout/default";
import AccessibilitySettingsView from "./settings/AccessibilitySettingsView";
import AdvisoryConfigureView from "./settings/class/AdvisoryEditView";
import ClassesListView from "./settings/class/ClassesListView";
import DREditView from "./settings/class/DREditView";
import MajorEditView from "./settings/class/MajorEditView";
import MinorEditView from "./settings/class/MinorEditView";
import MainView from "./settings/MainSettingsView";

/** The settings view stack navigator */
const Stack = createStackNavigator<SettingsParams>();

/** The settings parameters */
export type SettingsParams = Pick<ISettingsParams, keyof ISettingsParams>;

/** The settings parameters as an interface */
interface ISettingsParams {
    /** The accessibility settings view */
    Accessibility: undefined;
    /** The main settings view */
    AllSettings: undefined;
    /** The classes list view */
    ClassesList: undefined;
    /** The advisory configure view */
    ConfigureAdvisory: undefined;
    /** The major configure view */
    ConfigureMajor: {
        /** The id of the major to configure */
        majorId: string;
    };
    /** The minor configure view */
    ConfigureMinor: {
        /** The id of the minor to configure */
        minorId: string;
    };
    /** The dr configure view */
    ConfigureDR: {
        /** The id of the dr to configure */
        drId: string;
    };
}

/** The view for the settings tab */
export default function SettingsView() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AllSettings" component={MainView} options={{ title: "Settings" }} />
            <Stack.Screen name="Accessibility" component={AccessibilitySettingsView} options={{ title: "Accessibility Options" }} />
            <Stack.Screen name="ClassesList" component={ClassesListView} options={{ title: "Class Settings", gestureEnabled: false, ...navigationHeaderPaddingStyle }} />
            <Stack.Screen name="ConfigureAdvisory" component={AdvisoryConfigureView} options={{ title: "Advisory Settings", gestureEnabled: false, ...navigationHeaderPaddingStyle }} />
            <Stack.Screen name="ConfigureMajor" component={MajorEditView} options={{ title: "Edit Major", gestureEnabled: false, ...navigationHeaderPaddingStyle }} />
            <Stack.Screen name="ConfigureMinor" component={MinorEditView} options={{ title: "Edit Minor", gestureEnabled: false, ...navigationHeaderPaddingStyle }} />
            <Stack.Screen name="ConfigureDR" component={DREditView} options={{ title: "Edit DR", gestureEnabled: false, ...navigationHeaderPaddingStyle }} />
        </Stack.Navigator>
    );
}
