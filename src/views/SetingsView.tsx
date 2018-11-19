import * as ICal from "ical.js";
import React, { Component } from "react";
import { ActivityIndicator, Button, SafeAreaView, ScrollView, StyleSheet, Text, AsyncStorage } from "react-native";
import { NavigationScreenConfig, NavigationTabScreenOptions } from "react-navigation";
import { INavigationElementProps } from "../App";
import TabBarIcon from "../elements/TabBarIcon";
import { SetSchoolDay } from "../redux/actions/SchoolDay";
import Store from "../redux/Store";
import { ISchoolDay, ValidSchoolDayNumber } from "../types/SchoolDay";

// FIXME: ONLY STORE USEFUL CAL INFO, AND STORE IT AS COMPONENTS
// TODO: CUSTOM DATA TYPE TO ONLY STORE USEFUL CALENDAR EVENTS AND THEIR ATTRIBUTES
// FIXME: DATES
interface ISettingsViewState {
    iCalInfo?: any[];
    loading: boolean;
}

interface ICalendarInformation {
    /** The school days */
    schoolDays: ISchoolDay[];
    /** Events that take place */
    events: IEvent[];
}

/** An event */
interface IEvent {
    /** The start time of the event */
    start: Date;
    /** The end time of the event */
    end: Date;
    /** The timestamp of the event */
    stamp: Date;
    /** The name of the event */
    name: string;
    /** The description of the event */
    description?: string;
    /** The location of the event */
    location?: string;
    /** If the event is all day */
    isAllDay: boolean;
}

function stripTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
}

// TODO: MOVE
async function getHighSchoolICal(): Promise<ICalendarInformation> {
    // Cache cal
    let rawical: string = await AsyncStorage.getItem("@whs/calendar/raw");

    // Fetch cal if not in cache
    if (rawical === null) {
        console.log("Fetching");

        let fetchstarttime = Date.now();
        let response = await fetch("http://goo.gl/FR0zjg");

        console.log(`Took ${Date.now() - fetchstarttime}ms to fetch`);

        rawical = await response.text();
        await AsyncStorage.setItem("@whs/calendar/raw", rawical);
    }

    // Parse cal
    console.log("Parsing");
    let parsestarttime = Date.now();

    let cal = ICal.parse(rawical);
    let calendarComponent = new ICal.Component(cal);

    const schoolDayRegex = /(HALF )?DAY ([1-7])(?: - )?(.*)/gi;

    // let events
    let schoolDays: ISchoolDay[] = [];
    let events: IEvent[] = [];

    for (let event of calendarComponent.getAllSubcomponents("vevent")) {
        let date = stripTime(event.getFirstPropertyValue<ICal.Time>("dtstart").toJSDate());

        let end = event.getFirstPropertyValue<ICal.Time>("dtend");

        let match = schoolDayRegex.exec(event.getFirstPropertyValue("summary"));

        if (match !== null)
            schoolDays.push({
                dayNumber: parseInt(match[2], 10) as ValidSchoolDayNumber,
                isHalf: match[1] !== undefined,
                meta: match[3],
                date
            });
        else
            events.push({
                name: event.getFirstPropertyValue("summary"),
                description: event.getFirstPropertyValue("description"),
                location: event.getFirstPropertyValue("location"),
                end: end === null ? undefined : end.toJSDate(),
                start: event.getFirstPropertyValue<ICal.Time>("dtstart").toJSDate(),
                stamp: event.getFirstPropertyValue<ICal.Time>("dtstamp").toJSDate(),
                isAllDay: end === null
            });
    }

    console.log(schoolDays.slice(0, 100));
    console.log(schoolDays.filter(x => x.date === stripTime(new Date())), stripTime(new Date()));

    // console.log(names);
    console.log(`Took ${Date.now() - parsestarttime}ms to parse`);
    return {
        schoolDays,
        events
    };
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
                loading: false
            });
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Settings</Text>
                <Button title="Clear ICal Cache" onPress={() => AsyncStorage.removeItem("@whs/calendar/raw", () => this.componentDidMount())} />
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
                    <ScrollView>
                        {/* {(() => {
                            let comp = new ICal.Component(this.state.iCalInfo);
                            let vevents = comp.getAllSubcomponents("vevent");
                            vevents = vevents.sort((a, b) => new Date(a.getFirstPropertyValue("dtend")).getTime() - new Date(b.getFirstPropertyValue("dtend")).getTime());
                            vevents = vevents.filter(x => !isBeforeNow(x));
                            vevents = vevents.slice(0, 1000);

                            function isBeforeNow(x: ICal.Component) {
                                return new Date(x.getFirstPropertyValue("dtend")).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
                            }

                            function isNow(x: ICal.Component) {
                                return new Date(x.getFirstPropertyValue("dtend")).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
                            }

                            return vevents.map((x, i) =>
                                <View key={i} style={{ margin: 10 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                                        {x.getFirstPropertyValue("summary")}
                                    </Text>
                                    <Text style={{ color: isBeforeNow(x) ? "red" : "green", fontWeight: isNow(x) ? "bold" : "normal"}}>
                                        {
                                            isNow(x) ? "Today" : `${x.getFirstPropertyValue("dtstart")} - ${x.getFirstPropertyValue("dtend")}`
                                        }
                                    </Text>
                                </View>
                            );
                        })()} */}
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
        justifyContent: "center",
        marginBottom: 50
    }
});
