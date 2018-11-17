import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationScreenConfig, NavigationTabScreenOptions } from "react-navigation";
import { INavigationElementProps } from "../App";
import { SetSchoolDay } from "../redux/actions/SchoolDay";
import Store from "../redux/Store";
import TabBarIcon from "../TabBarIcon";

export default class SettingsView extends Component<INavigationElementProps> {
    static navigationOptions: NavigationScreenConfig<NavigationTabScreenOptions> = {
        title: "Settings",
        swipeEnabled: true,
        tabBarIcon: ({focused}) => <TabBarIcon name="cog" focused={focused}/>
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Settings</Text>
                <Button title="go home" onPress={() => this.props.navigation.navigate("Home")}/>
                <Button title={Store.getState().schoolDay.dayNumber === 0 ? "uncancel school" : "cancel school"}
                    onPress={() => {
                        Store.dispatch(SetSchoolDay({
                            dayNumber: Store.getState().schoolDay.dayNumber === 0 ? 1 : 0
                        }));
                        console.log(Store.getState());
                        this.forceUpdate();
                        this.props.navigation.navigate("Home");
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});
