import React, { Component } from "react";
import { ActivityIndicator, Button, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { NavigationScreenConfig, NavigationTabScreenOptions } from "react-navigation";
import { INavigationElementProps } from "../App";
import { SetSchoolDay } from "../redux/actions/SchoolDay";
import Store from "../redux/Store";
import TabBarIcon from "../TabBarIcon";

interface ISettingsViewState {
    iCalInfo?: string;
    loading: boolean;
}

// TODO: MOVE
async function getHighSchoolICal() {
    let response = await fetch("http://goo.gl/FR0zjg");
    return await response.text();
}

export default class SettingsView extends Component<INavigationElementProps, ISettingsViewState> {
    static navigationOptions: NavigationScreenConfig<NavigationTabScreenOptions> = {
        title: "Settings",
        swipeEnabled: true,
        tabBarIcon: ({focused}) => <TabBarIcon name="cog" focused={focused}/>
    };

    constructor(props: INavigationElementProps) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        getHighSchoolICal().then((value) => {
            console.log(value);
            this.setState({
                iCalInfo: value,
                loading: false
            });
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
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
                {this.state.loading ?
                    <ActivityIndicator/> :
                    <ScrollView>
                        <Text>{this.state.iCalInfo.slice(0, 1000)}</Text>
                    </ScrollView>
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});
