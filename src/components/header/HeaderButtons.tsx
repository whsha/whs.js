/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Platform, Text, TouchableOpacity } from "react-native";
import { headerButtonStyles } from "../../styles/layout/default";

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
        <TouchableOpacity style={headerButtonStyles.buttonContainer} onPress={onPress} disabled={disabled}>
            <Text style={[headerButtonStyles.button, headerButtonStyles.doneButton, disabled === true ? headerButtonStyles.disabled : undefined]}>Save</Text>
        </TouchableOpacity>
    );
});

/** A cancel header button */
export const HeaderCancelButton = memo(({ onPress }: IPressableButton) => {
    return (
        <TouchableOpacity style={headerButtonStyles.buttonContainer} onPress={onPress}>
            <Text style={headerButtonStyles.button}>Cancel</Text>
        </TouchableOpacity>
    );
});

/** A left header arrow button */
export const HeaderLeftArrow = memo(({ onPress }: IPressableButton) => {
    return (
        <TouchableOpacity onPress={onPress} style={headerButtonStyles.arrowButton} accessibilityLabel="LeftArrow">
            <Ionicons
                name={`${Platform.OS === "ios" ? "ios" : "md"}-arrow-back`}
                size={22}
                color={"#2f95dc"}
            />
        </TouchableOpacity>
    );
});

/** A right header arrow button */
export const HeaderRightArrow = memo(({ onPress }: IPressableButton) => {
    return (
        <TouchableOpacity onPress={onPress} style={headerButtonStyles.arrowButton} accessibilityLabel="RightArrow">
            <Ionicons
                name={`${Platform.OS === "ios" ? "ios" : "md"}-arrow-forward`}
                size={22}
                color={"#2f95dc"}
            />
        </TouchableOpacity>
    );
});