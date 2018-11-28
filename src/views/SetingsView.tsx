import moment from "moment";
import React, { PureComponent } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Cell, Section } from "react-native-tableview-simple";
import { NavigationScreenConfig, NavigationTabScreenOptions } from "react-navigation";
import { INavigationElementProps } from "../App";
import { ICalendarInformation } from "../types/Calendar";
import { getHighSchoolICal } from "../util/CalendarUtil";

interface ISettingsViewState {
    iCalInfo?: ICalendarInformation;
}

export default class SettingsView extends PureComponent<INavigationElementProps, ISettingsViewState> {
    public static navigationOptions: NavigationScreenConfig<NavigationTabScreenOptions> = {
        title: "Settings"
    };

    constructor(props: INavigationElementProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        this.refreshICal();
    }

    public render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={{paddingTop: 10}}>
                    <Section header="Classes">
                        <Cell
                            title="Configure Classes"
                            cellStyle="Basic"
                            accessory="DisclosureIndicator"
                            onPress={() => void this.props.navigation.navigate("ClassSetup")}
                        />
                    </Section>
                    <Section header="Storage">
                    {/* FIXME: Make app show calendar loading. Stop the app from doing anything else */}
                        <Cell
                            title="Update WHS Calendar (FIXME)"
                            cellStyle="Subtitle"
                            titleTextColor="#2f95dc"
                            onPress={this.refreshICal}
                            detail={`Last Updated ${this.state.iCalInfo && moment(this.state.iCalInfo.updated).fromNow()}`}
                        />
                    </Section>
                </ScrollView>
            </SafeAreaView>
        );
    }

    private refreshICal = (force = false) => {
        getHighSchoolICal(force).then((value) =>
            this.setState({
                iCalInfo: value
            }));
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EFEFF4",
        height: "100%",
        padding: 10
    }
});
