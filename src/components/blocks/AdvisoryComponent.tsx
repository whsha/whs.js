/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { View } from "react-native";
import { classesStyle } from "../../styles/layout/default";
import { IAdvisory } from "../../util/class/classes";
import { ITimes } from "../../util/class/extentions";
import { IStyled } from "./ClassComponent";
import ExtraInfo from "./parts/ExtraInfo";
import TitleTimes from "./parts/TitleTimes";

/** A component to display the advisory */
function AdvisoryComponent({ teacher, room, end, start, style = classesStyle.outerContainer }: IAdvisory & ITimes & IStyled) {
    return (
        <View style={style}>
            <TitleTimes name="Advisory" start={start} end={end} />
            <ExtraInfo room={room} teacher={teacher} />
        </View>
    );
}

export default memo(AdvisoryComponent);