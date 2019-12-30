/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { Text, View } from "react-native";
import { classesStyle } from "../../../styles/layout/default";
import { BlockColor, getDisplayColorForBlock } from "../../../util/blocks/blockColor";
import { ITimes } from "../../../util/class/extentions";
import { IColored, INamed } from "../../../util/class/primitives";
import AccessibilityLabel from "./AccessibilityLabel";

/** Interface for props for TitleTimes */
interface IShowAccessibilityLabel {
    /** Weather or not the accessibility label should be shown for this row */
    showAccessibilityLabel: boolean;
}

/** The title and times section of the class */
export default function TitleTimes({ name, start, end, block, showAccessibilityLabel = false }: ITimes & INamed & Partial<IColored> & Partial<IShowAccessibilityLabel>) {
    return (
        <View style={classesStyle.row}>
            <Text
                style={[classesStyle.title, classesStyle.left, { color: getDisplayColorForBlock(block) }]}
                numberOfLines={1}
                ellipsizeMode={"middle"}
            >
                {name.length === 0 ? "No Name" : name}
            </Text>
            {showAccessibilityLabel && block !== undefined ? <AccessibilityLabel block={block} /> : null}
            <View style={[classesStyle.container, showAccessibilityLabel && block !== BlockColor.None ? undefined : classesStyle.times, classesStyle.endstop]}>
                <Text
                    style={[classesStyle.dim, classesStyle.right, classesStyle.noFlex]}
                    numberOfLines={1}
                >
                    {start.format("h:mm")} - {end.format("h:mm A")}
                </Text>
            </View>
        </View>
    );
}