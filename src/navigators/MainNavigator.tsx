/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarOptions, BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/core";
import dayjs from "dayjs";
import React from "react";
import { Platform } from "react-native";
import { tabBarIconNotSelectedColor, tabBarIconSelectedColor } from "../styles/layout/default";
import SettingsNavigator from "./SettingsNavigator";
import TodayNavigator from "./TodayNaviator";

/** The parameters for the tab navigator */
interface IMainTabParams {
    /** The today view */
    Today: {
        /** The date to show up */
        day: Date;
    };
    /** The settings view */
    Settings: undefined;
}

/** The parameters for the tab navigator */
export type MainTabParams = Pick<IMainTabParams, keyof IMainTabParams>;

/** The bottom tab navigator */
const Tab = createBottomTabNavigator<MainTabParams>();

/** The main app view */
export default function MainNavigator() {
    const screenOptions: ((props: {
        /** The current route */
        route: RouteProp<MainTabParams, keyof IMainTabParams>;
        /** idk and idc */
        navigation: {};
    }) => BottomTabNavigationOptions) = ({ route }) => ({
        tabBarIcon: ({ color, size }) => {
            let iconName = `${Platform.OS === "ios" ? "ios" : "md"}-`;

            if (route.name === "Today") {
                iconName += `list`; // ${focused ? "-box" : ""}
            } else if (route.name === "Settings") {
                iconName += "cog";
            }
            // else if (route.name === "Calendar") {
            //     iconName += "calendar";
            // }

            return <Ionicons name={iconName} size={size} color={color} />;
        }
    });

    const tabBarOptions: BottomTabBarOptions = {
        activeTintColor: tabBarIconSelectedColor,
        inactiveTintColor: tabBarIconNotSelectedColor
    };

    return (
        <Tab.Navigator
            initialRouteName="Today"
            screenOptions={screenOptions}
            tabBarOptions={tabBarOptions}
        >
            <Tab.Screen name="Today" component={TodayNavigator} initialParams={{ day: dayjs().startOf("day").toDate() }} />
            <Tab.Screen name="Settings" component={SettingsNavigator} />
        </Tab.Navigator>
    );
}