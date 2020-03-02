/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "@whsha/classes/v2/block";
import { IClass } from "@whsha/classes/v2/class";
import { Lunch } from "@whsha/classes/v2/lunch";
import dayjs from "dayjs";
import { default as useCustomFormat } from "dayjs/plugin/customParseFormat";
import React, { memo } from "react";
import BlockComponent from "./BlockComponent";
import LunchComponent from "./LunchComponent";

dayjs.extend(useCustomFormat);

/** The parameters to pass to a LunchBlockComponent */
interface ILunchBlock {
    /** The class to display */
    lunch: Lunch;
    /** The class to display */
    clazz?: IClass;
    /** The block color */
    block: BlockColor;
    /** The timings for the classes */
    // times: {
    //     /** The first part of the lunch block */
    //     A: ITimes;
    //     /** The second part of the lunch block */
    //     B: ITimes;
    //     /** The third part of the lunch block */
    //     C: ITimes;
    // };
}

// FIXME: Correct timings
/** The timings for the lunch sections */
const LUNCH_TIMES = {
    A: {
        end: dayjs("11:22 AM", "h:mm A"),
        start: dayjs("10:55 AM", "h:mm A")
    },
    B: {
        end: dayjs("11:52 AM", "h:mm A"),
        start: dayjs("11:25 AM", "h:mm A")
    },
    C: {
        end: dayjs("12:22 PM", "h:mm A"),
        start: dayjs("11:55 AM", "h:mm A")
    }
};

/** A component that will display a block of many variety */
function LunchBlockComponent({ lunch, clazz, block }: ILunchBlock) {
    if (lunch === Lunch.First) {
        return (
            <>
                <LunchComponent start={LUNCH_TIMES.A.start} end={LUNCH_TIMES.A.end} />
                <BlockComponent start={LUNCH_TIMES.B.start} end={LUNCH_TIMES.C.end} block={block} clazz={clazz} />
            </>
        );
    } else if (lunch === Lunch.Second) {
        return (
            <>
                <BlockComponent start={LUNCH_TIMES.A.start} end={LUNCH_TIMES.A.end} block={block} clazz={clazz} />
                <LunchComponent start={LUNCH_TIMES.B.start} end={LUNCH_TIMES.B.end} />
                <BlockComponent start={LUNCH_TIMES.C.start} end={LUNCH_TIMES.C.end} block={block} clazz={clazz} />
            </>
        );
    } else if (lunch === Lunch.Third) {
        return (
            <>
                <BlockComponent start={LUNCH_TIMES.A.start} end={LUNCH_TIMES.B.end} block={block} clazz={clazz} />
                <LunchComponent start={LUNCH_TIMES.C.start} end={LUNCH_TIMES.C.end} />
            </>
        );
    } else {
        return (
            <BlockComponent start={LUNCH_TIMES.A.start} end={LUNCH_TIMES.C.end} block={block} clazz={clazz} />
        );
    }
}

export default memo(LunchBlockComponent);