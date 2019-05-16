/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
    button: {
        color: "#2f95dc",
        fontSize: 17
    },
    buttonContainer: {
        marginHorizontal: 15,
        marginVertical: 10,
        position: "absolute",
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
export function HeaderDoneButton({ onPress, disabled }: IHeaderDoneButtonProps) {
    return (
        <TouchableOpacity style={[styles.buttonContainer, { right: 0 }]} onPress={onPress} disabled={disabled}>
            <Text style={[styles.button, styles.doneButton, disabled === true ? styles.disabled : undefined]}>Save</Text>
        </TouchableOpacity>
    );
}

interface IHeaderBackButtonProps {
    onPress(event: GestureResponderEvent): void;
}
export function HeaderBackButton({ onPress }: IHeaderBackButtonProps) {
    return (
        <TouchableOpacity style={[styles.buttonContainer, { left: 0 }]} onPress={onPress}>
            <Text style={styles.button}>Cancel</Text>
        </TouchableOpacity>
    );
}