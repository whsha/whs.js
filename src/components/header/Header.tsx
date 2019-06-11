/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
    leftButton: {
        left: 0,
        marginHorizontal: 15,
        marginVertical: 10,
        position: "absolute",
    },
    rightButton: {
        marginHorizontal: 15,
        marginVertical: 10,
        position: "absolute",
        right: 0
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
    onClick?(event: GestureResponderEvent): void;
}

/** A header with multiple lines. A Title and a subtitle */
export function MultilineHeader({ title, subtitle, leftButton, rightButton, onClick }: IMultilineHeaderProps) {
    return (
        <View style={styles.header}>
            <View style={styles.leftButton}>
                {leftButton}
            </View>
            <TouchableOpacity onPress={onClick}>
                <Text style={styles.headerTitle}>{title}</Text>
                <Text style={styles.headerSubtitle}>{subtitle}</Text>
            </TouchableOpacity>
            <View style={styles.rightButton}>
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
            <View style={styles.leftButton}>
                {leftButton}
            </View>
            <Text style={styles.singleHeaderTitle}>{title}</Text>
            <View style={styles.rightButton}>
                {rightButton}
            </View>
        </View>
    );
}