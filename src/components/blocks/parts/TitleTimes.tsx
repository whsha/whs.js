/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "@whsha/classes/v2/block";
import React from "react";
import { ClassTitleText, ClassViewRow, TimesText, TimesView } from "../../../styles/components/class";
import { ITimes } from "../times";
import AccessibilityLabel from "./AccessibilityLabel";

/** Interface for props for TitleTimes */
interface ITitleTimes extends ITimes {
    /** Weather or not the accessibility label should be shown for this row */
    showAccessibilityLabel?: boolean;
    /** The name of the class */
    name: string;
    /** The block to display */
    block?: BlockColor;
}

/** The title and times section of the class */
export default function TitleTimes({ name, start, end, block, showAccessibilityLabel = false }: ITitleTimes) {
    return (
        <ClassViewRow>
            <ClassTitleText
                classColor={block}
                numberOfLines={1}
                ellipsizeMode="middle"
            >
                {name.length === 0 ? "No Name" : name}
            </ClassTitleText>
            {showAccessibilityLabel && block !== undefined ? <AccessibilityLabel block={block} /> : null}
            <TimesView doFlex={showAccessibilityLabel && block !== BlockColor.None}>
                <TimesText numberOfLines={1}>
                    {start.format("h:mm")} - {end.format("h:mm A")}
                </TimesText>
            </TimesView>
        </ClassViewRow >
    );
}