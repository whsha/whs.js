/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { Text, View } from "react-native";
import { classesStyle } from "../../../styles/layout/default";
import { IAdvisedClass, IColored } from "../../../util/class/primitives";
import AccessibilityLabel from "./AccessibilityLabel";

/** The extra info section of the class component */
export default function ExtraInfo({ teacher, room, block }: IAdvisedClass & Partial<IColored>) {
    return (
        <View style={[classesStyle.row, classesStyle.info]}>
            <Text
                style={[classesStyle.dim, classesStyle.left]}
                numberOfLines={1}
            >
                {teacher.length === 0 ? "No Teacher" : teacher}
            </Text>
            {block !== undefined ? <AccessibilityLabel block={block} /> : null}
            <Text
                style={[classesStyle.dim, classesStyle.right]}
                numberOfLines={1}
            >
                {room.length === 0 ? "No Room" : `${isNaN(parseInt(room, 10)) ? "" : "Room "}${room}`}
            </Text>
        </View>
    );
}