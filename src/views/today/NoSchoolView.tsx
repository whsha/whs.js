/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import dayjs, { Dayjs } from "dayjs";
import { default as relativeTime } from "dayjs/plugin/relativeTime";
import React, { useContext, useEffect, useState } from "react";
import { CalendarContext } from "../../contexts";
import { DimText } from "../../styles/components/common";
import { GoToNextSchoolDayButton, GoToNextSchoolDayText, NoSchoolContainerView } from "../../styles/components/noschool";
import withHaptics from "../../util/withHaptics";

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

    const goToNextSchoolDay = withHaptics(() => nextSchoolDay === undefined ? void 0 : setDate(nextSchoolDay));

    return (
        <NoSchoolContainerView>
            <GoToNextSchoolDayButton onPress={goToNextSchoolDay}>
                <GoToNextSchoolDayText>Go to next school day</GoToNextSchoolDayText>
                <DimText>{nextSchoolDay === undefined ? "Calculating ..." : nextSchoolDay.startOf("day").from(selectedDate.startOf("day"))}</DimText>
            </GoToNextSchoolDayButton>
        </NoSchoolContainerView>
    );
}