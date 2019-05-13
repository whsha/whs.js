/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import { create } from "mobx-persist";
import React, { useEffect, useState } from "react";
import { AsyncStorage, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { BackButton, Link, NativeRouter, Redirect, Route, Switch } from "react-router-native";
import useReactRouter from "use-react-router";
import { GlobalCalendarStore } from "./stores";
import StorageKey from "./stores/StorageKey";
import LoadingView from "./views/LoadingView";
import SettingsView from "./views/SettingsView";
import TodayView from "./views/TodayView";
import TabBarIcon from "./components/TabBarIcon";

// const BottomTabNav = createBottomTabNavigator({
//     Home: createBottomTabNavigatorScreen(HomeStackNavigator, "Home", "list"),
//     Settings: createBottomTabNavigatorScreen(SettingsStackNavigator, "Settings", "cog")
// }, {
//     initialRouteName: "Home",
//     order: [
//         "Home",
//         "Settings"
//     ]
// });

const styles = StyleSheet.create({
    body: {
        height: "50%",
        overflow: "scroll"
    },
    bottomTabNav: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    bottomTabNavLink: {
        margin: "auto"
    },
    screen: {
        height: "50%",
        backgroundColor: "green"
    }
});

function BottomTabNav() {
    const { location } = useReactRouter();

    return (
        <View style={styles.bottomTabNav}>
            <Link to="/calendar" style={styles.bottomTabNavLink}>
                <View>
                    <Text>Calendar</Text>
                    <TabBarIcon name="calendar" focused={location.pathname === "/calendar"} /></View>
            </Link>
            <Link to="/today">
                <View>
                    <Text>Today</Text>
                    <TabBarIcon name="list" focused={location.pathname === "/today"} />
                </View>
            </Link>
            <Link to="/settings">
                <View>
                    <Text>Settings</Text>
                    <TabBarIcon name="cog" focused={location.pathname === "/settings"} />
                </View>
            </Link>
        </View>
    );
}

function MainView() {
    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.screen}>
                {/* <Switch>
                    <Redirect exact={true} from="/" to="/today" />
                    <Route path="/today" component={TodayView} />
                    <Route path="/settings" component={SettingsView} />
                    <Route component={() => <Text>404</Text>} />
                </Switch> */}
            </View>
            <BottomTabNav />
        </SafeAreaView>
    );
}

export enum ApplicationState {
    Setup = "Setting Up",
    PreparingMP = "Preparing mobx-persist",
    LoadingCal = "Loading Calendar",
    DoanloadingCal = "Downloading Calendar",
    Opening = "Opening App",
    Errored = "ERRORED",
    Loaded = "LOADED"
}

export default function App() {
    let [currentTask, setCurrentTask] = useState<ApplicationState>(ApplicationState.Setup);

    async function Load() {
        setCurrentTask(ApplicationState.PreparingMP);

        const hydrate = create({
            jsonify: true,
            storage: AsyncStorage
        });

        // Logic to load data
        setCurrentTask(ApplicationState.LoadingCal);

        await hydrate(StorageKey.Calendar, GlobalCalendarStore);

        if (GlobalCalendarStore.updated.getTime() === 0) {
            setCurrentTask(ApplicationState.DoanloadingCal);

            await GlobalCalendarStore.updateCalendar();
        }

        setCurrentTask(ApplicationState.Opening);

        setCurrentTask(ApplicationState.Loaded);
    }

    useEffect(() => {
        Load().catch(() => setCurrentTask(ApplicationState.Errored));
    }, []);

    if (currentTask === ApplicationState.Loaded) {
        return (
            <NativeRouter>
                <BackButton >
                    <MainView />
                </BackButton >
            </NativeRouter>
        );
    } else {
        return <LoadingView task={currentTask} />;
    }
}