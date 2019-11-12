/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { Platform, Text, TouchableOpacity } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { headerButtonStyles } from "../../themes/light";

interface IHeaderDoneButtonProps {
    disabled?: boolean;
    onPress(): void;
}
export function HeaderSaveButton({ onPress, disabled }: IHeaderDoneButtonProps) {
    return (
        <TouchableOpacity style={headerButtonStyles.buttonContainer} onPress={onPress} disabled={disabled}>
            <Text style={[headerButtonStyles.button, headerButtonStyles.doneButton, disabled === true ? headerButtonStyles.disabled : undefined]}>Save</Text>
        </TouchableOpacity>
    );
}

interface IHeaderBackButtonProps {
    onPress(): void;
}
export function HeaderCancelButton({ onPress }: IHeaderBackButtonProps) {
    return (
        <TouchableOpacity style={headerButtonStyles.buttonContainer} onPress={onPress}>
            <Text style={headerButtonStyles.button}>Cancel</Text>
        </TouchableOpacity>
    );
}

export function HeaderLeftArrow({ onPress }: IHeaderBackButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} style={headerButtonStyles.arrowButton}>
            <IonIcon
                name={`${Platform.OS === "ios" ? "ios" : "md"}-arrow-back`}
                // tslint:disable-next-line:no-magic-numbers
                size={22}
                color={"#2f95dc"}
                accessibilityLabel="LeftArrow"
            />
        </TouchableOpacity>
    );
}

export function HeaderRightArrow({ onPress }: IHeaderBackButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} style={headerButtonStyles.arrowButton}>
            <IonIcon
                name={`${Platform.OS === "ios" ? "ios" : "md"}-arrow-forward`}
                // tslint:disable-next-line:no-magic-numbers
                size={22}
                color={"#2f95dc"}
                accessibilityLabel="RightArrow"
            />
        </TouchableOpacity>
    );
}