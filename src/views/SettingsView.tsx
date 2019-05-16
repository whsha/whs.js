/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Route, Switch } from "react-router-native";
import AdvisoryConfigureView from "./settings/AdvisoryConfigureView";
import LicenseView from "./settings/LicenseView";
import MainView from "./settings/MainView";

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
                <Route path="/settings/license" exact={true} component={LicenseView}/>
                <Route path="/settings" component={MainView}/>
            </Switch>
        </SafeAreaView>
    );
};

export default SettingsView;