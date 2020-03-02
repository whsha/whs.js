/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "@whsha/classes/v2/block";
import React from "react";
import { ClassViewInfoRow, LeftClassText, RightClassText } from "../../../styles/components/class";
import AccessibilityLabel from "./AccessibilityLabel";

/** The props for the extra info component */
interface IExtraInfo {
    /** The block to display */
    block?: BlockColor;
    /** The teacher for the class */
    teacher: string;
    /** The room for the class */
    room: string;
}

/** The extra info section of the class component */
export default function ExtraInfo({ teacher, room, block }: IExtraInfo) {
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