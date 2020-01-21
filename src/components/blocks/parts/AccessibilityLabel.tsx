/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "@whsha/classes/v1/blocks/blockColor";
import { IColored } from "@whsha/classes/v1/class/primitives";
import { useObserver } from "mobx-react-lite";
import React from "react";
import { ColorblindLabelText, MiddleClassView } from "../../../styles/components/class";
import usePreferences from "../../../util/hooks/usePreferences";

/** The accessability label for classes */
export default function AccessibilityLabel({ block }: IColored) {
    const preferences = usePreferences();

    return useObserver(() => {
        if (preferences.accessibility.labelColors && block !== BlockColor.None) {
            return (
                <MiddleClassView>
                    <ColorblindLabelText
                        classColor={preferences.accessibility.matchLabelColors ? block : undefined}
                        numberOfLines={1}
                    >
                        {block}
                    </ColorblindLabelText>
                </MiddleClassView>
            );
        } else {
            return null;
        }
    });
}