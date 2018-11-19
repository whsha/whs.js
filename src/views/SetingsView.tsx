import * as ICal from "ical.js";
import React, { Component } from "react";
import { ActivityIndicator, Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationScreenConfig, NavigationTabScreenOptions } from "react-navigation";
import { INavigationElementProps } from "../App";
import TabBarIcon from "../elements/TabBarIcon";
import { SetSchoolDay } from "../redux/actions/SchoolDay";
import Store from "../redux/Store";

interface ISettingsViewState {
    iCalInfo?: any[];
    loading: boolean;
}

// TODO: MOVE
async function getHighSchoolICal() {
    let response = await fetch("http://goo.gl/FR0zjg");
    let cal = ICal.parse(await response.text());
    return cal;
}

export default class SettingsView extends Component<INavigationElementProps, ISettingsViewState> {
    static navigationOptions: NavigationScreenConfig<NavigationTabScreenOptions> = {
        title: "Settings",
        swipeEnabled: true,
        tabBarIcon: ({ focused }) => <TabBarIcon name="cog" focused={focused} />
    };

    constructor(props: INavigationElementProps) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        getHighSchoolICal().then((value) => {
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
                <Button title="go home" onPress={() => this.props.navigation.navigate("Home")} />
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
                    <ActivityIndicator /> :
                    <View>
                        <ScrollView>
                            {(() => {
                                let comp = new ICal.Component(this.state.iCalInfo);
                                let vevents = comp.getAllSubcomponents("vevent");
                                vevents = vevents.slice(0, 1000);

                                function isBeforeNow(x: ICal.Component) {
                                    return new Date(x.getFirstPropertyValue("dtstart")).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
                                }

                                return vevents.map((x, i) => <View key={i} style={{ margin: 10 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                                        {x.getFirstPropertyValue("summary")}
                                    </Text>
                                    <Text style={{ color: isBeforeNow(x) ? "red" : "green"}}>
                                        {new Date(x.getFirstPropertyValue("dtstart")).toDateString()}
                                    </Text>
                                </View>);
                            })()}
                        </ScrollView>
                    </View>
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 50
    }
});
