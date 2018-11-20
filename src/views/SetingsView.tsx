import React, { Component } from "react";
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationScreenConfig, NavigationTabScreenOptions } from "react-navigation";
import { INavigationElementProps } from "../App";
import TabBarIcon from "../elements/TabBarIcon";
import { ICalendarInformation } from "../types/Calendar";
import { getHighSchoolICal } from "../util/CalendarUtil";

interface ISettingsViewState {
    iCalInfo?: ICalendarInformation;
    loading: boolean;
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
            loading: false
        };
    }

    componentDidMount() {
        // this.refreshICal();
    }

    foceRefreshICal = () => this.refreshICal(true);
    refreshICal = (force = false) => {
        this.setState({
            loading: true
        });
        getHighSchoolICal(force).then((value) =>
            this.setState({
                iCalInfo: value,
                loading: false
            }));
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Settings</Text>
                {/* <Button title={Store.getState().schoolDay.dayNumber === 0 ? "uncancel school" : "cancel school"}
                    onPress={() => {
                        Store.dispatch(SetSchoolDay({
                            dayNumber: Store.getState().schoolDay.dayNumber === 0 ? 1 : 0
                        }));
                        console.log(Store.getState());
                        this.forceUpdate();
                        this.props.navigation.navigate("Home");
                    }}
                /> */}
                <ScrollView refreshControl={<RefreshControl refreshing={this.state.loading} onRefresh={this.foceRefreshICal}/>}>
                    <SafeAreaView>
                        {this.state.iCalInfo ? this.state.iCalInfo.schoolDays.map((x, i) =>
                            <View key={i} style={{ margin: 10, width: "90%" }}>
                                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                                    {x.dayNumber}
                                </Text>
                                <Text>
                                    {x.date.toString()}
                                </Text>
                            </View>
                        ) : <ActivityIndicator/>}
                    </SafeAreaView>
                </ScrollView>
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
