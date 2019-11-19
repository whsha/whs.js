/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Platform, Text, TouchableOpacity } from "react-native";
import { headerButtonStyles } from "../../layout/default";

interface IHeaderDoneButtonProps {
    disabled?: boolean;
    onPress(): void;
}
export const HeaderSaveButton = memo(({ onPress, disabled }: IHeaderDoneButtonProps) => {
    return (
        <TouchableOpacity style={headerButtonStyles.buttonContainer} onPress={onPress} disabled={disabled}>
            <Text style={[headerButtonStyles.button, headerButtonStyles.doneButton, disabled === true ? headerButtonStyles.disabled : undefined]}>Save</Text>
        </TouchableOpacity>
    );
});

interface IHeaderBackButtonProps {
    onPress(): void;
}
export const HeaderCancelButton = memo(({ onPress }: IHeaderBackButtonProps) => {
    return (
        <TouchableOpacity style={headerButtonStyles.buttonContainer} onPress={onPress}>
            <Text style={headerButtonStyles.button}>Cancel</Text>
        </TouchableOpacity>
    );
});

export const HeaderLeftArrow = memo(({ onPress }: IHeaderBackButtonProps) => {
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

export const HeaderRightArrow = memo(({ onPress }: IHeaderBackButtonProps) => {
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