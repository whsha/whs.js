/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import moment from "moment";
import React from "react";
import { FlatList, ListRenderItem, SafeAreaView, StyleSheet, Text, View } from "react-native";
import AdvisoryComponent from "../components/AdvisoryComponent";
import { MultilineHeader } from "../components/Header";
import TodayEvent from "../components/TodayEvent";
import { GlobalCalendarStore } from "../stores";
import { ICalendarEvent } from "../util/CalendarUtil";

const classesViewHeight = 500;

const styles = StyleSheet.create({
    classesView: {
        backgroundColor: "red",
        borderBottomWidth: 2,
        borderColor: "#EFEFF4",
        height: classesViewHeight
    },
    eventsList: {
        backgroundColor: "blue"
    }
});

const TodayView = () => {
    const eventKeyExtractor = (x: ICalendarEvent, i: number) => `${x.name}-${i}`;
    const todayEventRenderItem: ListRenderItem<ICalendarEvent> = ({ item }) => <TodayEvent event={item} />;

    return (
        <View>
            <MultilineHeader title={GlobalCalendarStore.currentSchoolDay === undefined ? "No School" : `${GlobalCalendarStore.currentSchoolDay.isHalf ? "Half " : ""}Day ${GlobalCalendarStore.currentSchoolDay.dayNumber}`} subtitle={moment().format("dddd, MMMM Do")} />
            <View style={styles.classesView}>
                <Text>Classes</Text>
                <AdvisoryComponent room={0} teacher={"this is a realluy long teacher name as well as a big room number aa a a a a a a a a a a a a a"} />
            </View>
            <FlatList
                data={GlobalCalendarStore.currentEvents}
                keyExtractor={eventKeyExtractor}
                renderItem={todayEventRenderItem}
                scrollEnabled={true}
                style={styles.eventsList}
            />
        </View>
    );
};

export default TodayView;