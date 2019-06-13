/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { create } from "mobx-persist";
import React, { useContext, useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import { BackButton, NativeRouter } from "react-router-native";
import Sentry from "sentry-expo";
import { CalendarContext, ClassesContext, ReloadFunctionContext } from "./contexts";
import StorageKey from "./storageKey";
import { fetchCalendar } from "./util/calendarUtil";
import LoadingView from "./views/LoadingView";
import MainView from "./views/MainView";

export enum ApplicationState {
    Setup = "Setting Up",
    PreparingMP = "Preparing mobx-persist",
    LoadingCal = "Loading Calendar",
    DownloadingCal = "Downloading Calendar",
    ParsingCal = "Parsing Calendar",
    LoadingClasses = "Loading Classes",
    Opening = "Opening App",
    Errored = "ERRORED",
    Loaded = "LOADED"
}

Sentry.enableInExpoDevelopment = true;

Sentry.config("https://55a644a01c154f0ca6b19f18849b9b51@sentry.io/1480747").install();

export default function App() {
    let [currentTask, setCurrentTask] = useState<ApplicationState>(ApplicationState.Setup);
    const calendar = useContext(CalendarContext);
    const classes = useContext(ClassesContext);

    async function Load(reset = false) {
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

            setCurrentTask(ApplicationState.ParsingCal);
            await calendar.updateCalendar(rawcal);
        }

        setCurrentTask(ApplicationState.LoadingClasses);
        await hydrate(StorageKey.Classes, classes);

        setCurrentTask(ApplicationState.Opening);

        throw new Error("intentional error");

        setCurrentTask(ApplicationState.Loaded);
    }

    useEffect(() => {
        Load().catch(() => setCurrentTask(ApplicationState.Errored));
    }, []);

    if (currentTask === ApplicationState.Loaded) {
        return (
            <NativeRouter>
                <BackButton>
                    <ReloadFunctionContext.Provider value={Load}>
                        <MainView />
                    </ReloadFunctionContext.Provider>
                </BackButton>
            </NativeRouter>
        );
    } else {
        return <LoadingView task={currentTask} />;
    }
}