/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Redirect, Route, Switch } from "react-router-native";
import useRouter from "use-react-router";
import TabBar from "../components/tabBar/TabBar";
import { mainViewStyles } from "../themes/light";
import SettingsView from "./SettingsView";
import TodayView from "./TodayView";

export default function MainView() {
    let { location, match } = useRouter();

    return (
        <SafeAreaView style={mainViewStyles.body}>
            <View style={mainViewStyles.screen}>
                <Switch>
                    <Route path="/today/:date?" component={TodayView} />
                    <Route path="/settings" component={SettingsView} />
                    <Redirect to="/today" />
                </Switch>
            </View>
            <Text>
                {JSON.stringify(location)}
            </Text>
            <Text>
                {JSON.stringify(match)}
            </Text>
            <TabBar />
        </SafeAreaView>
    );
}