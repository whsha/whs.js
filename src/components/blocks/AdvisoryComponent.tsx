/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { IAdvisory } from "@whsha/classes/v1/class/classes";
import { ITimes } from "@whsha/classes/v1/class/extentions";
import React, { memo } from "react";
import { ClassContainerView } from "../../styles/components/class";
import ExtraInfo from "./parts/ExtraInfo";
import TitleTimes from "./parts/TitleTimes";

/** A component to display the advisory */
function AdvisoryComponent({ teacher, room, end, start }: IAdvisory & ITimes) {
    return (
        <ClassContainerView>
            <TitleTimes name="Advisory" start={start} end={end} />
            <ExtraInfo room={room} teacher={teacher} />
        </ClassContainerView>
    );
}

export default memo(AdvisoryComponent);