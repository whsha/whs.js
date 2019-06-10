/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { GestureResponderEvent, Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

const styles = StyleSheet.create({
    button: {
        color: "#2f95dc",
        fontSize: 17
    },
    buttonContainer: {
    },
    disabled: {
        color: "#dadada"
    },
    doneButton: {
        fontWeight: "bold"
    }
});

interface IHeaderDoneButtonProps {
    disabled?: boolean;
    onPress(event: GestureResponderEvent): void;
}
export function HeaderSaveButton({ onPress, disabled }: IHeaderDoneButtonProps) {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress} disabled={disabled}>
            <Text style={[styles.button, styles.doneButton, disabled === true ? styles.disabled : undefined]}>Save</Text>
        </TouchableOpacity>
    );
}

interface IHeaderBackButtonProps {
    onPress(event: GestureResponderEvent): void;
}
export function HeaderCancelButton({ onPress }: IHeaderBackButtonProps) {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <Text style={styles.button}>Cancel</Text>
        </TouchableOpacity>
    );
}

export function HeaderLeftArrow({ onPress }: IHeaderBackButtonProps) {
    return (
        <TouchableOpacity onPress={onPress}>
            <IonIcon
                name={`${Platform.OS === "ios" ? "ios" : "md"}-arrow-back`}
                // tslint:disable-next-line:no-magic-numbers
                size={22}
                color={"#2f95dc"}
            />
        </TouchableOpacity>
    );
}

export function HeaderRightArrow({ onPress }: IHeaderBackButtonProps) {
    return (
        <TouchableOpacity onPress={onPress}>
            <IonIcon
                name={`${Platform.OS === "ios" ? "ios" : "md"}-arrow-forward`}
                // tslint:disable-next-line:no-magic-numbers
                size={22}
                color={"#2f95dc"}
            />
        </TouchableOpacity>
    );
}