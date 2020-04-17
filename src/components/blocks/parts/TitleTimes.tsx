/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "@whsha/classes/v1/blocks/blockColor";
import { IColored, INamed } from "@whsha/classes/v1/class/primitives";
import React from "react";
import { ClassTitleText, ClassViewRow, TimesView } from "../../../styles/components/class";
import AccessibilityLabel from "./AccessibilityLabel";

/** Interface for props for TitleTimes */
interface IShowAccessibilityLabel {
    /** Weather or not the accessibility label should be shown for this row */
    showAccessibilityLabel: boolean;
}

/** The title and times section of the class */
export default function TitleTimes({ name, block, showAccessibilityLabel = false }: INamed & Partial<IColored> & Partial<IShowAccessibilityLabel>) {
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
            <TimesView doFlex={showAccessibilityLabel && block !== BlockColor.None} />
        </ClassViewRow >
    );
}