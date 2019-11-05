/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { useNavigation, useRoute } from "@react-navigation/core";
import dayjs, { Dayjs } from "dayjs";
import React, { useContext } from "react";
import SafeAreaView from "react-native-safe-area-view";
import { HeaderLeftArrow, HeaderRightArrow } from "../components/header/HeaderButtons";
import { MultilineHeader } from "../components/header/MultilineHeader";
import { CalendarContext } from "../contexts";
import { todayViewStyles } from "../themes/light";
import { TodayViewNavProp, TodayViewRouteProp } from "./MainView";
import ClassesView from "./today/ClassesView";
import NoSchoolView from "./today/NoSchoolView";

export default function TodayView() {
    const calendar = useContext(CalendarContext);

    let { params } = useRoute<TodayViewRouteProp>();
    let navigation = useNavigation<TodayViewNavProp>();

    let { day } = params;

    const schoolDay = calendar.schoolDay(day);

    const goToToday = () => navigation.navigate("Today", { day: dayjs().startOf("day") });
    const goTo = (date: Dayjs) => navigation.navigate("Today", { day: date });
    const left = () => navigation.navigate("Today", { day: day.subtract(1, "day") });
    const right = () => navigation.navigate("Today", { day: day.add(1, "day") });

    return (
        <SafeAreaView style={todayViewStyles.todayView}>
            <MultilineHeader
                title={schoolDay === undefined ? "No School" : `${schoolDay.isHalf ? "Half " : ""}Day ${schoolDay.dayNumber}`}
                subtitle={day.format("dddd, MMMM D")}
                leftButton={<HeaderLeftArrow onPress={left} />}
                rightButton={<HeaderRightArrow onPress={right} />}
                onClick={goToToday}
            />
            {schoolDay === undefined ? <NoSchoolView selectedDate={day} setDate={goTo} /> : <ClassesView schoolDay={schoolDay} />}
        </SafeAreaView>
    );
}