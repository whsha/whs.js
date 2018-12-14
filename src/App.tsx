/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import { create } from "mobx-persist";
import { AsyncStorage } from "react-native";
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, NavigationScreenConfig, NavigationTabScreenOptions } from "react-navigation";
import createBottomTabNavigatorScreen from "./screens/createBottomTabNavigatorScreen";
import HomeStackNavigator from "./screens/HomeStackNavigator";
import SettingsStackNavigator from "./screens/SettingsStackNavigator";
import { GlobalCalendarStore } from "./stores";
import LoadingView from "./views/LoadingView";

const bottomTabNav = createBottomTabNavigator({
    Home: createBottomTabNavigatorScreen(HomeStackNavigator, "Home", "list"),
    Settings: createBottomTabNavigatorScreen(SettingsStackNavigator, "Settings", "cog")
}, {
    initialRouteName: "Home",
    order: [
        "Home",
        "Settings"
    ]
});

export default createSwitchNavigator({
    App: bottomTabNav,
    Loading: LoadingView
}, {
    initialRouteName: "Loading"
});