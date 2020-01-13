/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { Alert } from "react-native";

/** Alert the user that they will be clearing their classes */
export function clearClassesAlert(successCallback: () => void) {
    Alert.alert("Are you sure you want to clear your classes?", "This action is irreversible", [
        {
            style: "cancel",
            text: "Cancel"
        },
        {
            onPress: successCallback,
            style: "destructive",
            text: "Clear"
        }
    ]);
}

/** Alert the user that they will be discarding their changes if the continue */
export function discardChangesAlert(discardCallback: () => void) {
    Alert.alert("Discard Changes?", "If you continue without saving your changes, they will all be lost", [
        {
            style: "default",
            text: "Cancel"
        },
        {
            onPress: discardCallback,
            style: "destructive",
            text: "Discard Changes"
        }
    ]);
}

/** Alert the user that they will be deleting a class */
export function deleteClassAlert(deleteCallback: () => void) {
    Alert.alert("Are you sure you want to delete this class?", undefined, [
        {
            onPress: deleteCallback,
            style: "destructive",
            text: "Delete"
        },
        {
            style: "cancel",
            text: "Cancel"
        }
    ]);
}

/** Alert the user that they will be opening a link in an external browser */
export function openLinkInBrowserAlert(openCallback: () => void) {
    Alert.alert("Open link in browser?", undefined, [{
        onPress: openCallback,
        style: "default",
        text: "Open"
    },
    {
        style: "cancel",
        text: "Cancel"
    }], { cancelable: true });
}