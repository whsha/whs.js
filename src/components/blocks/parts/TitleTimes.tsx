/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "@whsha/classes/v1/blocks/blockColor";
import { ITimes } from "@whsha/classes/v1/class/extentions";
import { IColored, INamed } from "@whsha/classes/v1/class/primitives";
import React from "react";
import { ClassTitleText, ClassViewRow, TimesText, TimesView } from "../../../styles/components/class";
import AccessibilityLabel from "./AccessibilityLabel";

/** Interface for props for TitleTimes */
interface IShowAccessibilityLabel {
    /** Weather or not the accessibility label should be shown for this row */
    showAccessibilityLabel: boolean;
}

/** The title and times section of the class */
export default function TitleTimes({ name, start, end, block, showAccessibilityLabel = false }: ITimes & INamed & Partial<IColored> & Partial<IShowAccessibilityLabel>) {
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
            <TimesView flex={showAccessibilityLabel && block !== BlockColor.None}>
                <TimesText numberOfLines={1}>
                    {start.format("h:mm")} - {end.format("h:mm A")}
                </TimesText>
            </TimesView>
        </ClassViewRow >
    );
}