import React from "react";
import { Platform } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

export default class TabBarIcon extends React.Component<{name: string, focused: boolean}> {
    public render() {
        return (
            <IonIcon
                name={`${Platform.OS === "ios" ? "ios" : "md"}-${this.props.name}`}
                size={26}
                style={{ marginBottom: -3 }}
                color={this.props.focused ? "#2f95dc" : "#ccc"}
            />
        );
    }
}