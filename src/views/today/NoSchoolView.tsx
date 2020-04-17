/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { DimText } from "../../styles/components/common";
import { GoToNextSchoolDayButton, GoToNextSchoolDayText, NoSchoolContainerView } from "../../styles/components/noschool";

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
    const nextSchoolDay = selectedDate.format("dddd") === "Saturday" ? selectedDate.add(2, "day") : selectedDate.add(1, "day");

    const goToNextSchoolDay = () => setDate(nextSchoolDay);

    return (
        <NoSchoolContainerView>
            <GoToNextSchoolDayButton onPress={goToNextSchoolDay}>
                <GoToNextSchoolDayText>Go to next school day</GoToNextSchoolDayText>
                <DimText>{nextSchoolDay.startOf("day").from(selectedDate.startOf("day"))}</DimText>
            </GoToNextSchoolDayButton>
        </NoSchoolContainerView>
    );
}