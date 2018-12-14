/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import { observer } from "mobx-react";
import React from "react";
import { AsyncStorage, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { NavigationComponent } from "../components/NavigationComponent";
import StorageKey from "../stores/StorageKey";

@observer
class SettingsView extends NavigationComponent {
    public static navigationOptions = {
        title: "Settings"
    };

    public render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <TableView>
                        <Section header="Class Settings">
                            <Cell title="Configure Classes" accessory="DisclosureIndicator" onPress={this.navigateTo("")}/>
                            <Cell title="Configure Lunches" accessory="DisclosureIndicator" onPress={this.navigateTo("")}/>
                            <Cell title="Configure Advisory" accessory="DisclosureIndicator" onPress={this.navigateTo("ConfigureAdvisory")}/>
                        </Section>
                        <Section header="Cache">
                            <Cell title="Clear Calendar Cache" titleTextStyle={styles.redbutton} onPress={this.deleteKey(StorageKey.Calendar)}/>
                        </Section>
                    </TableView>
                </ScrollView>
            </SafeAreaView>
        );
    }

    private navigateTo(to: string) {
        return () => void this.props.navigation.navigate(to);
    }

    private deleteKey(key: StorageKey) {
        return () => void AsyncStorage.removeItem(key).catch(console.error);
    }
}

export default SettingsView;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EFEFF4",
        height: "100%"
    },
    redbutton: {
        color: "#FF5050"
    }
});