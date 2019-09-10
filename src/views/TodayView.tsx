/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { useContext } from "react";
import { View } from "react-native";
import { HeaderLeftArrow, HeaderRightArrow } from "../components/header/HeaderButtons";
import { MultilineHeader } from "../components/header/MultilineHeader";
import { CalendarContext } from "../contexts";
import { todayViewStyles } from "../themes/light";
import useDate from "../util/hooks/useRoutedDate";
import ClassesView from "./today/ClassesView";
import NoSchoolView from "./today/NoSchoolView";

export default function TodayView() {
    const calendar = useContext(CalendarContext);

    let {
        date,
        decrementDate,
        incrementDate,
        setDate,
        setToToday
    } = useDate();

    const schoolDay = calendar.schoolDay(date);

    return (
        <View style={todayViewStyles.todayView}>
            <MultilineHeader
                title={schoolDay === undefined ? "No School" : `${schoolDay.isHalf ? "Half " : ""}Day ${schoolDay.dayNumber}`}
                subtitle={date.format("dddd, MMMM D")}
                leftButton={<HeaderLeftArrow onPress={decrementDate} />}
                rightButton={<HeaderRightArrow onPress={incrementDate} />}
                onClick={setToToday}
            />
            {schoolDay === undefined ? <NoSchoolView selectedDate={date} setDate={setDate} /> : <ClassesView schoolDay={schoolDay} />}
        </View>
    );
}