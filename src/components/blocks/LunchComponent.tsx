/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { View } from "react-native";
import { classesStyle } from "../../styles/layout/default";
import { ITimes } from "../../util/class/extentions";
import TitleTimes from "./parts/TitleTimes";

/** A component to display a lunch block */
function LunchComponent({ start, end }: ITimes) {
    return (
        <View style={classesStyle.outerContainer}>
            <TitleTimes start={start} end={end} name="Lunch" />
        </View>
    );
}

export default memo(LunchComponent);