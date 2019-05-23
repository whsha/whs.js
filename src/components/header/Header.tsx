/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        backgroundColor: "#fff",
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
        height: 50,
        justifyContent: "center",
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
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center"
    }
});

interface IMultilineHeaderProps {
    title: string;
    subtitle: string;
    leftButton?: JSX.Element;
    rightButton?: JSX.Element;
}

/** A header with multiple lines. A Title and a subtitle */
export function MultilineHeader({ title, subtitle, leftButton, rightButton }: IMultilineHeaderProps) {
    return (
        <View style={styles.header}>
            <View style={{ left: 0 }}>
                {leftButton}
            </View>
            <Text style={styles.headerTitle}>{title}</Text>
            <Text style={styles.headerSubtitle}>{subtitle}</Text>
            <View style={{ right: 0 }}>
                {rightButton}
            </View>
        </View>
    );
}

interface ISinglelineHeader {
    title: string;
    leftButton?: JSX.Element;
    rightButton?: JSX.Element;
}

/** A header with a single line: a Title */
export function SinglelineHeader({ title, leftButton, rightButton }: ISinglelineHeader) {
    return (
        <View style={styles.header}>
            <View style={{ left: 0 }}>
                {leftButton}
            </View>
            <Text style={styles.singleHeaderTitle}>{title}</Text>
            <View style={{ right: 0 }}>
                {rightButton}
            </View>
        </View>
    );
}