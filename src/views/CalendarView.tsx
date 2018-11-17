import React, { Component } from "react";
import { StyleSheet, Text, View} from "react-native";
import { NavigationTabScreenOptions } from "react-navigation";
import TabBarIcon from "../TabBarIcon";

export default class CalendarView extends Component {
    static navigationOptions: NavigationTabScreenOptions = {
        title: "Calendar",
        swipeEnabled: true,
        tabBarIcon: ({focused}) => <TabBarIcon name="calendar" focused={focused}/>
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Calendar</Text>
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
