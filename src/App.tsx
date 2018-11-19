import React from "react";
import {
    createBottomTabNavigator,
    createStackNavigator,
    NavigationParams,
    NavigationScreenConfig,
    NavigationScreenProp,
    NavigationTabScreenOptions
} from "react-navigation";
import TabBarIcon from "./elements/TabBarIcon";
import CalendarView from "./views/CalendarView";
import HomeView from "./views/HomeView";
import SettingsView from "./views/SetingsView";

export interface INavigationElementProps<S = {}, P = NavigationParams> {
    navigation: NavigationScreenProp<S, P>;
}

// The stack navigator for the Home page
const HomeStackNavigator = createStackNavigator({ Home: HomeView }, {
    cardStyle: {
        backfaceVisibility: "visible",
        backgroundColor: "white"
    }
});
HomeStackNavigator.navigationOptions = {
    tabBarLabel: "Home",
    tabBarIcon: ({focused}) => <TabBarIcon name="list" focused={focused}/>
} as NavigationScreenConfig<NavigationTabScreenOptions>;

// The tab navigator
export default createBottomTabNavigator({
    Calendar: CalendarView,
    Home: HomeStackNavigator,
    Settings: SettingsView
}, {
    initialRouteName: "Home",
    swipeEnabled: true
});