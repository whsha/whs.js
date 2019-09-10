/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { View } from "react-native";
import { tabBarStyle } from "../../themes/light";
import TabBarLink from "./TabBarLink";

export default function TabBar() {
    return (
        <View style={tabBarStyle.bottomTabNav}>
            <TabBarLink icon="calendar" link="/calendar" name="Calendar"/>
            <TabBarLink icon="list" link="/today" name="Today"/>
            <TabBarLink icon="cog" link="/settings" name="Settings"/>
        </View>
    );
}