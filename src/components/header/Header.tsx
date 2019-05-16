/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderBackButton, HeaderDoneButton } from "./HeaderButtons";

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
    back?(): void;
    done?(): void;
    canDone?: boolean;
}

/** A header with a single line: a Title */
export function SinglelineHeader({ title, back, done, canDone }: ISinglelineHeader) {
    return (
        <View style={styles.header}>
            {back === undefined ? undefined : <HeaderBackButton onPress={back} />}
            <Text style={styles.singleHeaderTitle}>{title}</Text>
            {done === undefined ? undefined : <HeaderDoneButton onPress={done} disabled={canDone !== true} />}
        </View>
    );
}