/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import dayjs from "dayjs";
import useCustomFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { ScrollView } from "react-native";
import AdvisoryComponent from "../../components/blocks/AdvisoryComponent";
import BlockComponent from "../../components/blocks/BlockComponent";
import { PreparedClasses } from "../../stores/preparedClassesStore";
import { settingsViewStyles } from "../../styles/layout/default";
import { Block } from "../../util/blocks/block";
import { ICalendarSchoolDay, SchoolDay } from "../../util/calendar/types";
import { IAdvisory } from "../../util/class/classes";
import usePreparedClasses from "../../util/hooks/classes/usePreparedClasses";
import { BlockColorsForDay, getBlockColorsForDay } from "../../util/schoolDays";

dayjs.extend(useCustomFormat);

/** The props for the classes view */
interface IClassesViewProps {
    /** The school day to show */
    schoolDay: ICalendarSchoolDay;
}

/** The today view when there are classes that day */
export default function ClassesView({ schoolDay }: IClassesViewProps) {
    const preparedClasses = usePreparedClasses();

    const colors = getBlockColorsForDay(schoolDay.dayNumber);

    const classesView = (
        schoolDay.isHalf ?
            <HalfDayClasses advisory={preparedClasses.advisory} colors={colors} classes={preparedClasses.classes[schoolDay.dayNumber]} /> :
            <FullDayClasses advisory={preparedClasses.advisory} colors={colors} classes={preparedClasses.classes[schoolDay.dayNumber]} />
    );

    return (
        <ScrollView style={settingsViewStyles.container}>
            {classesView}
        </ScrollView>
    );
}

/** The props for a class view */
interface IBlocksViewProps {
    /** The advisory for the day */
    advisory: IAdvisory;
    /** The colors as backups */
    colors: BlockColorsForDay;
    /** The classes to display */
    classes: PreparedClasses[SchoolDay];
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
/** The display component for a full day */
function FullDayClasses({ advisory, classes, colors }: IBlocksViewProps) {
    return (
        <>
            <BlockComponent
                block={colors[Block.A]}
                clazz={classes[Block.A]}
                start={dayjs("7:30 AM", "h:mm A")}
                end={dayjs("8:29 AM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.B]}
                clazz={classes[Block.B]}
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
                clazz={classes[Block.C]}
                start={dayjs("9:51 AM", "h:mm A")}
                end={dayjs("10:50 AM", "h:mm A")}
            />
            {/* FIXME: LUNCH BLOCK */}
            <BlockComponent
                block={colors[Block.D]}
                clazz={classes[Block.D]}
                // FIXME: LUNCH
                start={dayjs("10:55 AM", "h:mm A")}
                // FIXME: LUNCH
                end={dayjs("12:22 PM", "h:mm A")}
            />
            {/* END FIXME: */}
            <BlockComponent
                block={colors[Block.E]}
                clazz={classes[Block.E]}
                start={dayjs("12:27 PM", "h:mm A")}
                end={dayjs("1:26 PM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.F]}
                clazz={classes[Block.F]}
                start={dayjs("1:31 PM", "h:mm A")}
                end={dayjs("2:30 PM", "h:mm A")}
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
/** The display component for a half day */
function HalfDayClasses({ advisory, colors, classes }: IBlocksViewProps) {
    return (
        <>
            <BlockComponent
                block={colors[Block.A]}
                clazz={classes[Block.A]}
                start={dayjs("7:30 AM", "h:mm A")}
                end={dayjs("8:00 AM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.B]}
                clazz={classes[Block.B]}
                start={dayjs("8:05 AM", "h:mm A")}
                end={dayjs("8:35 AM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.C]}
                clazz={classes[Block.C]}
                start={dayjs("8:40 AM", "h:mm A")}
                end={dayjs("9:10 AM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.D]}
                clazz={classes[Block.D]}
                start={dayjs("9:15 AM", "h:mm A")}
                end={dayjs("9:45 PM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.E]}
                clazz={classes[Block.E]}
                start={dayjs("9:50 PM", "h:mm A")}
                end={dayjs("10:20 PM", "h:mm A")}
            />
            <BlockComponent
                block={colors[Block.F]}
                clazz={classes[Block.F]}
                start={dayjs("10:25 PM", "h:mm A")}
                end={dayjs("10:55 PM", "h:mm A")}
            />
            <AdvisoryComponent
                {...advisory}
                start={dayjs("11:00 PM", "h:mm A")}
                end={dayjs("11:30 PM", "h:mm A")}
            />
        </>
    );
}