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
import { default as ClassesListViewNew } from "../views/settings/class/ClassesListView";
import CreditsView from "../views/settings/CreditsView";
import AdvisoryConfigureView from "../views/settings/legacyClass/AdvisoryEditView";
import ClassesListView from "../views/settings/legacyClass/ClassesListView";
import DREditView from "../views/settings/legacyClass/DREditView";
import LunchEditView from "../views/settings/legacyClass/LunchEditView";
import MajorEditView from "../views/settings/legacyClass/MajorEditView";
import MinorEditView from "../views/settings/legacyClass/MinorEditView";
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
    // /** The advisory edit view */
    // ConfigureAdvisory: undefined;
    // /** The class edit view */
    // ConfigureClass: {
    //     /** The id of the class to configure */
    //     uuid: string;
    // };

    // TODO: REMOVE
    /** The classes list view */
    LegacyClassesList: undefined;
    /** The advisory configure view */
    LegacyConfigureAdvisory: undefined;
    /** The major configure view */
    LegacyConfigureMajor: {
        /** The id of the major to configure */
        majorId: string;
    };
    /** The minor configure view */
    LegacyConfigureMinor: {
        /** The id of the minor to configure */
        minorId: string;
    };
    /** The dr configure view */
    LegacyConfigureDR: {
        /** The id of the dr to configure */
        drId: string;
    };
    /** The lunches configure view */
    LegacyConfigureLunches: undefined;
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
            <Stack.Screen name="ClassesList" component={ClassesListViewNew} options={{ title: "Class Settings", gestureEnabled: false, ...navigationHeaderPaddingStyle }} />
            <Stack.Screen name="Credits" component={CreditsView} options={{ title: "Credits" }} />
            <Stack.Screen name="Links" component={LinksView} options={{ title: "Links" }} />

            {/* TODO: REMOVE */}
            <Stack.Screen name="LegacyClassesList" component={ClassesListView} options={{ title: "Class Settings", gestureEnabled: false, ...navigationHeaderPaddingStyle }} />
            <Stack.Screen name="LegacyConfigureAdvisory" component={AdvisoryConfigureView} options={{ title: "Advisory Settings", gestureEnabled: false, ...navigationHeaderPaddingStyle }} />
            <Stack.Screen name="LegacyConfigureMajor" component={MajorEditView} options={{ title: "Edit Major", gestureEnabled: false, ...navigationHeaderPaddingStyle }} />
            <Stack.Screen name="LegacyConfigureMinor" component={MinorEditView} options={{ title: "Edit Minor", gestureEnabled: false, ...navigationHeaderPaddingStyle }} />
            <Stack.Screen name="LegacyConfigureDR" component={DREditView} options={{ title: "Edit DR", gestureEnabled: false, ...navigationHeaderPaddingStyle }} />
            <Stack.Screen name="LegacyConfigureLunches" component={LunchEditView} options={{ title: "Edit Lunches" }} />
        </Stack.Navigator>
    );
}
