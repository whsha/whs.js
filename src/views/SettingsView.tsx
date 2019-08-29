/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Route, Switch } from "react-router-native";
import AdvisoryConfigureView from "./settings/AdvisoryConfigureView";
import ClassesConfigureView from "./settings/ClassesConfigureView";
import MainView from "./settings/MainSettingsView";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EFEFF4",
        flex: 1
    }
});

const SettingsView = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Switch>
                <Route path="/settings/advisory" exact={true} component={AdvisoryConfigureView}/>
                <Route path="/settings/classes" component={ClassesConfigureView}/>
                <Route path="/settings" component={MainView}/>
            </Switch>
        </SafeAreaView>
    );
};

export default SettingsView;