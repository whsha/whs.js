/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { Text, View } from "react-native";
import { classComponentStyles } from "../../layout/default";
import { LabelPosition } from "../../stores/preferencesStore";
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
                <View style={[{ flexDirection: "row" }, classComponentStyles.multiLeft]}>
                    <Text style={[classComponentStyles.dim, classComponentStyles.multiLeft]} numberOfLines={1}>{teacher.length === 0 ? "No Teacher" : teacher}</Text>
                    {preferences.accessibility.labelColors && preferences.accessibility.labelPosition === LabelPosition.Left ? <Text style={[classComponentStyles.dim, classComponentStyles.multiLeft, classComponentStyles.colorblindColor, preferences.accessibility.matchLabelColors ? { color: getDisplayColorForBlock(block) } : undefined]}>{block}</Text> : null}
                </View>
                {preferences.accessibility.labelColors && preferences.accessibility.labelPosition === LabelPosition.Center ? <Text style={[classComponentStyles.dim, classComponentStyles.multiMiddle, classComponentStyles.colorblindColor, preferences.accessibility.matchLabelColors ? { color: getDisplayColorForBlock(block) } : undefined]}>{block}</Text> : null}
                <View style={[{ flexDirection: "row" }, classComponentStyles.multiRight]}>
                    {preferences.accessibility.labelColors && preferences.accessibility.labelPosition === LabelPosition.Right ? <Text style={[classComponentStyles.dim, classComponentStyles.multiRight, classComponentStyles.colorblindColor, preferences.accessibility.matchLabelColors ? { color: getDisplayColorForBlock(block) } : undefined]}>{block}</Text> : null}
                    <Text style={[classComponentStyles.dim, classComponentStyles.multiRight]} numberOfLines={1}>{room.length === 0 ? "No Room" : `${isNaN(parseInt(room, 10)) ? "" : "Room "}${room}`}</Text>
                </View>
            </View>
        </View>
    );
}

export default memo(ClassComponent);