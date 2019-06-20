/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import dayjs, { Dayjs } from "dayjs";
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
        backgroundColor: "#EFEFF4",
        flex: 1
    },
    eventsList: {
        backgroundColor: "blue",
        height: 100
    },
    todayView: {
        flex: 1
    }
});

function useDate(start: Dayjs) {
    let [date, setDate] = useState(start.unix());

    return {
        date: dayjs.unix(date),
        decrementDate: () => setDate(predate => dayjs.unix(predate).subtract(1, "day").unix()),
        incrementDate: () => setDate(predate => dayjs.unix(predate).add(1, "day").unix()),
        setToToday: () => setDate(dayjs().unix())
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
    } = useDate(dayjs(Date.now()));

    const schoolDay = calendar.schoolDay(date).get();

    const classes = useContext(ClassesContext);

    const colors = schoolDay === undefined ? [BlockColor.None].fill(BlockColor.None, 0, 7) : Object.keys(Block)
        .filter(x =>
            isNaN(parseInt(x, 10))
        ).map((x) =>
            MapOfBlocksToColor[x as keyof typeof Block]
                [SchoolDay[schoolDay.dayNumber as unknown as keyof typeof SchoolDay]]
        );

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
                    block={colors[0]}
                    start={dayjs("7:30 AM", "H:mm A")}
                    end={dayjs("8:29 AM", "H:mm A")}
                    name="Example"
                    room={0}
                    teacher="Mr. Example"
                />
                <ClassComponent
                    block={colors[1]}
                    start={dayjs("8:34 AM", "H:mm A")}
                    end={dayjs("9:33 AM", "H:mm A")}
                    name="Example"
                    room={100}
                    teacher="Mr. Example"
                />
                <AdvisoryComponent {...classes.advisory} />
                <ClassComponent
                    block={colors[2]}
                    start={dayjs("9:51 AM", "H:mm A")}
                    end={dayjs("10:50 AM", "H:mm A")}
                    name="Example"
                    room={100}
                    teacher="Mr. Example"
                />
                {/* FIXME: LUNCH BLOCK */}
                <ClassComponent
                    block={colors[3]}
                    // FIXME: LUNCH
                    start={dayjs("10:55 AM", "H:mm A")}
                    // FIXME: LUNCH
                    end={dayjs("12:22 AM", "H:mm A")}
                    name="Example"
                    room={100}
                    teacher="Mr. Example"
                />
                {/* END FIXME: */}
                <ClassComponent
                    block={colors[4]}
                    start={dayjs("12:27 AM", "H:mm A")}
                    end={dayjs("1:26 AM", "H:mm A")}
                    name="Example"
                    room={100}
                    teacher="Mr. Example"
                />
                <ClassComponent
                    block={colors[5]}
                    start={dayjs("1:31 AM", "H:mm A")}
                    end={dayjs("2:30 AM", "H:mm A")}
                    name="Example"
                    room={100}
                    teacher="Mr. Example"
                />
                <Text>
                    {schoolDay === undefined ? "No School" : JSON.stringify(colors, undefined, 4)}
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