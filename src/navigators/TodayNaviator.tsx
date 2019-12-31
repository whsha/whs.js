/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import dayjs, { Dayjs } from "dayjs";
import * as Haptics from "expo-haptics";
import React, { useContext } from "react";
import { View } from "react-native";
import { Directions, FlingGestureHandler, FlingGestureHandlerStateChangeEvent, State } from "react-native-gesture-handler";
import { HeaderLeftArrow, HeaderRightArrow } from "../components/header/HeaderButtons";
import MultilineHeaderTitle from "../components/header/MultilineHeaderTitle";
import { CalendarContext } from "../contexts";
import { navigationHeaderPaddingStyle, settingsViewStyles } from "../styles/layout/default";
import ClassesView from "../views/today/ClassesView";
import NoSchoolView from "../views/today/NoSchoolView";
import { MainTabParams } from "./MainNavigator";

/** The stack navigator for the today view */
const TodayStack = createStackNavigator();

/** The today tab view */
export default function TodayNavigator() {
    const calendar = useContext(CalendarContext);

    const { params } = useRoute<RouteProp<MainTabParams, "Today">>();
    const navigation = useNavigation<BottomTabNavigationProp<MainTabParams, "Today">>();

    navigation.addListener("tabPress", e => {
        if (navigation.isFocused()) {
            // Prevent default behavior
            e.preventDefault();

            goToToday();
        }
    });

    const day = dayjs(params.day);

    const schoolDay = calendar.schoolDay(day);

    const goToToday = () => {
        Haptics.impactAsync();
        navigation.navigate("Today", { day: dayjs().startOf("day").toDate() });
    };
    const goTo = (date: Dayjs) => {
        Haptics.impactAsync();
        navigation.navigate("Today", { day: date.toDate() });
    };
    const left = () => {
        Haptics.impactAsync();
        navigation.navigate("Today", { day: day.subtract(1, "day").toDate() });
    };
    const right = () => {
        Haptics.impactAsync();
        navigation.navigate("Today", { day: day.add(1, "day").toDate() });
    };

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

    const gestureHandlerWrapper = (fn: () => void) => (e: FlingGestureHandlerStateChangeEvent) => {
        if (e.nativeEvent.state === State.ACTIVE) {
            fn();
        }
    };

    const ClassesViewInternal = () => {
        return (
            <FlingGestureHandler onHandlerStateChange={gestureHandlerWrapper(right)} direction={Directions.LEFT}>
                <FlingGestureHandler onHandlerStateChange={gestureHandlerWrapper(left)} direction={Directions.RIGHT}>
                    <View style={settingsViewStyles.container}>
                        {schoolDay === undefined ? <NoSchoolView selectedDate={day} setDate={goTo} /> : <ClassesView schoolDay={schoolDay} />}
                    </View>
                </FlingGestureHandler>
            </FlingGestureHandler>
        );
    };

    return (
        <TodayStack.Navigator screenOptions={screenOptions} initialRouteName="Classes">
            <TodayStack.Screen name="Classes" component={ClassesViewInternal} />
        </TodayStack.Navigator>
    );
}