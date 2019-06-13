/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import moment, { Moment } from "moment";
import React, { useContext, useState } from "react";
import { FlatList, ListRenderItem, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import AdvisoryComponent from "../components/AdvisoryComponent";
import ClassComponent from "../components/ClassComponent";
import { MultilineHeader } from "../components/header/Header";
import { HeaderLeftArrow, HeaderRightArrow } from "../components/header/HeaderButtons";
import TodayEvent from "../components/TodayEvent";
import { CalendarContext, ClassesContext } from "../contexts";
import { Block } from "../util/blocks/block";
import { BlockColor } from "../util/blocks/blockColor";
import { ICalendarEvent, SchoolDay } from "../util/calendarUtil";
import { MapOfBlocksToColor } from "../util/schoolDays";

const styles = StyleSheet.create({
    classesView: {
        backgroundColor: "red",
        borderBottomWidth: 2,
        borderColor: "#EFEFF4",
        flex: 1
    },
    eventsList: {
        backgroundColor: "blue",
        height: 100
    },
    todayView: {
        backgroundColor: "purple",
        flex: 1,
    }
});

function useDate(start: Moment) {
    let [date, setDate] = useState(start.unix());

    return {
        date: moment.unix(date),
        decrementDate: () => setDate(predate => moment.unix(predate).subtract(1, "day").unix()),
        incrementDate: () => setDate(predate => moment.unix(predate).add(1, "day").unix()),
        setToToday: () => setDate(moment().unix())
    };
}

export default function TodayView() {
    const calendar = useContext(CalendarContext);
    const eventKeyExtractor = (x: ICalendarEvent, i: number) => `${x.name}-${i}`;
    const todayEventRenderItem: ListRenderItem<ICalendarEvent> = ({ item }) => <TodayEvent event={item} />;

    let {
        date,
        decrementDate,
        incrementDate,
        setToToday
    } = useDate(moment(Date.now()));

    const schoolDay = calendar.schoolDay(date).get();

    const classes = useContext(ClassesContext);

    return (
        <View style={styles.todayView}>
            <MultilineHeader
                title={schoolDay === undefined ? "No School" : `${schoolDay.isHalf ? "Half " : ""}Day ${schoolDay.dayNumber}`}
                subtitle={date.format("dddd, MMMM Do")}
                leftButton={<HeaderLeftArrow onPress={decrementDate}/>}
                rightButton={<HeaderRightArrow onPress={incrementDate}/>}
                onClick={setToToday}
            />
            <ScrollView style={styles.classesView}>
                <ClassComponent
                    block={BlockColor.None}
                    start={moment("7:30 AM", "H:mm A")}
                    end={moment("8:29 AM", "H:mm A")}
                    name="this is green class"
                    room={420}
                    teacher="one"
                />
                <ClassComponent
                    block={BlockColor.Green}
                    start={moment("8:34 AM", "H:mm A")}
                    end={moment("9:33 AM", "H:mm A")}
                    name="this is green class"
                    room={420}
                    teacher="one"
                />
                <AdvisoryComponent {...classes.advisory} />
                <Text>
                    {schoolDay === undefined ? "No School" : JSON.stringify(Object.keys(Block).filter(x => isNaN(parseInt(x, 10))).map((x) => MapOfBlocksToColor[x as keyof typeof Block][SchoolDay[schoolDay.dayNumber as unknown as keyof typeof SchoolDay]]).map(x => BlockColor[x]), undefined, 4)}
                </Text>
            </ScrollView>
            {/* TODO: */}
            <Modal visible={false}>
                <FlatList
                    data={calendar.eventsOn(date).get()}
                    keyExtractor={eventKeyExtractor}
                    renderItem={todayEventRenderItem}
                    scrollEnabled={true}
                    style={styles.eventsList}
                />
            </Modal>
        </View>
    );
}