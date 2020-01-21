/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { ITimes } from "@whsha/classes/v1/class/extentions";
import { IAdvisedClass, IColored, INamed } from "@whsha/classes/v1/class/primitives";
import React, { memo } from "react";
import { ClassContainerView } from "../../styles/components/class";
import ExtraInfo from "./parts/ExtraInfo";
import TitleTimes from "./parts/TitleTimes";

/** A component that will display a class */
function ClassComponent({ end, start, name, block, teacher, room }: ITimes & IAdvisedClass & IColored & INamed) {
    return (
        <ClassContainerView>
            <TitleTimes block={block} start={start} end={end} name={name} />
            <ExtraInfo room={room} teacher={teacher} block={block} />
        </ClassContainerView>
    );
}

export default memo(ClassComponent);
