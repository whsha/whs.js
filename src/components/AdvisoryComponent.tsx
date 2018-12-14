/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface IProps {
    teacher: string;
    room: number;
}
export default function AdvisoryComponent({teacher, room}: IProps) {
    return (
        <View style={styles.container}>
            <View style={styles.dualView}>
                <Text style={styles.title}>Advisory</Text>
                <Text style={styles.dim}>9:38 - 9:46 AM</Text>
            </View>
            <View style={[styles.dualView, styles.info]}>
                <Text style={[styles.dim, styles.teacher]} numberOfLines={1}>{teacher}</Text>
                <Text style={[styles.dim, styles.room]} numberOfLines={1}>Room {room}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        // borderBottomColor: "#CECECE",
        // borderBottomWidth: 1,
        height: 75,
        padding: 10,
        width: "100%"
    },
    dim: {
        color: "#808080"
    },
    dualView: {
        alignItems: "baseline",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between"
    },
    info: {
        marginTop: 5
    },
    room: {
        overflow: "visible"
    },
    teacher: {
        maxWidth: "50%"
    },
    title: {
        color: "#A0A0A0",
        fontSize: 25,
        fontWeight: "bold"
    }
});