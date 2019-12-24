/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { View } from "react-native";
import { classesStyle } from "../../styles/layout/default";
import { ITimes } from "../../util/class/extentions";
import { IColored } from "../../util/class/primitives";
import TitleTimes from "./parts/TitleTimes";

/** A component to display a free block */
function FreeComponent({ start, end, block }: ITimes & IColored) {
    return (
        <View style={classesStyle.outerContainer}>
            <TitleTimes start={start} end={end} name="Free" block={block} showAccessibilityLabel={true} />
        </View>
    );
}

export default memo(FreeComponent);