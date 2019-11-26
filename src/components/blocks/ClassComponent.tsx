/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { Text, View } from "react-native";
import { classComponentStyles } from "../../layout/default";
import { getDisplayColorForBlock } from "../../util/blocks/blockColor";
import { ITimes } from "../../util/class/extentions";
import { IAdvisedClass, IColored, INamed } from "../../util/class/primitives";

/** A component that will display a class */
function ClassComponent({ end, start, name, block, teacher, room }: ITimes & IAdvisedClass & IColored & INamed) {
    return (
        <View style={classComponentStyles.container}>
            <View style={classComponentStyles.dualView}>
                <Text style={[classComponentStyles.title, { color: getDisplayColorForBlock(block) }]}>{name.length === 0 ? "No Name" : name}</Text>
                <Text style={classComponentStyles.dim}>{start.format("h:mm")} - {end.format("h:mm A")}</Text>
            </View>
            <View style={[classComponentStyles.dualView, classComponentStyles.info]}>
                <Text style={[classComponentStyles.dim, classComponentStyles.teacher]} numberOfLines={1}>{teacher.length === 0 ? "No Teacher" : teacher}</Text>
                <Text style={[classComponentStyles.dim, classComponentStyles.room]} numberOfLines={1}>{room.length === 0 ? "No Room" : `${isNaN(parseInt(room, 10)) ? "" : "Room "}${room}`}</Text>
            </View>
        </View>
    );
}

export default memo(ClassComponent);