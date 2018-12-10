/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { createBottomTabNavigator, NavigationScreenConfig, NavigationTabScreenOptions } from "react-navigation";
import TabBarIcon from "./components/TabBarIcon";
import HomeStackNavigator from "./screens/HomeStackNavigator";

export default createBottomTabNavigator({
    Home: {
        navigationOptions: {
            tabBarIcon: ({ focused }) => <TabBarIcon name="list" focused={focused} />,
            tabBarLabel: "Home"
        } as NavigationScreenConfig<NavigationTabScreenOptions>,
        screen: HomeStackNavigator
    }
});