/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { classesStyle } from "../../styles/layout/default";
import { ITimes } from "../../util/class/extentions";
import { IAdvisedClass, IColored, INamed } from "../../util/class/primitives";
import ExtraInfo from "./parts/ExtraInfo";
import TitleTimes from "./parts/TitleTimes";

/** A component that has customizable styles */
export interface IStyled {
    /** The styles to apply */
    style?: StyleProp<ViewStyle>;
}

/** A component that will display a class */
function ClassComponent({ end, start, name, block, teacher, room, style = classesStyle.outerContainer }: ITimes & IAdvisedClass & IColored & INamed & IStyled) {
    return (
        <View style={style}>
            <TitleTimes block={block} start={start} end={end} name={name} />
            <ExtraInfo room={room} teacher={teacher} block={block} />
        </View>
    );
}

export default memo(ClassComponent);