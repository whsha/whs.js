/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    headerContainer: {
        textAlign: "center"
    },
    headerTitle: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15
    },
    headerSubtitle: {
        textAlign: "center",
        color: "#808080",
        fontSize: 12
    }
});

interface IMultilineHeaderProps {
    title: string;
    subtitle: string;
}
export default function MultilineHeader({ title, subtitle }: IMultilineHeaderProps) {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{title}</Text>
            <Text style={styles.headerSubtitle}>{subtitle}</Text>
        </View>
    );
}