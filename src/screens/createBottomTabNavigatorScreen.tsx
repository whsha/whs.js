/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { NavigationContainer, NavigationScreenConfig, NavigationTabScreenOptions } from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";

export default function createBottomTabNavigatorScreen(screen: NavigationContainer, label: string, icon: string) {
    return {
        navigationOptions: {
            tabBarIcon: ({ focused }) => <TabBarIcon name={icon} focused={focused} />,
            tabBarLabel: label
        } as NavigationScreenConfig<NavigationTabScreenOptions>,
        screen
    };
}