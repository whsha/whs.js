/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import React, { Component } from "react";
import { SafeAreaView, Text } from "react-native";
import MultilineHeader from "../components/MultilineHeader";

export default class TodayView extends Component {
    public static navigationOptions = {
        headerTitle: <MultilineHeader title="Day 5" subtitle="Tuesday, December 6th"/>
    };

    public render() {
        return (
            <SafeAreaView>
                <Text>Today</Text>
            </SafeAreaView>
        );
    }
}