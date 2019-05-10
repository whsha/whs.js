/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import { create } from "mobx-persist";
import React, { useEffect, useState } from "react";
import { AsyncStorage, Image, StyleSheet, Text, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Splash from "../../assets/splash.png";
import { GlobalCalendarStore } from "../stores";
import StorageKey from "../stores/StorageKey";

const styles = StyleSheet.create({
    image: {
        backgroundColor: "#FFFFFF",
        height: "100%",
        width: "100%"
    },
    overlay: {
        alignItems: "center",
        flex: 1,
        height: "100%",
        justifyContent: "center",
        left: 0,
        position: "absolute",
        top: 0,
        width: "100%"
    },
    taskText: {
        color: "#A0A0A0",
        fontSize: 20
    }
});

export enum Task {
    Setup = "Setting Up",
    PreparingMP = "Preparing mobx-persist",
    LoadingCal = "Loading Calendar",
    DoanloadingCal = "Downloading Calendar",
    Opening = "Opening App",
    Errored = "ERRORED"
}

export default function LoadingView({ navigation }: {navigation: NavigationScreenProp<{}>}) {
    let [currentTask, setCurrentTask] = useState<Task>(Task.Setup);

    useEffect(() => {
        (async () => {
            setCurrentTask(Task.PreparingMP);

            const hydrate = create({
                jsonify: true,
                storage: AsyncStorage
            });

            // Logic to load data
            setCurrentTask(Task.LoadingCal);

            await hydrate(StorageKey.Calendar, GlobalCalendarStore);

            if (GlobalCalendarStore.updated.getTime() === 0) {
                setCurrentTask(Task.DoanloadingCal);

                await GlobalCalendarStore.updateCalendar();
            }

            setCurrentTask(Task.Opening);

            navigation.navigate("App");
        })().catch(() => setCurrentTask(Task.Errored));
    }, []);

    return (
        <View>
            <Image source={Splash} style={styles.image} resizeMode={"contain"} />
            <View style={styles.overlay}>
                <Text style={styles.taskText}>{currentTask}...</Text>
            </View>
        </View>
    );
}