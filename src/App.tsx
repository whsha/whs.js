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
import SettingsView from "./views/SetingsView";
import { AboutView, LicenseView } from "./views/settings/AboutViews";
import ClassSetupView from "./views/settings/ClassSetupView";
import AdvisoryEditorView from "./views/settings/editor/AdvisoryEditorView";
import ClassEditorView from "./views/settings/editor/ClassEditorView";
import LunchEditorView from "./views/settings/editor/LunchEditorView";
import TodayView from "./views/TodayView";

export interface INavigationElementProps<S = {}, P = NavigationParams> {
    navigation: NavigationScreenProp<S, P>;
}

// The stack navigator for the Home page
const HomeStackNavigator = createStackNavigator({
    Today: TodayView
}, {
    cardStyle: {
        backfaceVisibility: "visible",
        backgroundColor: "white"
    },
    initialRouteName: "Today"
});
HomeStackNavigator.navigationOptions = (): NavigationScreenConfig<NavigationTabScreenOptions> => {
    return {
        tabBarLabel: "Home",
        tabBarIcon: ({ focused }) => <TabBarIcon name="list" focused={focused} />
    };
};

// The stack navigator for the Settings page
const SettingsStackNavigator = createStackNavigator({
    MainSettings: SettingsView,
        ClassSetup: ClassSetupView,
            EditClass: ClassEditorView,
            EditAdvisory: AdvisoryEditorView,
            EditLunches: LunchEditorView,
        About: { screen: AboutView, navigationOptions: { title: "About" }},
        License: { screen: LicenseView, navigationOptions: { title: "License" }}
}, {
    cardStyle: {
        backfaceVisibility: "visible",
        backgroundColor: "white"
    },
    initialRouteName: "MainSettings"
});
let navops: NavigationScreenConfig<NavigationTabScreenOptions> = ({navigation}) => ({
    tabBarLabel: "Settings",
    tabBarIcon: ({ focused }) => <TabBarIcon name="cog" focused={focused} />,
    tabBarVisible: navigation.state.index === 0
});
SettingsStackNavigator.navigationOptions = navops;

// The tab navigator
export default createBottomTabNavigator({
    Calendar: CalendarView,
    Home: HomeStackNavigator,
    Settings: SettingsStackNavigator
}, {
    initialRouteName: "Home",
    swipeEnabled: true
});

/**
 * ROUTES
 *
 * BottomTabNavigator
 * | Calendar                           => Calendar View
 * | Home (StackNavigator)
 * | | Today                            => Today View
 * | Settings (StackNavigator)
 * | | MainSettings                     => SettingsView
 * | |  ClassSetup                       => ClassSetupView
 * | |    EditClass                        => ClassEditorView
 * | |    EditAdvisory                     => AdvisoryEditorView
 * | |    EditLunches                      => LunchEditorView
 * | |  About                            => AboutView
 * | |  License                          => LicenseView
 */