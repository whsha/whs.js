/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { ClassContainerView } from "../../styles/components/class";
import TitleTimes from "./parts/TitleTimes";

/** A component to display a lunch block */
function LunchComponent() {
    return (
        <ClassContainerView>
            <TitleTimes name="Lunch" />
        </ClassContainerView>
    );
}

export default memo(LunchComponent);