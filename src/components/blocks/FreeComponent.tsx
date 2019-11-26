/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { Text, View } from "react-native";
import { classComponentStyles } from "../../layout/default";
import { LabelPosition } from "../../stores/preferencesStore";
import { getDisplayColorForBlock } from "../../util/blocks/blockColor";
import { ITimes } from "../../util/class/extentions";
import { IColored } from "../../util/class/primitives";
import usePreferences from "../../util/hooks/usePreferences";

/** A component to display a free block */
function FreeComponent({ start, end, block }: ITimes & IColored) {
    const preferences = usePreferences();

    const posStyle = preferences.accessibility.labelPosition === LabelPosition.Left ?
        classComponentStyles.multiLeft : preferences.accessibility.labelPosition === LabelPosition.Center ?
        classComponentStyles.multiMiddle : classComponentStyles.multiRight;

    return (
        <View style={classComponentStyles.container}>
            <View style={classComponentStyles.multiView}>
                <Text style={[classComponentStyles.title, { color: getDisplayColorForBlock(block) }]}>Free</Text>
                <Text style={classComponentStyles.dim}>{start.format("h:mm")} - {end.format("h:mm A")}</Text>
            </View>
            <View style={[classComponentStyles.multiView, classComponentStyles.info]}>
                {preferences.accessibility.labelColors ? <Text style={[classComponentStyles.dim, posStyle, classComponentStyles.colorblindColor, preferences.accessibility.matchLabelColors ? { color: getDisplayColorForBlock(block) } : undefined]}>{block}</Text> : null}
            </View>
        </View>
    );
}

export default memo(FreeComponent);