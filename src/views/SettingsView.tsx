/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { Text } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { settingsViewStyles } from "../themes/light";
// import ClassesConfigureView from "./settings/ClassesConfigureView";
// import MainView from "./settings/MainSettingsView";

export default function SettingsView() {
    return (
        <SafeAreaView style={settingsViewStyles.container}>
            {/* <Switch>
                <Route path="/settings/classes" component={ClassesConfigureView}/>
                <Route path="/settings" component={MainView}/>
            </Switch> */}
            <Text>//FIXME:</Text>
        </SafeAreaView>
    );
}