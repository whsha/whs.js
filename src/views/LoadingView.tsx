/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import { create } from "mobx-persist";
import React, { PureComponent } from "react";
import { AsyncStorage, Image, StyleSheet, Text, View } from "react-native";
import Splash from "../../assets/splash.png";
import { PureNavigationComponent } from "../components/NavigationComponent";
import { GlobalCalendarStore } from "../stores";
import StorageKey from "../stores/StorageKey";

export default class LoadingView extends PureNavigationComponent<{}, { currentTask: string }> {
    constructor(props: any) {
        super(props);

        this.state = {
            currentTask: "Setting Up..."
        };
    }

    public async componentDidMount() {
        this.setState({ currentTask: "Preparing mobx-persist" });

        const hydrate = create({
            jsonify: true,
            storage: AsyncStorage
        });

        // Logic to load data
        this.setState({ currentTask: "Loading Calendar" });

        await hydrate(StorageKey.Calendar, GlobalCalendarStore);

        if (GlobalCalendarStore.updated.getTime() === 0) {
            this.setState({ currentTask: "Downloading Calendar" });

            await GlobalCalendarStore.updateCalendar();
        }

        this.setState({ currentTask: "Opening App" });

        this.props.navigation.navigate("App");
    }

    public render() {
        return (
            <View>
                <Image source={Splash} style={styles.image} resizeMode={"contain"} />
                <View style={styles.overlay}>
                    <Text style={styles.taskText}>{this.state.currentTask}...</Text>
                </View>
            </View>
        );
    }
}

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