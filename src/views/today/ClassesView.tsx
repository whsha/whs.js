/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import dayjs from "dayjs";
import useCustomFormat from "dayjs/plugin/customParseFormat";
import React, { useContext } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import AdvisoryComponent from "../../components/blocks/AdvisoryComponent";
import ClassComponent from "../../components/blocks/ClassComponent";
import FreeComponent from "../../components/blocks/FreeComponent";
import { ClassesContext } from "../../contexts";
import { settingsViewStyles } from "../../layout/default";
import { Block } from "../../util/blocks/block";
import { BlockColor } from "../../util/blocks/blockColor";
import { ICalendarSchoolDay, SchoolDay } from "../../util/calendar/types";
import { IAdvisory } from "../../util/class/advisory";
import { getBlockColorsForDay } from "../../util/schoolDays";

dayjs.extend(useCustomFormat);

export default function ClassesView({ schoolDay }: { schoolDay: ICalendarSchoolDay }) {
    const classes = useContext(ClassesContext);

    const colors = Object.keys(Block)
        .filter(x =>
            isNaN(parseInt(x, 10))
        ).map((x) =>
            getBlockColorsForDay(SchoolDay[schoolDay.dayNumber] as keyof typeof SchoolDay)[x as keyof typeof Block]
        );

    // const { history } = useRouter();
    const navigateTo = (_to: string) => () => void 0; // history.push(to);

    return (
        <ScrollView style={settingsViewStyles.container}>
            {schoolDay.isHalf ? <HalfDayClasses advisory={classes.advisory} colors={colors} navigateTo={navigateTo} /> : <FullDayClasses advisory={classes.advisory} colors={colors} navigateTo={navigateTo} />}
        </ScrollView>
    );
}

interface IClassesViewProps {
    advisory: IAdvisory;
    colors: BlockColor[];
    navigateTo(path: string): () => void;
}

/*
Block A 7:30-8:29 AM
Block B 8:34 –9:33 AM
Advisory 9:38-9:46 AM
Block C 9:51-10:50 AM
Block D 10:55 AM–12:22 PM
Block E 12:27-1:26 PM
Block F 1:31-2:30 PM
*/
function FullDayClasses({ advisory, colors, navigateTo }: IClassesViewProps) {
    return (
        <>
            {/* FIXME: */}
            <FreeComponent
                block={colors[0]}
                start={dayjs("7:30 AM", "h:mm A")}
                end={dayjs("8:29 AM", "h:mm A")}
            />
            {/* TODO: */}
            <TouchableOpacity onPress={navigateTo("/settings/classes/0")}>
                <ClassComponent
                    block={colors[1]}
                    start={dayjs("8:34 AM", "h:mm A")}
                    end={dayjs("9:33 AM", "h:mm A")}
                    name="Example"
                    room="100"
                    teacher="Mr. Example"
                />
            </TouchableOpacity>
            <AdvisoryComponent
                {...advisory}
                start={dayjs("9:38 AM", "h:mm A")}
                end={dayjs("9:46 AM", "h:mm A")}
            />
            <ClassComponent
                block={colors[2]}
                start={dayjs("9:51 AM", "h:mm A")}
                end={dayjs("10:50 AM", "h:mm A")}
                name="Example"
                room="100"
                teacher="Mr. Example"
            />
            {/* FIXME: LUNCH BLOCK */}
            <ClassComponent
                block={colors[3]}
                // FIXME: LUNCH
                start={dayjs("10:55 AM", "h:mm A")}
                // FIXME: LUNCH
                end={dayjs("12:22 PM", "h:mm A")}
                name="Example"
                room="100"
                teacher="Mr. Example"
            />
            {/* END FIXME: */}
            <ClassComponent
                block={colors[4]}
                start={dayjs("12:27 PM", "h:mm A")}
                end={dayjs("1:26 PM", "h:mm A")}
                name="Example"
                room="100"
                teacher="Mr. Example"
            />
            <ClassComponent
                block={colors[5]}
                start={dayjs("1:31 PM", "h:mm A")}
                end={dayjs("2:30 PM", "h:mm A")}
                name="Example"
                room="100"
                teacher="Mr. Example"
            />
        </>
    );
}

/*
Early Release Schedule
Lunch is not served - 11:30 AM Dissmissal
Block A-7:30 - 8:00 AM
Block B-8:05-8:35 AM
Block C-8:40-9:10 AM
Block D-9:15-9:45 AM
Block E-9:50-10:20 AM
Block F-10:25-10:55 AM
Advisory-11:00-11:30 AM
*/
function HalfDayClasses({ advisory, colors, navigateTo }: IClassesViewProps) {
    return (
        <>
            {/* FIXME: */}
            <FreeComponent
                block={colors[0]}
                start={dayjs("7:30 AM", "h:mm A")}
                end={dayjs("8:00 AM", "h:mm A")}
            />
            {/* TODO: */}
            <TouchableOpacity onPress={navigateTo("/settings/classes/0")}>
                <ClassComponent
                    block={colors[1]}
                    start={dayjs("8:05 AM", "h:mm A")}
                    end={dayjs("8:35 AM", "h:mm A")}
                    name="Example"
                    room="100"
                    teacher="Mr. Example"
                />
            </TouchableOpacity>
            <ClassComponent
                block={colors[2]}
                start={dayjs("8:40 AM", "h:mm A")}
                end={dayjs("9:10 AM", "h:mm A")}
                name="Example"
                room="100"
                teacher="Mr. Example"
            />
            <ClassComponent
                block={colors[3]}
                start={dayjs("9:15 AM", "h:mm A")}
                end={dayjs("9:45 PM", "h:mm A")}
                name="Example"
                room="100"
                teacher="Mr. Example"
            />
            <ClassComponent
                block={colors[4]}
                start={dayjs("9:50 PM", "h:mm A")}
                end={dayjs("10:20 PM", "h:mm A")}
                name="Example"
                room="100"
                teacher="Mr. Example"
            />
            <ClassComponent
                block={colors[5]}
                start={dayjs("10:25 PM", "h:mm A")}
                end={dayjs("10:55 PM", "h:mm A")}
                name="Example"
                room="100"
                teacher="Mr. Example"
            />
            <AdvisoryComponent
                {...advisory}
                start={dayjs("11:00 PM", "h:mm A")}
                end={dayjs("11:30 PM", "h:mm A")}
            />
        </>
    );
}