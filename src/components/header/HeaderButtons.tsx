/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { HeaderArrowButtonTouchable, HeaderButtonText, HeaderDoneButtonText } from "../../styles/components/header";
import { IonIconButton } from "../../styles/components/ionicons";

/** The props for a disableable header button */
interface IDisableable {
    /** If the button is disabled or not */
    disabled?: boolean;
}

/** The props for a pressable header button */
interface IPressableButton {
    /** The callback for when the button is pressed */
    onPress(): void;
}

/** A save header button */
export const HeaderSaveButton = memo(({ onPress, disabled }: IDisableable & IPressableButton) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <HeaderDoneButtonText disabled={disabled}>Save</HeaderDoneButtonText>
        </TouchableOpacity>
    );
});

/** A cancel header button */
export const HeaderCancelButton = memo(({ onPress }: IPressableButton) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <HeaderButtonText>Cancel</HeaderButtonText>
        </TouchableOpacity>
    );
});

/** A left header arrow button */
export const HeaderLeftArrow = memo(({ onPress }: IPressableButton) => {
    return (
        <HeaderArrowButtonTouchable onPress={onPress} accessibilityLabel="LeftArrow">
            <IonIconButton
                name={`${Platform.OS === "ios" ? "ios" : "md"}-arrow-back`}
                size={22}
            />
        </HeaderArrowButtonTouchable>
    );
});

/** A right header arrow button */
export const HeaderRightArrow = memo(({ onPress }: IPressableButton) => {
    return (
        <HeaderArrowButtonTouchable onPress={onPress} accessibilityLabel="RightArrow">
            <IonIconButton
                name={`${Platform.OS === "ios" ? "ios" : "md"}-arrow-forward`}
                size={22}
                color={"#2f95dc"}
            />
        </HeaderArrowButtonTouchable>
    );
});