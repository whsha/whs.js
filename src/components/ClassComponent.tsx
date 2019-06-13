/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { Moment } from "moment";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BlockColor, BlockColorDisplayColors } from "../util/blocks/blockColor";

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

export interface IClass {
    teacher: string;
    room: number;
    name: string;
    block: BlockColor;
    start: Moment;
    end: Moment;
}
export default function ClassComponent({teacher, room, name, start, end, block}: IClass) {
    return (
        <View style={styles.container}>
            <View style={styles.dualView}>
                <Text style={[styles.title, {color: BlockColorDisplayColors[BlockColor[block]]}]}>{name}</Text>
                <Text style={styles.dim}>{start.format("hh:mm")} - {end.format("hh:mm")}</Text>
            </View>
            <View style={[styles.dualView, styles.info]}>
                <Text style={[styles.dim, styles.teacher]} numberOfLines={1}>{teacher}</Text>
                <Text style={[styles.dim, styles.room]} numberOfLines={1}>Room {room}</Text>
            </View>
        </View>
    );
}