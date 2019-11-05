/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CalendarContext } from "../../contexts";
import { noSchoolViewStyles } from "../../themes/light";

dayjs.extend(relativeTime);

export default function NoSchoolView({ selectedDate, setDate }: { selectedDate: dayjs.Dayjs; setDate(date: dayjs.Dayjs): void }) {
    const calendar = useContext(CalendarContext);
    const [nextSchoolDay, setNextSchoolDay] = useState<Dayjs | undefined>(undefined);

    useEffect(() => {
        (async () => setNextSchoolDay(calendar.nextSchoolDayAfter(selectedDate)))();
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