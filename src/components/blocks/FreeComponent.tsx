/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { IColored } from "@whsha/classes/v1/class/primitives";
import React, { memo } from "react";
import { ClassContainerView } from "../../styles/components/class";
import TitleTimes from "./parts/TitleTimes";

/** A component to display a free block */
function FreeComponent({ block }: IColored) {
    return (
        <ClassContainerView>
            <TitleTimes name="Possibly Free" block={block} showAccessibilityLabel={true} />
        </ClassContainerView>
    );
}

export default memo(FreeComponent);