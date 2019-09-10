/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { TouchableOpacity } from "react-native";
import { Link, Route } from "react-router-native";
import { tabBarStyle } from "../../themes/light";
import IconComponent from "./TabBarIcon";

export default function TabBarLink({ name, icon, link }: { name: string; icon: string; link: string }) {
    return (
        <Link to={link} style={tabBarStyle.link} component={TouchableOpacity}>
            <Route path={link} children={IconComponent(icon, name)} />
        </Link>
    );
}