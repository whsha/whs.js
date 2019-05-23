/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { observer } from "mobx-react-lite";
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
        backgroundColor: "green",
        flex: 1
    }
});

const MainView = observer(() => {
    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.screen}>
                <Switch>
                    <Route path="/today" component={TodayView} />
                    <Route path="/settings" component={SettingsView} />
                    <Redirect to="/today" />
                </Switch>
            </View>
            <TabBar />
        </SafeAreaView>
    );
});

export default MainView;