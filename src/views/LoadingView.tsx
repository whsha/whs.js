/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import React, {  } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Splash from "../../assets/splash.png";
import { ApplicationState } from "../App";

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

export default function LoadingView({ task }: { task: ApplicationState }) {
    return (
        <View>
            <Image source={Splash} style={styles.image} resizeMode={"contain"} />
            <View style={styles.overlay}>
                <Text style={styles.taskText}>{task}...</Text>
            </View>
        </View>
    );
}