/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { create } from "mobx-persist";
import React, { useEffect, useState } from "react";
import { AsyncStorage, SafeAreaView, StyleSheet, View } from "react-native";
import { BackButton, NativeRouter, Redirect, Route, Switch } from "react-router-native";
import TabBar from "./components/tabBar/TabBar";
import { ReloadFunctionContext } from "./contexts";
import { GlobalCalendarStore } from "./stores";
import StorageKey from "./stores/storageKey";
import { fetchCalendar } from "./util/calendarUtil";
import LoadingView from "./views/LoadingView";
import SettingsView from "./views/SettingsView";
import TodayView from "./views/TodayView";

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    screen: {
        backgroundColor: "green",
        flex: 1
    }
});

function MainView() {
    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.screen}>
                <Switch>
                    <Route path="/today" component={TodayView} />
                    <Route path="/settings" component={SettingsView} />
                    <Redirect to="/today" />
                </Switch>
            </View>
            <TabBar />
        </SafeAreaView>
    );
}

export enum ApplicationState {
    Setup = "Setting Up",
    PreparingMP = "Preparing mobx-persist",
    LoadingCal = "Loading Calendar",
    DownloadingCal = "Downloading Calendar",
    ParsingCal = "Parsing Calendar",
    Opening = "Opening App",
    Errored = "ERRORED",
    Loaded = "LOADED"
}

export default function App() {
    let [currentTask, setCurrentTask] = useState<ApplicationState>(ApplicationState.Setup);

    async function Load(reset = false) {
        setCurrentTask(ApplicationState.PreparingMP);

        // Setup Mobx-Persist
        const hydrate = create({
            jsonify: true,
            storage: AsyncStorage
        });

        setCurrentTask(ApplicationState.LoadingCal);

        // Load from cache if exists
        await hydrate(StorageKey.Calendar, GlobalCalendarStore);

        // If not loaded, download it
        if (GlobalCalendarStore.updated.getTime() === 0 || reset) {
            setCurrentTask(ApplicationState.DownloadingCal);
            console.log("Downloading");

            // Fetch the calendar off of the interweb
            let rawcal = await fetchCalendar();

            setCurrentTask(ApplicationState.ParsingCal);
            await GlobalCalendarStore.updateCalendar(rawcal);
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
                    <ReloadFunctionContext.Provider value={Load}>
                        <MainView />
                    </ReloadFunctionContext.Provider>
                </BackButton >
            </NativeRouter>
        );
    } else {
        return <LoadingView task={currentTask} />;
    }
}