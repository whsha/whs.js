/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarOptions, BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp, RouteProp } from "@react-navigation/core";
import dayjs from "dayjs";
import React from "react";
import { Platform } from "react-native";
import { tabBarIconNotSelectedColor, tabBarIconSelectedColor } from "../layout/default";
import SettingsView from "./SettingsView";
import TodayView from "./TodayView";

export interface ITabParamList extends Record<string, object | undefined> {
    Today: {
        day: Date;
    };
    Settings: undefined;
}
export type TodayViewRouteProp = RouteProp<ITabParamList, "Today">;
export type TodayViewNavProp = NavigationProp<ITabParamList, "Today">;

export type SettingsViewRouteProp = RouteProp<ITabParamList, "Settings">;
export type SettingsViewNavProp = NavigationProp<ITabParamList, "Settings">;

const Tab = createBottomTabNavigator<ITabParamList>();

export default function MainView() {
    const screenOptions: ((props: {
        route: RouteProp<ITabParamList, string>;
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
            <Tab.Screen name="Today" component={TodayView} initialParams={{ day: dayjs().startOf("day").toDate() }} />
            <Tab.Screen name="Settings" component={SettingsView} />
        </Tab.Navigator>
    );
}