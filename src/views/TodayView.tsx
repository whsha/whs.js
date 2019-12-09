/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import dayjs, { Dayjs } from "dayjs";
import React, { useContext } from "react";
import { HeaderLeftArrow, HeaderRightArrow } from "../components/header/HeaderButtons";
import MultilineHeaderTitle from "../components/header/MultilineHeaderTitle";
import { CalendarContext } from "../contexts";
import { navigationHeaderPaddingStyle } from "../styles/layout/default";
import { MainTabParams } from "./MainView";
import ClassesView from "./today/ClassesView";
import NoSchoolView from "./today/NoSchoolView";

/** The stack navigator for the today view */
const TodayStack = createStackNavigator();

/** The today tab view */
export default function TodayView() {
    const calendar = useContext(CalendarContext);

    const { params } = useRoute<RouteProp<MainTabParams, "Today">>();
    const navigation = useNavigation<BottomTabNavigationProp<MainTabParams, "Today">>();

    navigation.addListener("tabPress", e => {
        // Prevent default behavior
        e.preventDefault();

        goToToday();
    });

    const day = dayjs(params.day);

    const schoolDay = calendar.schoolDay(day);

    const goToToday = () => navigation.navigate("Today", { day: dayjs().startOf("day").toDate() });
    const goTo = (date: Dayjs) => navigation.navigate("Today", { day: date.toDate() });
    const left = () => navigation.navigate("Today", { day: day.subtract(1, "day").toDate() });
    const right = () => navigation.navigate("Today", { day: day.add(1, "day").toDate() });

    const screenOptions: StackNavigationOptions = {
        headerLeft: () => <HeaderLeftArrow onPress={left} />,
        headerRight: () => <HeaderRightArrow onPress={right} />,
        headerTitle: () => (
            <MultilineHeaderTitle
                title={schoolDay === undefined ? "No School" : `${schoolDay.isHalf ? "Half " : ""}Day ${schoolDay.dayNumber}`}
                subtitle={day.format("dddd, MMMM D")}
                onClick={goToToday}
            />
        ),
        ...navigationHeaderPaddingStyle
    };

    const ClassesViewInternal = () => {
        return schoolDay === undefined ? <NoSchoolView selectedDate={day} setDate={goTo} /> : <ClassesView schoolDay={schoolDay} />;
    };

    return (
        <TodayStack.Navigator screenOptions={screenOptions} initialRouteName="Classes">
            <TodayStack.Screen name="Classes" component={ClassesViewInternal} />
        </TodayStack.Navigator>
    );
}