/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { IDR, IMajor, IMinor } from "@whsha/classes/v1/class/classes";
import { ITimes } from "@whsha/classes/v1/class/extentions";
import { IColored } from "@whsha/classes/v1/class/primitives";
import { isMajor, isMinor } from "@whsha/classes/v1/class/type";
import React, { memo } from "react";
import ClassComponent from "./ClassComponent";
import FreeComponent from "./FreeComponent";

/** The parameters to pass to a BlockComponent */
interface IDisplayBlock extends IColored, ITimes {
    /** The class to display */
    clazz?: IMajor | IMinor | IDR;
}

/** A component that will display a block of many variety */
function BlockComponent({ end, start, clazz, block }: IDisplayBlock) {
    if (clazz === undefined) {
        return <FreeComponent start={start} end={end} block={block} />;
    } else {
        if (isMajor(clazz) || isMinor(clazz)) {
            return (
                <ClassComponent
                    start={start}
                    end={end}
                    name={clazz.name}
                    block={clazz.block}
                    room={clazz.room}
                    teacher={clazz.teacher}
                />
            );
        } else {
            return (
                <ClassComponent
                    start={start}
                    end={end}
                    name="Directed research"
                    block={clazz.block}
                    room={clazz.room}
                    teacher={clazz.teacher}
                />
            );
        }
    }
}

export default memo(BlockComponent);