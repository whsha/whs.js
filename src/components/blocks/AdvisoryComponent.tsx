/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { Text, View } from "react-native";
import { classComponentStyles } from "../../styles/layout/default";
import { IAdvisory } from "../../util/class/classes";
import { ITimes } from "../../util/class/extentions";

/** A component to display the advisory */
function AdvisoryComponent({teacher, room, end, start}: IAdvisory & ITimes) {
    return (
        <View style={classComponentStyles.container}>
            <View style={classComponentStyles.multiView}>
                <Text style={classComponentStyles.title}>Advisory</Text>
                <Text style={classComponentStyles.dim}>{start.format("h:mm")} - {end.format("h:mm A")}</Text>
            </View>
            <View style={[classComponentStyles.multiView, classComponentStyles.info]}>
                <Text style={[classComponentStyles.dim, classComponentStyles.multiLeft]} numberOfLines={1}>{teacher.length === 0 ? "No Advisor" : teacher}</Text>
                <Text style={[classComponentStyles.dim, classComponentStyles.multiRight]} numberOfLines={1}>{room.length === 0 ? "No Room" : `Room ${room}`}</Text>
            </View>
        </View>
    );
}

export default memo(AdvisoryComponent);