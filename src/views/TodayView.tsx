/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { useNavigation, useRoute } from "@react-navigation/core";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import dayjs, { Dayjs } from "dayjs";
import React, { useContext } from "react";
import { HeaderLeftArrow, HeaderRightArrow } from "../components/header/HeaderButtons";
import MultilineHeaderTitle from "../components/header/MultilineHeaderTitle";
import { CalendarContext } from "../contexts";
import { navigationHeaderPaddingStyle } from "../layout/default";
import { TodayViewNavProp, TodayViewRouteProp } from "./MainView";
import ClassesView from "./today/ClassesView";
import NoSchoolView from "./today/NoSchoolView";

const TodayStack = createStackNavigator();

export default function TodayView() {
    const calendar = useContext(CalendarContext);

    const { params } = useRoute<TodayViewRouteProp>();
    const navigation = useNavigation<TodayViewNavProp>();

    const { day } = params;

    const schoolDay = calendar.schoolDay(day);

    const goToToday = () => navigation.navigate("Today", { day: dayjs().startOf("day") });
    const goTo = (date: Dayjs) => navigation.navigate("Today", { day: date });
    const left = () => {
        console.log("left");
        navigation.navigate("Today", { day: day.subtract(1, "day") });
    };
    const right = () => navigation.navigate("Today", { day: day.add(1, "day") });

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
        // <SafeAreaView style={todayViewStyles.todayView}>
        //     <HeaderLeftArrow onPress={left} />
        //     <HeaderRightArrow onPress={right} />
        //     <MultilineHeaderTitle
        //         title={schoolDay === undefined ? "No School" : `${schoolDay.isHalf ? "Half " : ""}Day ${schoolDay.dayNumber}`}
        //         subtitle={day.format("dddd, MMMM D")}
        //         onClick={goToToday}
        //     />
        //     {schoolDay === undefined ? <NoSchoolView selectedDate={day} setDate={goTo} /> : <ClassesView schoolDay={schoolDay} />}
        // </SafeAreaView>
    );
}