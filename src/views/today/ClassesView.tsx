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
            <Text>DISCLAIMER: The above classes are only your major classes,</Text>
            <Text>For 3/cycle classes, check with online resources for the more specific schedule.</Text>
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
            />
            <BlockComponent
                block={colors[CoronaBlock.Second]}
                clazz={classes[CoronaBlock.Second]}
            />
            <BlockComponent
                block={colors[CoronaBlock.Third]}
                clazz={classes[CoronaBlock.Third]}
            />
        </>
    );
}
