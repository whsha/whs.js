/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { IAdvisedClass, IColored, INamed } from "@whsha/classes/v1/class/primitives";
import React, { memo } from "react";
import { ClassContainerView } from "../../styles/components/class";
import ExtraInfo from "./parts/ExtraInfo";
import TitleTimes, { ICoronaTimes } from "./parts/TitleTimes";

/** A component that will display a class */
function ClassComponent({ morning, afternoon, name, block, teacher, room }: ICoronaTimes & IAdvisedClass & IColored & INamed) {
    return (
        <ClassContainerView>
            <TitleTimes morning={morning} block={block} name={name} />
            <ExtraInfo afternoon={afternoon} room={room} teacher={teacher} block={block} />
        </ClassContainerView>
    );
}

export default memo(ClassComponent);
