/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { useObserver } from "mobx-react-lite";
import React from "react";
import { Text, View } from "react-native";
import { classesStyle } from "../../../styles/layout/default";
import { BlockColor, getDisplayColorForBlock } from "../../../util/blocks/blockColor";
import { IColored } from "../../../util/class/primitives";
import usePreferences from "../../../util/hooks/usePreferences";

/** The accessability label for classes */
export default function AccessibilityLabel({ block }: IColored) {
    const preferences = usePreferences();

    if (useObserver(() => preferences.accessibility.labelColors) && block !== BlockColor.None) {
        const colorStyle = useObserver(() => preferences.accessibility.matchLabelColors ? { color: getDisplayColorForBlock(block) } : undefined);

        return (
            <View style={[classesStyle.middle, classesStyle.container]}>
                <Text
                    style={[classesStyle.dim, classesStyle.middle, classesStyle.colorblindColor, colorStyle]}
                    numberOfLines={1}
                >
                    {block}
                </Text>
            </View>
        );
    } else {
        return null;
    }
}