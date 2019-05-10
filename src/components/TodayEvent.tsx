/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import moment from "moment";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ICalendarEvent } from "../util/CalendarUtil";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFEEFF",
        flex: 1,
        marginVertical: 20,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    times: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center"
    },
    title: {
        flex: 1,
        fontSize: 20,
        fontWeight: "bold"
    },
    titleView: {
        flex: 1,
        flexDirection: "row"
    }
});

interface ITodayEventProps {
    event: ICalendarEvent;
}
export default function TodayEvent({event}: ITodayEventProps) {
    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.title}>{event.name}</Text>
                <Text style={styles.times}>{moment(event.start).format("hh:MM A")} - {moment(event.end).format("hh:MM A")}</Text>
            </View>
            <Text>{event.description}</Text>
            <Text>{event.location}</Text>
        </View>
    );
}