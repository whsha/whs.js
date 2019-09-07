/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { useContext } from "react";
import { FlatList, ListRenderItem, Modal, StyleSheet, View } from "react-native";
import { MultilineHeader } from "../components/header/Header";
import { HeaderLeftArrow, HeaderRightArrow } from "../components/header/HeaderButtons";
import TodayEvent from "../components/TodayEvent";
import { CalendarContext } from "../contexts";
import { ICalendarEvent } from "../util/calendar/types";
import useDate from "../util/hooks/useRoutedDate";
import ClassesView from "./today/ClassesView";
import NoSchoolView from "./today/NoSchoolView";

dayjs.extend(customParseFormat);

const styles = StyleSheet.create({
    eventsList: {
        backgroundColor: "blue",
        height: 100
    },
    todayView: {
        flex: 1
    }
});

export default function TodayView() {
    const calendar = useContext(CalendarContext);
    const eventKeyExtractor = (x: ICalendarEvent, i: number) => `${x.name}-${i}`;
    const todayEventRenderItem: ListRenderItem<ICalendarEvent> = ({ item }) => <TodayEvent event={item} />;

    let {
        date,
        decrementDate,
        incrementDate,
        setDate,
        setToToday
    } = useDate();

    const schoolDay = calendar.schoolDay(date);

    return (
        <View style={styles.todayView}>
            <MultilineHeader
                title={schoolDay === undefined ? "No School" : `${schoolDay.isHalf ? "Half " : ""}Day ${schoolDay.dayNumber}`}
                subtitle={date.format("dddd, MMMM D")}
                leftButton={<HeaderLeftArrow onPress={decrementDate} />}
                rightButton={<HeaderRightArrow onPress={incrementDate} />}
                onClick={setToToday}
            />
            {schoolDay === undefined ? <NoSchoolView selectedDate={date} setDate={setDate} /> : <ClassesView schoolDay={schoolDay} />}
            {/* TODO: */}
            <Modal visible={false}>
                <FlatList
                    data={calendar.eventsOn(date)}
                    keyExtractor={eventKeyExtractor}
                    renderItem={todayEventRenderItem}
                    scrollEnabled={true}
                    style={styles.eventsList}
                />
            </Modal>
        </View>
    );
}