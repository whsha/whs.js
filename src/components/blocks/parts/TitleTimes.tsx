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

/** The times for a corona schedule */
export interface ICoronaTimes {
    /** The morning meet time */
    morning: ITimes;
    /** The afternoon meet times */
    afternoon: ITimes;
}

/** The title and times section of the class */
export default function TitleTimes({ morning, name, block, showAccessibilityLabel = false }: Pick<ICoronaTimes, "morning"> & INamed & Partial<IColored> & Partial<IShowAccessibilityLabel>) {
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
                <TimesText>Morning: {morning.start.format("h:mm")} - {morning.end.format("h:mm A")}</TimesText>
            </TimesView>
        </ClassViewRow >
    );
}