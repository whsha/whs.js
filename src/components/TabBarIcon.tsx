/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import React, { PureComponent } from "react";
import { Platform } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

/** An Icon meant to be displayed on the tab bar of a 'BottomTabNavigator' */
export default class TabBarIcon extends PureComponent<{name: string; focused: boolean}> {
    public render() {
        return (
            <IonIcon
                name={`${Platform.OS === "ios" ? "ios" : "md"}-${this.props.name}`}
                // tslint:disable-next-line:no-magic-numbers
                size={26}
                style={{ marginBottom: -3 }}
                color={this.props.focused ? "#2f95dc" : "#ccc"}
            />
        );
    }
}