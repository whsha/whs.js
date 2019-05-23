/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import moment from "moment";
import React, { useContext } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import AdvisoryComponent from "../components/AdvisoryComponent";
import { MultilineHeader } from "../components/header/Header";
import TodayEvent from "../components/TodayEvent";
import { CalendarContext } from "../contexts";
import { ICalendarEvent } from "../util/calendarUtil";

const styles = StyleSheet.create({
    classesView: {
        backgroundColor: "red",
        borderBottomWidth: 2,
        borderColor: "#EFEFF4",
        flex: 1
    },
    eventsList: {
        backgroundColor: "blue",
        height: 100
    },
    todayView: {
        backgroundColor: "purple",
        flex: 1,
    }
});

export default function TodayView() {
    const calendar = useContext(CalendarContext);
    const eventKeyExtractor = (x: ICalendarEvent, i: number) => `${x.name}-${i}`;
    const todayEventRenderItem: ListRenderItem<ICalendarEvent> = ({ item }) => <TodayEvent event={item} />;

    const today = moment(Date.now());

    const schoolDay = calendar.schoolDay(today).get();

    return (
        <View style={styles.todayView}>
            <MultilineHeader title={schoolDay === undefined ? "No School" : `${schoolDay.isHalf ? "Half " : ""}Day ${schoolDay.dayNumber}`} subtitle={moment().format("dddd, MMMM Do")} />
            <View style={styles.classesView}>
                <AdvisoryComponent room={0} teacher={"this is a realluy long teacher name as well as a big room number aa a a a a a a a a a a a a a"} />
            </View>
            <FlatList
                data={calendar.eventsOn(today).get()}
                keyExtractor={eventKeyExtractor}
                renderItem={todayEventRenderItem}
                scrollEnabled={true}
                style={styles.eventsList}
            />
        </View>
    );
}