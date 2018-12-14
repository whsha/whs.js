/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from "react-native";

interface IHeaderDoneButtonProps {
    disabled?: boolean;
    onPress(event: GestureResponderEvent): void;
}
export function HeaderDoneButton({onPress, disabled}: IHeaderDoneButtonProps) {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress} disabled={disabled}>
            <Text style={[styles.button, styles.doneButton, disabled ? styles.disabled : undefined]}>Done</Text>
        </TouchableOpacity>
    );
}

interface IHeaderBackButtonProps {
    onPress(event: GestureResponderEvent): void;
}
export function HeaderBackButton({onPress}: IHeaderBackButtonProps) {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <Text style={styles.button}>Cancel</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        color: "#2f95dc",
        fontSize: 17
    },
    buttonContainer: {
        marginHorizontal: 15,
        marginVertical: 10
    },
    disabled: {
        color: "#dadada"
    },
    doneButton: {
        fontWeight: "bold"
    }
});