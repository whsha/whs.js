/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { ClassContainerView } from "../../styles/components/view";
import { IAdvisory } from "../../util/class/classes";
import { ITimes } from "../../util/class/extentions";
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