/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { AsyncStorage, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import useReactRouter from "use-react-router";
import StorageKey from "../stores/StorageKey";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EFEFF4",
        height: "100%"
    },
    redbutton: {
        color: "#FF5050"
    }
});

const SettingsView = () => {
    const { history } = useReactRouter();
    function navigateTo(to: string) {
        return () => {
            history.push(to);
        };
    }

    function deleteKey(key: StorageKey) {
        return () => {
            AsyncStorage.removeItem(key).catch((e) => console.error(e));
        };
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TableView>
                    <Section header="Class Settings">
                        <Cell title="Configure Classes" accessory="DisclosureIndicator" onPress={navigateTo("")} />
                        <Cell title="Configure Lunches" accessory="DisclosureIndicator" onPress={navigateTo("")} />
                        <Cell title="Configure Advisory" accessory="DisclosureIndicator" onPress={navigateTo("ConfigureAdvisory")} />
                    </Section>
                    <Section header="Cache">
                        <Cell title="Clear Calendar Cache" titleTextStyle={styles.redbutton} onPress={deleteKey(StorageKey.Calendar)} />
                    </Section>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
};

// SettingsView.navigationOptions = {
//     title: "Settings"
// };

export default SettingsView;