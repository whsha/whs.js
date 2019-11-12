/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { Text, View } from "react-native";
import { classComponentStyles } from "../../layout/default";
import { getDisplayColorForBlock } from "../../util/blocks/blockColor";
import { IClassBlock } from "../../util/class/display";

/** A component that will display a class */
export default function ClassComponent({block, end, name, room, start, teacher}: IClassBlock) {
    return (
        <View style={classComponentStyles.container}>
            <View style={classComponentStyles.dualView}>
                <Text style={[classComponentStyles.title, {color: getDisplayColorForBlock(block)}]}>{name}</Text>
                <Text style={classComponentStyles.dim}>{start.format("h:mm")} - {end.format("h:mm A")}</Text>
            </View>
            <View style={[classComponentStyles.dualView, classComponentStyles.info]}>
                <Text style={[classComponentStyles.dim, classComponentStyles.teacher]} numberOfLines={1}>{teacher}</Text>
                <Text style={[classComponentStyles.dim, classComponentStyles.room]} numberOfLines={1}>Room {room}</Text>
            </View>
        </View>
    );
}