/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { Alert } from "react-native";

export function clearClassesAlert(successCallback: () => void) {
    Alert.alert("Are you sure you want to clear your classes", "This action is irriverable", [
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

export function deleteClassAlert(deleteCallback: () => void) {
    Alert.alert("Are you sure you want to delete this class?", "This action is irreversable", [
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