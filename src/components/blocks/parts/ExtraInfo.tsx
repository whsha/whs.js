/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { IAdvisedClass, IColored } from "@whsha/classes/v1/class/primitives";
import React from "react";
import { ClassViewInfoRow, LeftClassText, RightClassText } from "../../../styles/components/class";
import AccessibilityLabel from "./AccessibilityLabel";

/** The extra info section of the class component */
export default function ExtraInfo({ teacher, room, block }: IAdvisedClass & Partial<IColored>) {
    return (
        <ClassViewInfoRow>
            <LeftClassText numberOfLines={1}>
                {teacher.length === 0 ? "No Teacher" : teacher}
            </LeftClassText>
            {block !== undefined ? <AccessibilityLabel block={block} /> : null}
            <RightClassText numberOfLines={1}>
                {room.length === 0 ? "No Room" : `${isNaN(parseInt(room, 10)) ? "" : "Room "}${room}`}
            </RightClassText>
        </ClassViewInfoRow>
    );
}