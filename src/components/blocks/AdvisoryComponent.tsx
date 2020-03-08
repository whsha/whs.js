/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { IAdvisory } from "@whsha/classes/v2/class";
import React, { memo } from "react";
import { ClassContainerView } from "../../styles/components/class";
import ExtraInfo from "./parts/ExtraInfo";
import TitleTimes from "./parts/TitleTimes";
import { ITimes } from "./times";

/** A component to display the advisory */
function AdvisoryComponent({ advisor, room, end, start }: Omit<IAdvisory, "uuid" | "meets"> & ITimes) {
    return (
        <ClassContainerView>
            <TitleTimes name="Advisory" start={start} end={end} />
            <ExtraInfo room={room} teacher={advisor} />
        </ClassContainerView>
    );
}

export default memo(AdvisoryComponent);