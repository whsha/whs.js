/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/core";
import { createStackNavigator } from "@react-navigation/stack";
import * as Haptics from "expo-haptics";
import React from "react";
import { navigationHeaderPaddingStyle } from "../styles/navigation";
import AccessibilitySettingsView from "../views/settings/AccessibilitySettingsView";
import AdvisoryConfigureView from "../views/settings/class/AdvisoryConfigureView";
import ClassConfigureView from "../views/settings/class/ClassConfigureView";
import ClassesListView from "../views/settings/class/ClassesListView";
import CreditsView from "../views/settings/CreditsView";
import LinksView from "../views/settings/LinksView";
import MainSettingsView from "../views/settings/MainSettingsView";
import { MainTabParams } from "./MainNavigator";

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
    /** The credits view */
    Credits: undefined;
    /** The links page */
    Links: undefined;

    /** The classes list view */
    ClassesList: undefined;
    /** The advisory edit view */
    ConfigureAdvisory: undefined;
    /** The class edit view */
    ConfigureClass: {
        /** The id of the class to configure */
        uuid: string;
    };
}

/** The view for the settings tab */
export default function SettingsNavigator() {
    const navigation = useNavigation<BottomTabNavigationProp<MainTabParams, "Settings">>();

    navigation.addListener("tabPress", () => {
        Haptics.impactAsync().catch(() => console.warn("Haptics failed to fire"));
    });

    return (
        <Stack.Navigator>
            <Stack.Screen name="AllSettings" component={MainSettingsView} options={{ title: "Settings" }} />
            <Stack.Screen name="Accessibility" component={AccessibilitySettingsView} options={{ title: "Accessibility Options" }} />
            <Stack.Screen name="ClassesList" component={ClassesListView} options={{ title: "Classes Settings", gestureEnabled: false, ...navigationHeaderPaddingStyle }} />
            <Stack.Screen name="ConfigureAdvisory" component={AdvisoryConfigureView} options={{ title: "Edit Advisory" }} />
            <Stack.Screen name="ConfigureClass" component={ClassConfigureView} options={{ title: "Edit Class" }} />
            <Stack.Screen name="Credits" component={CreditsView} options={{ title: "Credits" }} />
            <Stack.Screen name="Links" component={LinksView} options={{ title: "Links" }} />
        </Stack.Navigator>
    );
}
