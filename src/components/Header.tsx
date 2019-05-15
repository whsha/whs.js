/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#fff",
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingTop: 10
    },
    headerSubtitle: {
        color: "#808080",
        fontSize: 12,
        textAlign: "center"
    },
    headerTitle: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center"
    },
    singleHeaderTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    }
});

interface IMultilineHeaderProps {
    title: string;
    subtitle: string;
}

/** A header with multiple lines. A Title and a subtitle */
export function MultilineHeader({ title, subtitle }: IMultilineHeaderProps) {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            <Text style={styles.headerSubtitle}>{subtitle}</Text>
        </View>
    );
}

interface ISinglelineHeader {
    title: string;
}

/** A header with a single line: a Title */
export function SinglelineHeader({ title }: ISinglelineHeader) {
    return (
        <View style={styles.header}>
            <Text style={styles.singleHeaderTitle}>{title}</Text>
        </View>
    );
}