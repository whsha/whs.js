/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CalendarContext } from "../../contexts";
import { noSchoolViewStyles } from "../../styles/layout/default";

dayjs.extend(relativeTime);

/** The props for NoSchoolView */
interface INoSchoolViewProps {
    /** The current date that is shown */
    selectedDate: Dayjs;
    /** The method to set the date */
    setDate(date: Dayjs): void;
}

/** The today view when there is no school */
export default function NoSchoolView({ selectedDate, setDate }: INoSchoolViewProps) {
    const calendar = useContext(CalendarContext);
    const [nextSchoolDay, setNextSchoolDay] = useState<Dayjs | undefined>(undefined);

    useEffect(() => {
        (async () => setNextSchoolDay(calendar.nextSchoolDayAfter(selectedDate)))().catch((e) => console.warn("Failed to get next school day", e));
    }, [selectedDate, calendar]);

    const goToNextSchoolDay = () => nextSchoolDay === undefined ? void 0 : setDate(nextSchoolDay);

    return (
        <View style={noSchoolViewStyles.noSchoolView}>
            <TouchableOpacity onPress={goToNextSchoolDay} style={noSchoolViewStyles.goToNextSchoolDay}>
                <Text style={noSchoolViewStyles.goToNextSchoolDayText}>Go to next school day</Text>
                <Text style={noSchoolViewStyles.goToNextSchoolDayDiffText}>{nextSchoolDay === undefined ? "Calculating ..." : nextSchoolDay.startOf("day").from(selectedDate.startOf("day"))}</Text>
            </TouchableOpacity>
        </View>
    );
}