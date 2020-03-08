/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import dayjs, { Dayjs } from "dayjs";
import { default as useCustomFormat } from "dayjs/plugin/customParseFormat";
import * as Haptics from "expo-haptics";
import React, { useContext } from "react";
import { Directions, FlingGestureHandler, FlingGestureHandlerStateChangeEvent, State } from "react-native-gesture-handler";
import { HeaderLeftArrow, HeaderRightArrow } from "../components/header/HeaderButtons";
import MultilineHeaderTitle from "../components/header/MultilineHeaderTitle";
import { CalendarContext } from "../contexts";
import { FlexView } from "../styles/components/general";
import { navigationHeaderPaddingStyle } from "../styles/navigation";
import withHaptics from "../util/withHaptics";
import ClassesView from "../views/today/ClassesView";
import NoSchoolView from "../views/today/NoSchoolView";
import { MainTabParams } from "./MainNavigator";

dayjs.extend(useCustomFormat);

/** The format to use for the internal day storage */
export const TODAY_DAY_FORMAT = "DDMMYYYY";

/** The stack navigator for the today view */
const TodayStack = createStackNavigator();

/** The today tab view */
export default function TodayNavigator() {
    const calendar = useContext(CalendarContext);

    const { params } = useRoute<RouteProp<MainTabParams, "Today">>();
    const navigation = useNavigation<BottomTabNavigationProp<MainTabParams, "Today">>();

    navigation.addListener("tabPress", e => {
        Haptics.impactAsync().catch(() => console.warn("Haptics failed to fire"));

        if (navigation.isFocused()) {
            // Prevent default behavior
            e.preventDefault();

            goToToday();
        }
    });

    const day = dayjs(params.day, TODAY_DAY_FORMAT);

    const schoolDay = calendar.schoolDay(day);

    const gestureHandlerWrapper = (fn: () => void) => (e: FlingGestureHandlerStateChangeEvent) => {
        if (e.nativeEvent.state === State.ACTIVE) {
            fn();
        }
    };

    const goToToday = () => navigation.navigate("Today", { day: dayjs().startOf("day").format(TODAY_DAY_FORMAT) });
    const goTo = (date: Dayjs) => navigation.navigate("Today", { day: date.format(TODAY_DAY_FORMAT) });
    const left = () => navigation.navigate("Today", { day: day.subtract(1, "day").format(TODAY_DAY_FORMAT) });
    const right = () => navigation.navigate("Today", { day: day.add(1, "day").format(TODAY_DAY_FORMAT) });

    const screenOptions: StackNavigationOptions = {
        headerLeft: () => <HeaderLeftArrow onPress={withHaptics(left)} />,
        headerRight: () => <HeaderRightArrow onPress={withHaptics(right)} />,
        headerTitle: () => (
            <MultilineHeaderTitle
                title={schoolDay === undefined ? "No School" : `${schoolDay.isMCAS ? "MCAS " : ""}${schoolDay.isHalf ? "Half " : ""}Day ${schoolDay.dayNumber}`}
                subtitle={day.format("dddd, MMMM D")}
                onClick={withHaptics(goToToday)}
            />
        ),
        ...navigationHeaderPaddingStyle
    };

    /** The internal wrapper around the classes view */
    const ClassesViewInternal = () => {
        return (
            <FlingGestureHandler onHandlerStateChange={gestureHandlerWrapper(withHaptics(right))} direction={Directions.LEFT}>
                <FlingGestureHandler onHandlerStateChange={gestureHandlerWrapper(withHaptics(left))} direction={Directions.RIGHT}>
                    <FlexView>
                        {schoolDay === undefined ? <NoSchoolView selectedDate={day} setDate={goTo} /> : <ClassesView schoolDay={schoolDay} />}
                    </FlexView>
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
