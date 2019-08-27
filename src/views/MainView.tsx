/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Redirect, Route, Switch } from "react-router-native";
import TabBar from "../components/tabBar/TabBar";
import SettingsView from "./SettingsView";
import TodayView from "./TodayView";

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    screen: {
        flex: 1
    }
});

export default function MainView() {
    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.screen}>
                <Switch>
                    <Route path="/today/:date?" component={TodayView} />
                    <Route path="/settings" component={SettingsView} />
                    <Redirect to="/today" />
                </Switch>
            </View>
            <TabBar />
        </SafeAreaView>
    );
}