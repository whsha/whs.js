/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { ClassContainerView } from "../../styles/components/view";
import { ITimes } from "../../util/class/extentions";
import { IColored } from "../../util/class/primitives";
import TitleTimes from "./parts/TitleTimes";

/** A component to display a free block */
function FreeComponent({ start, end, block }: ITimes & IColored) {
    return (
        <ClassContainerView>
            <TitleTimes start={start} end={end} name="Free" block={block} showAccessibilityLabel={true} />
        </ClassContainerView>
    );
}

export default memo(FreeComponent);