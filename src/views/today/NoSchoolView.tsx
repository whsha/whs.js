/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import dayjs, { Dayjs } from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CalendarContext } from "../../contexts";

const styles = StyleSheet.create({
    goToNextSchoolDay: {
        alignItems: "flex-end",
        backgroundColor: "white",
        borderColor: "#A0A0A0",
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    goToNextSchoolDayDiffText: {
        color: "#808080",
    },
    goToNextSchoolDayText: {
        color: "#1f85cc",
    },
    noSchoolView: {
        alignItems: "center",
        backgroundColor: "#EFEFF4",
        flex: 1,
        height: "100%",
        justifyContent: "center",
        width: "100%"
    }
});

export default function NoSchoolView({ selectedDate, setDate }: { selectedDate: dayjs.Dayjs; setDate(date: dayjs.Dayjs): void }) {
    const calendar = useContext(CalendarContext);
    const [nextSchoolDay, setNextSchoolDay] = useState<Dayjs | undefined>(undefined);

    useEffect(() => {
        (async () => setNextSchoolDay(calendar.nextSchoolDayAfter(selectedDate)))();
    }, [selectedDate, calendar]);

    const goToNextSchoolDay = () => nextSchoolDay === undefined ? void 0 : setDate(nextSchoolDay);

    return (
        <View style={styles.noSchoolView}>
            <TouchableOpacity onPress={goToNextSchoolDay} style={styles.goToNextSchoolDay}>
                <Text style={styles.goToNextSchoolDayText}>Go to next school day</Text>
                <Text style={styles.goToNextSchoolDayDiffText}>{nextSchoolDay === undefined ? "Calculating ..." : nextSchoolDay.startOf("day").from(selectedDate.startOf("day"))}</Text>
            </TouchableOpacity>
        </View>
    );
}