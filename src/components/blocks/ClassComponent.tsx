/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { Text, View } from "react-native";
import { classComponentStyles } from "../../layout/default";
import { getDisplayColorForBlock } from "../../util/blocks/blockColor";
import { IClassBlock } from "../../util/class/display";

/** A component that will display a class */
function ClassComponent({block, end, name, room, start, teacher}: IClassBlock) {
    return (
        <View style={classComponentStyles.container}>
            <View style={classComponentStyles.dualView}>
                <Text style={[classComponentStyles.title, {color: getDisplayColorForBlock(block)}]}>{name.length === 0 ? "No Name" : name}</Text>
                <Text style={classComponentStyles.dim}>{start.format("h:mm")} - {end.format("h:mm A")}</Text>
            </View>
            <View style={[classComponentStyles.dualView, classComponentStyles.info]}>
                <Text style={[classComponentStyles.dim, classComponentStyles.teacher]} numberOfLines={1}>{teacher.length === 0 ? "No Teacher" : teacher}</Text>
                <Text style={[classComponentStyles.dim, classComponentStyles.room]} numberOfLines={1}>{room.length === 0 ? "No Room" : `Room ${room}`}</Text>
            </View>
        </View>
    );
}

export default memo(ClassComponent);