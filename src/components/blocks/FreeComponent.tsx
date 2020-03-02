/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "@whsha/classes/v2/block";
import React, { memo } from "react";
import { ClassContainerView } from "../../styles/components/class";
import TitleTimes from "./parts/TitleTimes";
import { ITimes } from "./times";

/** The props for a free component */
interface IDisplayFree extends ITimes {
    /** The block color to display */
    block: BlockColor;
}

/** A component to display a free block */
function FreeComponent({ start, end, block }: IDisplayFree) {
    return (
        <ClassContainerView>
            <TitleTimes start={start} end={end} name="Free" block={block} showAccessibilityLabel={true} />
        </ClassContainerView>
    );
}

export default memo(FreeComponent);