/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { IDR, IMajor, IMinor } from "@whsha/classes/v1/class/classes";
import { Lunch } from "@whsha/classes/v1/class/lunch";
import { IColored } from "@whsha/classes/v1/class/primitives";
import React, { memo } from "react";
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
                <LunchComponent />
                <BlockComponent block={block} clazz={clazz} />
            </>
        );
    } else if (lunch === Lunch.Second) {
        return (
            <>
                <BlockComponent block={block} clazz={clazz} />
                <LunchComponent />
                <BlockComponent block={block} clazz={clazz} />
            </>
        );
    } else if (lunch === Lunch.Third) {
        return (
            <>
                <BlockComponent block={block} clazz={clazz} />
                <LunchComponent />
            </>
        );
    } else {
        return (
            <BlockComponent block={block} clazz={clazz} />
        );
    }
}

export default memo(LunchBlockComponent);