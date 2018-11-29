/*!
 * hi
 * im cool
 */

import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import Licenses from "../../../licenses.json";

export function AboutView() {
    return (
        <SafeAreaView style={styles.background}>
            <Text>e</Text>
        </SafeAreaView>
    );
}

export function LicenseView() {
    return (
        <SafeAreaView style={styles.background}>
            <ScrollView>
                <Text>License</Text>
                <Text>{JSON.stringify(Licenses, undefined, 4)}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#EFEFF4",
        height: "100%",
        padding: 10,
        paddingHorizontal: 10,
        paddingVertical: 10
    }
});