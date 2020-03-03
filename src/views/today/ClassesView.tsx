/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { Block } from "@whsha/classes/v2/block";
import { IAdvisory, IClass } from "@whsha/classes/v2/class";
import { BlockColorsForDay, getBlockColorsForDay } from "@whsha/classes/v2/days";
import { Lunch } from "@whsha/classes/v2/lunch";
import { SchoolDay } from "@whsha/classes/v2/schoolDay";
import { PreparedClassesv2 } from "@whsha/classes/v2/store";
import dayjs from "dayjs";
import { default as useCustomFormat } from "dayjs/plugin/customParseFormat";
import React from "react";
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
    const { saved } = useClasses();

    const colors = getBlockColorsForDay(schoolDay.dayNumber);

    const properties: IBlocksViewProps = {
        advisory: saved.advisory,
        classes: saved.classes,
        colors,
        lunch: saved.lunches[schoolDay.dayNumber],
        prepared: saved.prepared[schoolDay.dayNumber]
    };

    return (
        <SettingsScrollView>
            {/* FIXME: MCAS SHIDDLE */}
            {/* <Text>{JSON.stringify(schoolDay, undefined, 4)}</Text> */}
            {/* <Text>{JSON.stringify(colors, undefined, 4)}</Text> */}
            {schoolDay.isHalf ? <HalfDayClasses {...properties} /> : <FullDayClasses {...properties} />}
        </SettingsScrollView>
    );
}

/** The props for a class view */
interface IBlocksViewProps {
    /** The advisory for the day */
    advisory: IAdvisory;
    /** The colors as backups */
    colors: BlockColorsForDay;
    /** The classes to display */
    prepared: PreparedClassesv2[SchoolDay];
    /** The classes saved */
    classes: Map<string, IClass>;
    /** The lunch fot the day */
    lunch: Lunch;
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
function FullDayClasses({ advisory, prepared, classes, colors, lunch }: IBlocksViewProps) {
    return (
        <>
            <BlockComponent
                block={colors[Block.A]}
                clazz={classes.get(prepared[Block.A] ?? "")}
                start={dayjs("7:30 AM", "h:mm A")}
                end={dayjs("8:29 AM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.B]}
                clazz={classes.get(prepared[Block.B] ?? "")}
                start={dayjs("8:34 AM", "h:mm A")}
                end={dayjs("9:33 AM", "h:mm A")}
            />
            <AdvisoryComponent
                {...advisory}
                start={dayjs("9:38 AM", "h:mm A")}
                end={dayjs("9:46 AM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.C]}
                clazz={classes.get(prepared[Block.C] ?? "")}
                start={dayjs("9:51 AM", "h:mm A")}
                end={dayjs("10:50 AM", "h:mm A")}
            />
            <LunchBlockComponent
                block={colors[Block.D]}
                clazz={classes.get(prepared[Block.D] ?? "")}
                lunch={lunch}
            />
            <BlockComponent
                block={colors[Block.E]}
                clazz={classes.get(prepared[Block.E] ?? "")}
                start={dayjs("12:27 PM", "h:mm A")}
                end={dayjs("1:26 PM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.F]}
                clazz={classes.get(prepared[Block.F] ?? "")}
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
function HalfDayClasses({ advisory, colors, classes, prepared }: IBlocksViewProps) {
    return (
        <>
            <BlockComponent
                block={colors[Block.A]}
                clazz={classes.get(prepared[Block.A] ?? "")}
                start={dayjs("7:30 AM", "h:mm A")}
                end={dayjs("8:00 AM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.B]}
                clazz={classes.get(prepared[Block.B] ?? "")}
                start={dayjs("8:05 AM", "h:mm A")}
                end={dayjs("8:35 AM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.C]}
                clazz={classes.get(prepared[Block.C] ?? "")}
                start={dayjs("8:40 AM", "h:mm A")}
                end={dayjs("9:10 AM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.D]}
                clazz={classes.get(prepared[Block.D] ?? "")}
                start={dayjs("9:15 AM", "h:mm A")}
                end={dayjs("9:45 AM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.E]}
                clazz={classes.get(prepared[Block.E] ?? "")}
                start={dayjs("9:50 AM", "h:mm A")}
                end={dayjs("10:20 AM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.F]}
                clazz={classes.get(prepared[Block.F] ?? "")}
                start={dayjs("10:25 AM", "h:mm A")}
                end={dayjs("10:55 AM", "h:mm A")}
            />
            <AdvisoryComponent
                {...advisory}
                start={dayjs("11:00 AM", "h:mm A")}
                end={dayjs("11:30 AM", "h:mm A")}
            />
        </>
    );
}