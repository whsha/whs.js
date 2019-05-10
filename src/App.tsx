/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import { createAppContainer, createBottomTabNavigator, createSwitchNavigator } from "react-navigation";
import createBottomTabNavigatorScreen from "./screens/createBottomTabNavigatorScreen";
import HomeStackNavigator from "./screens/HomeStackNavigator";
import SettingsStackNavigator from "./screens/SettingsStackNavigator";
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

export default createAppContainer(createSwitchNavigator({
    App: bottomTabNav,
    Loading: LoadingView
}, {
    initialRouteName: "Loading"
}));