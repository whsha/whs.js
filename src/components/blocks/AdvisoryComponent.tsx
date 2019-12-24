/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { View } from "react-native";
import { classesStyle } from "../../styles/layout/default";
import { IAdvisory } from "../../util/class/classes";
import { ITimes } from "../../util/class/extentions";
import ExtraInfo from "./parts/ExtraInfo";
import TitleTimes from "./parts/TitleTimes";

/** A component to display the advisory */
function AdvisoryComponent({ teacher, room, end, start }: IAdvisory & ITimes) {
    return (
        <View style={classesStyle.outerContainer}>
            <TitleTimes name="Advisory" start={start} end={end} />
            <ExtraInfo room={room} teacher={teacher} />
        </View>
    );
}

export default memo(AdvisoryComponent);