/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { IAdvisedClass, IColored } from "@whsha/classes/v1/class/primitives";
import React from "react";
import { ClassViewInfoRow, LeftClassText, RightClassText } from "../../../styles/components/class";
import AccessibilityLabel from "./AccessibilityLabel";
import { ICoronaTimes } from "./TitleTimes";

/** The extra info section of the class component */
export default function ExtraInfo({ afternoon, teacher, block }: Pick<ICoronaTimes, "afternoon"> & IAdvisedClass & Partial<IColored>) {
    return (
        <ClassViewInfoRow>
            <LeftClassText numberOfLines={1}>
                {teacher.length === 0 ? "No Teacher" : teacher}
            </LeftClassText>
            {block !== undefined ? <AccessibilityLabel block={block} /> : null}
            <RightClassText numberOfLines={1}>
                Afternoon: {afternoon.start.format("h:mm")} - {afternoon.end.format("h:mm A")}
            </RightClassText>
        </ClassViewInfoRow>
    );
}