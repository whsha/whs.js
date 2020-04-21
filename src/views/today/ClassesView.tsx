/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { IDR, IMajor, IMinor } from "@whsha/classes/v1/class/classes";
import dayjs, { Dayjs } from "dayjs";
import useCustomFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { Text } from "react-native";
import BlockComponent from "../../components/blocks/BlockComponent";
import { SettingsScrollView } from "../../styles/components/settings";
import { BlockColorsForDay, CoronaBlock, DayOfWeek, getBlockColorsForDay } from "../../util/coronaDay";
import useClasses from "../../util/hooks/classes/useClasses";

dayjs.extend(useCustomFormat);

/** The props for the classes view */
interface IClassesViewProps {
    /** The school day to show */
    schoolDay: Dayjs;
}

/** The today view when there are classes that day */
export default function ClassesView({ schoolDay }: IClassesViewProps) {
    const classes = useClasses();

    const colors = getBlockColorsForDay(schoolDay.format("dddd") as DayOfWeek);

    const compClasses = {
        [CoronaBlock.First]: Array.from(classes.saved.majors.values()).find(x => x.block === colors[CoronaBlock.First]),
        [CoronaBlock.Second]: Array.from(classes.saved.majors.values()).find(x => x.block === colors[CoronaBlock.Second]),
        [CoronaBlock.Third]: Array.from(classes.saved.majors.values()).find(x => x.block === colors[CoronaBlock.Third])
    };

    const properties: IBlocksViewProps = {
        classes: compClasses,
        colors,
    };

    return (
        <SettingsScrollView>
            <FullDayClasses {...properties} />
            <Text style={{ textAlign: "center", paddingTop: 30, paddingHorizontal: 20, fontWeight: "bold", lineHeight: 20 }}>
                DISCLAIMER:
            </Text>
            <Text style={{ textAlign: "center", paddingBottom: 30, paddingHorizontal: 20, fontSize: 13, fontWeight: "700", lineHeight: 20 }}>
                The above classes are only your major classes.
                For 3/cycle classes, check with online resources for the more specific schedule.
                The times listed above, are the possible times that the classes could meet.
                <Text style={{ fontWeight: "900" }}> Please check with your canvas calendar for the correct times.</Text>
            </Text>
        </SettingsScrollView>
    );
}

/** The props for a class view */
interface IBlocksViewProps {
    /** The colors as backups */
    colors: BlockColorsForDay;
    /** The classes to display */
    classes: { [B in CoronaBlock]?: IMajor | IMinor | IDR };
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
function FullDayClasses({ classes, colors }: IBlocksViewProps) {
    return (
        <>
            <BlockComponent
                block={colors[CoronaBlock.First]}
                clazz={classes[CoronaBlock.First]}
                morning={{ start: dayjs("9:00 AM", "h:mm A"), end: dayjs("9:50 AM", "h:mm A") }}
                afternoon={{ start: dayjs("12:30 PM", "h:mm A"), end: dayjs("1:20 PM", "h:mm A") }}
            />
            <BlockComponent
                block={colors[CoronaBlock.Second]}
                clazz={classes[CoronaBlock.Second]}
                morning={{ start: dayjs("10:00 AM", "h:mm A"), end: dayjs("10:50 AM", "h:mm A") }}
                afternoon={{ start: dayjs("1:30 PM", "h:mm A"), end: dayjs("2:20 PM", "h:mm A") }}
            />
            <BlockComponent
                block={colors[CoronaBlock.Third]}
                clazz={classes[CoronaBlock.Third]}
                morning={{ start: dayjs("11:00 AM", "h:mm A"), end: dayjs("11:50 AM", "h:mm A") }}
                afternoon={{ start: dayjs("2:30 PM", "h:mm A"), end: dayjs("3:20 PM", "h:mm A") }}
            />
        </>
    );
}
