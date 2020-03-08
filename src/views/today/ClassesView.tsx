/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { Block } from "@whsha/classes/v2/block";
import { getBlockColorsForDay } from "@whsha/classes/v2/days";
import { SchoolDay } from "@whsha/classes/v2/schoolDay";
import dayjs from "dayjs";
import { default as useCustomFormat } from "dayjs/plugin/customParseFormat";
import React, { useMemo } from "react";
import AdvisoryComponent from "../../components/blocks/AdvisoryComponent";
import BlockComponent from "../../components/blocks/BlockComponent";
import LunchBlockComponent from "../../components/blocks/LunchBlockComponent";
import { SettingsScrollView } from "../../styles/components/settings";
import { ICalendarSchoolDay } from "../../util/calendar/types";
import useClasses from "../../util/hooks/useClasses";

dayjs.extend(useCustomFormat);

/** The props for the classes view */
interface IClassesViewProps {
    /** The school day to show */
    schoolDay: ICalendarSchoolDay;
}

/** The today view when there are classes that day */
export default function ClassesView({ schoolDay }: IClassesViewProps) {
    return (
        <SettingsScrollView>
            {/* FIXME: MCAS SHIDDLE */}
            {/* <Text>{JSON.stringify(schoolDay, undefined, 4)}</Text> */}
            {schoolDay.isHalf ? <HalfDayClasses day={schoolDay.dayNumber} /> : <FullDayClasses day={schoolDay.dayNumber}/>}
        </SettingsScrollView>
    );
}

/** The props for a class view */
interface IBlocksViewProps {
    /** The school day to display */
    day: SchoolDay;
}

/*
 *   Block A 7:30-8:29 AM
 *   Block B 8:34 –9:33 AM
 *   Advisory 9:38-9:46 AM
 *   Block C 9:51-10:50 AM
 *   Block D 10:55 AM–12:22 PM
 *   Block E 12:27-1:26 PM
 *   Block F 1:31-2:30 PM
 */

/** The display component for a full day */
function FullDayClasses({ day }: IBlocksViewProps) {
    const { saved } = useClasses();
    const colors = useMemo(() => getBlockColorsForDay(day), [day]);

    return (
        <>
            <BlockComponent
                block={colors[Block.A]}
                clazz={saved.getClassAtBlockOnDay(Block.A, day)}
                start={dayjs("7:30 AM", "h:mm A")}
                end={dayjs("8:29 AM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.B]}
                clazz={saved.getClassAtBlockOnDay(Block.B, day)}
                start={dayjs("8:34 AM", "h:mm A")}
                end={dayjs("9:33 AM", "h:mm A")}
            />
            <AdvisoryComponent
                {...saved.getAdvisoryForDay(day)}
                start={dayjs("9:38 AM", "h:mm A")}
                end={dayjs("9:46 AM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.C]}
                clazz={saved.getClassAtBlockOnDay(Block.C, day)}
                start={dayjs("9:51 AM", "h:mm A")}
                end={dayjs("10:50 AM", "h:mm A")}
            />
            <LunchBlockComponent
                block={colors[Block.D]}
                clazz={saved.getClassAtBlockOnDay(Block.D, day)}
                lunch={saved.getLunchForDay(day)}
            />
            <BlockComponent
                block={colors[Block.E]}
                clazz={saved.getClassAtBlockOnDay(Block.E, day)}
                start={dayjs("12:27 PM", "h:mm A")}
                end={dayjs("1:26 PM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.F]}
                clazz={saved.getClassAtBlockOnDay(Block.F, day)}
                start={dayjs("1:31 PM", "h:mm A")}
                end={dayjs("2:30 PM", "h:mm A")}
            />
        </>
    );
}

/*
 *   Early Release Schedule
 *   Lunch is not served - 11:30 AM Dissmissal
 *   Block A-7:30 - 8:00 AM
 *   Block B-8:05-8:35 AM
 *   Block C-8:40-9:10 AM
 *   Block D-9:15-9:45 AM
 *   Block E-9:50-10:20 AM
 *   Block F-10:25-10:55 AM
 *   Advisory-11:00-11:30 AM
 */

/** The display component for a half day */
function HalfDayClasses({ day}: IBlocksViewProps) {
    const { saved } = useClasses();
    const colors = useMemo(() => getBlockColorsForDay(day), [day]);

    return (
        <>
            <BlockComponent
                block={colors[Block.A]}
                clazz={saved.getClassAtBlockOnDay(Block.A, day)}
                start={dayjs("7:30 AM", "h:mm A")}
                end={dayjs("8:00 AM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.B]}
                clazz={saved.getClassAtBlockOnDay(Block.B, day)}
                start={dayjs("8:05 AM", "h:mm A")}
                end={dayjs("8:35 AM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.C]}
                clazz={saved.getClassAtBlockOnDay(Block.C, day)}
                start={dayjs("8:40 AM", "h:mm A")}
                end={dayjs("9:10 AM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.D]}
                clazz={saved.getClassAtBlockOnDay(Block.D, day)}
                start={dayjs("9:15 AM", "h:mm A")}
                end={dayjs("9:45 AM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.E]}
                clazz={saved.getClassAtBlockOnDay(Block.E, day)}
                start={dayjs("9:50 AM", "h:mm A")}
                end={dayjs("10:20 AM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.F]}
                clazz={saved.getClassAtBlockOnDay(Block.F, day)}
                start={dayjs("10:25 AM", "h:mm A")}
                end={dayjs("10:55 AM", "h:mm A")}
            />
            <AdvisoryComponent
                {...saved.getAdvisoryForDay(day)}
                start={dayjs("11:00 AM", "h:mm A")}
                end={dayjs("11:30 AM", "h:mm A")}
            />
        </>
    );
}