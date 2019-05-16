/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { StyleSheet, View } from "react-native";
import TabBarLink from "./TabBarLink";

const styles = StyleSheet.create({
    bottomTabNav: {
        // backgroundColor: "#fff",
        borderTopColor: "#eee",
        borderTopWidth: 1,
        flexDirection: "row",
        height: 50,
        justifyContent: "space-around",
    },
});

export default function TabBar() {
    return (
        <View style={styles.bottomTabNav}>
            <TabBarLink icon="calendar" link="/calendar" name="Calendar"/>
            <TabBarLink icon="list" link="/today" name="Today"/>
            <TabBarLink icon="cog" link="/settings" name="Settings"/>
        </View>
    );
}