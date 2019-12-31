/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { IDR, IMajor, IMinor } from "../../util/class/classes";
import { ITimes } from "../../util/class/extentions";
import { IColored } from "../../util/class/primitives";
import { isMajor, isMinor } from "../../util/class/type";
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
                    name="Directed Reaserch"
                    block={clazz.block}
                    room={clazz.room}
                    teacher={clazz.teacher}
                />
            );
        }
    }
}

export default memo(BlockComponent);