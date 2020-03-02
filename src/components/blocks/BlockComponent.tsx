/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "@whsha/classes/v2/block";
import { IClass } from "@whsha/classes/v2/class";
import React, { memo } from "react";
import ClassComponent from "./ClassComponent";
import FreeComponent from "./FreeComponent";
import { ITimes } from "./times";

/** The parameters to pass to a BlockComponent */
interface IDisplayBlock extends ITimes {
    /** The class to display */
    clazz?: IClass;
    /** The block color */
    block: BlockColor;
}

/** A component that will display a block of many variety */
function BlockComponent({ end, start, clazz, block }: IDisplayBlock) {
    if (clazz === undefined) {
        return <FreeComponent start={start} end={end} block={block} />;
    } else {
        return (
            <ClassComponent
                start={start}
                end={end}
                clazz={clazz}
            />
        );
    }
}

export default memo(BlockComponent);