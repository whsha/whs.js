/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { Text, View } from "react-native";
import { classComponentStyles } from "../../layout/default";
import { getDisplayColorForBlock } from "../../util/blocks/blockColor";
import { ITimes } from "../../util/class/extentions";
import { IAdvisedClass, IColored, INamed } from "../../util/class/primitives";
import usePreferences from "../../util/hooks/usePreferences";

/** A component that will display a class */
function ClassComponent({ end, start, name, block, teacher, room }: ITimes & IAdvisedClass & IColored & INamed) {
    const preferences = usePreferences();

    return (
        <View style={classComponentStyles.container}>
            <View style={classComponentStyles.multiView}>
                <Text style={[classComponentStyles.title, { color: getDisplayColorForBlock(block) }]}>{name.length === 0 ? "No Name" : name}</Text>
                <Text style={classComponentStyles.dim}>{start.format("h:mm")} - {end.format("h:mm A")}</Text>
            </View>
            <View style={[classComponentStyles.multiView, classComponentStyles.info]}>
                <Text style={[classComponentStyles.dim, classComponentStyles.multiLeft]} numberOfLines={1}>{teacher.length === 0 ? "No Teacher" : teacher}</Text>
                {preferences.accessability.labelColors ? <Text style={[classComponentStyles.dim, classComponentStyles.multiMiddle, classComponentStyles.colorblindColor, { color: getDisplayColorForBlock(block) }]}>{block}</Text> : null}
                <Text style={[classComponentStyles.dim, classComponentStyles.multiRight]} numberOfLines={1}>{room.length === 0 ? "No Room" : `${isNaN(parseInt(room, 10)) ? "" : "Room "}${room}`}</Text>
            </View>
        </View>
    );
}

export default memo(ClassComponent);