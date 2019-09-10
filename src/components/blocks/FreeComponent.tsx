/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { Text, View } from "react-native";
import { classComponentStyles } from "../../themes/light";
import { getDisplayColorForBlock } from "../../util/blocks/blockColor";
import { IFreeBlock } from "../../util/class/display";

/** A component to display a free block */
export default function FreeComponent({start, end, block}: IFreeBlock) {
    return (
        <View style={classComponentStyles.container}>
            <View style={classComponentStyles.dualView}>
                <Text style={[classComponentStyles.title, {color: getDisplayColorForBlock(block)}]}>Free</Text>
                <Text style={classComponentStyles.dim}>{start.format("h:mm")} - {end.format("h:mm A")}</Text>
            </View>
        </View>
    );
}