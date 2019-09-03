/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BlockColor, getDisplayColorForBlock } from "../../util/blocks/blockColor";
import { ITimes } from "../../util/class/abstracts";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        // borderBottomColor: "#CECECE",
        // borderBottomWidth: 1,
        height: 75,
        justifyContent: "center",
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
    title: {
        color: "#A0A0A0",
        fontSize: 25,
        fontWeight: "bold"
    }
});

export interface IFree {
    block: BlockColor;
}
export default function FreeComponent({start, end, block}: IFree & ITimes) {
    return (
        <View style={styles.container}>
            <View style={styles.dualView}>
                <Text style={[styles.title, {color: getDisplayColorForBlock(block)}]}>Free</Text>
                <Text style={styles.dim}>{start.format("h:mm")} - {end.format("h:mm A")}</Text>
            </View>
        </View>
    );
}