/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { InitialState, NavigationState } from "@react-navigation/core";
import { NavigationNativeContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import { create } from "mobx-persist";
import React, { useContext, useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-view";
import * as Sentry from "sentry-expo";
import { CalendarContext, ClassesContext, ReloadFunctionContext, TempClassesContext } from "./contexts";
import StorageKey from "./storageKey";
import fetchCalendar from "./util/calendar/fetch";
import parseCalendar from "./util/calendar/parse";
import LoadingView from "./views/LoadingView";
import MainView from "./views/MainView";

export enum ApplicationState {
    Setup = "Setting Up",
    PreparingMP = "Preparing mobx-persist",
    LoadingCal = "Loading Calendar",
    DownloadingCal = "Downloading Calendar",
    ParsingCal = "Parsing Calendar",
    SavingCal = "Saving Calendar",
    LoadingClasses = "Loading Classes",
    Opening = "Opening App",
    Loaded = "Loaded",
    Errored = "ERRORED",
}

Sentry.init({
    dsn: "https://55a644a01c154f0ca6b19f18849b9b51@sentry.io/1480747",
    environment: Constants.manifest.releaseChannel as string
});
// TODO: Sentry.setUserContext({})

export default function App() {
    let [currentTask, setCurrentTask] = useState<ApplicationState>(ApplicationState.Setup);
    let [initialNavState, setInitialNavState] = useState<InitialState | undefined>();
    let calendar = useContext(CalendarContext);
    let classes = useContext(ClassesContext);
    let tempClasses = useContext(TempClassesContext);

    let Load = async (reset = false) => {
        setCurrentTask(ApplicationState.PreparingMP);

        // Setup Mobx-Persist
        const hydrate = create({
            jsonify: true,
            storage: AsyncStorage
        });

        setCurrentTask(ApplicationState.LoadingCal);

        // Load from cache if exists
        await hydrate(StorageKey.Calendar, calendar);

        // If not loaded, download it
        if (calendar.updated.getTime() === 0 || reset) {
            setCurrentTask(ApplicationState.DownloadingCal);

            // Fetch the calendar off of the interweb
            let rawcal = await fetchCalendar();

            if (rawcal.isErr) {
                setCurrentTask(ApplicationState.Errored);
                console.error(rawcal.error);

                return;
            }

            setCurrentTask(ApplicationState.ParsingCal);
            // Parse the calendar
            let parsed = parseCalendar(rawcal.unwrap());

            setCurrentTask(ApplicationState.SavingCal);
            await calendar.updateCalendar(parsed);
        }

        setCurrentTask(ApplicationState.LoadingClasses);
        await hydrate(StorageKey.Classes, classes);
        tempClasses.hydrateFrom(classes);

        setCurrentTask(ApplicationState.Opening);
        let navstate = await AsyncStorage.getItem(StorageKey.Navigation);
        if (navstate !== null) {
            setInitialNavState(JSON.parse(navstate) as InitialState);
        }

        setCurrentTask(ApplicationState.Loaded);
    };

    let changeNavState = (state?: Partial<NavigationState>) => {
        console.log("new state is", state);
        if (state !== undefined) {
            AsyncStorage.setItem(StorageKey.Navigation, JSON.stringify(state));
        }
    };

    useEffect(() => {
        Load().catch((reason) => {
            setCurrentTask(ApplicationState.Errored);
            console.error(reason);
        });
    }, []);

    return (
        <SafeAreaProvider>
            <NavigationNativeContainer initialState={initialNavState} onStateChange={changeNavState}>
                <ReloadFunctionContext.Provider value={Load}>
                    {currentTask === ApplicationState.Loaded ? <MainView /> : <LoadingView task={currentTask} />}
                </ReloadFunctionContext.Provider>
            </NavigationNativeContainer>
        </SafeAreaProvider>
    );
}