/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import useRouter from "use-react-router";
import { SinglelineHeader } from "../../components/header/Header";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EFEFF4",
        flex: 1
    }
});

export default function LicenseView() {
    const { history } = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <SinglelineHeader title="License" back={() => history.goBack()}/>
            <Text>LICENSE GOES HERE</Text>
        </SafeAreaView>
    );
}