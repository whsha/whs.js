/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { Text, View } from "react-native";
import { classComponentStyles } from "../../layout/default";
import { getDisplayColorForBlock } from "../../util/blocks/blockColor";
import { ITimes } from "../../util/class/extentions";
import { IColored } from "../../util/class/primitives";

/** A component to display a free block */
function FreeComponent({ start, end, block }: ITimes & IColored) {
    return (
        <View style={classComponentStyles.container}>
            <View style={classComponentStyles.dualView}>
                <Text style={[classComponentStyles.title, { color: getDisplayColorForBlock(block) }]}>Free</Text>
                <Text style={classComponentStyles.dim}>{start.format("h:mm")} - {end.format("h:mm A")}</Text>
            </View>
        </View>
    );
}

export default memo(FreeComponent);