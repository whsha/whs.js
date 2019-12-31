/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { IDR, IMajor, IMinor } from "../../util/class/classes";
import { Lunch, LUNCH_TIMES as times } from "../../util/class/lunch";
import { IColored } from "../../util/class/primitives";
import BlockComponent from "./BlockComponent";
import LunchComponent from "./LunchComponent";

/** The parameters to pass to a LunchBlockComponent */
interface ILunchBlock extends IColored {
    /** The class to display */
    lunch: Lunch;
    /** The class to display */
    clazz?: IMajor | IMinor | IDR;
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

/** A component that will display a block of many variety */
function LunchBlockComponent({ lunch, clazz, block }: ILunchBlock) {
    if (lunch === Lunch.First) {
        return (
            <>
                <LunchComponent start={times.A.start} end={times.A.end} />
                <BlockComponent start={times.B.start} end={times.C.end} block={block} clazz={clazz} />
            </>
        );
    } else if (lunch === Lunch.Second) {
        return (
            <>
                <BlockComponent start={times.A.start} end={times.A.end} block={block} clazz={clazz} />
                <LunchComponent start={times.B.start} end={times.B.end} />
                <BlockComponent start={times.C.start} end={times.C.end} block={block} clazz={clazz} />
            </>
        );
    } else if (lunch === Lunch.Third) {
        return (
            <>
                <BlockComponent start={times.A.start} end={times.B.end} block={block} clazz={clazz} />
                <LunchComponent start={times.C.start} end={times.C.end} />
            </>
        );
    } else {
        return (
            <BlockComponent start={times.A.start} end={times.C.end} block={block} clazz={clazz} />
        );
    }
}

export default memo(LunchBlockComponent);