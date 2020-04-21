/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { IAdvisory } from "@whsha/classes/v1/class/classes";
import React, { memo } from "react";
import { ClassContainerView } from "../../styles/components/class";
import ExtraInfo from "./parts/ExtraInfo";
import TitleTimes, { ICoronaTimes } from "./parts/TitleTimes";

/** A component to display the advisory */
function AdvisoryComponent({ morning, afternoon, teacher, room }: ICoronaTimes & IAdvisory) {
    return (
        <ClassContainerView>
            <TitleTimes morning={morning} name="Advisory" />
            <ExtraInfo afternoon={afternoon} room={room} teacher={teacher} />
        </ClassContainerView>
    );
}

export default memo(AdvisoryComponent);