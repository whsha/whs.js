/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { IColored } from "@whsha/classes/v1/class/primitives";
import React, { memo } from "react";
import { ClassContainerView } from "../../styles/components/class";
import ExtraInfo from "./parts/ExtraInfo";
import TitleTimes, { ICoronaTimes } from "./parts/TitleTimes";

/** A component to display a free block */
function FreeComponent({ morning, afternoon, block }: ICoronaTimes & IColored) {
    return (
        <ClassContainerView>
            <TitleTimes morning={morning} name="Possibly Free" block={block} showAccessibilityLabel={true} />
            <ExtraInfo afternoon={afternoon} room="" teacher="" />
        </ClassContainerView>
    );
}

export default memo(FreeComponent);