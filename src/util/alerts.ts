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

/** Alert the user that their classes have been migrated */
export async function classesMigratedAlert() {
    return new Promise((resolve, _) => {
        Alert.alert(
            "Classes Migrared",
            "Your classes have been migrated to a new version. " +
            "You should not notice any difference in using the app. " +
            "If any of your classes are missing or not showing up correctly, please contact the team at feedback@whs.dusterthefirst.com.",
            [{
                onPress: resolve,
                style: "default",
                text: "Ok"
            }]
        );
    });
}

/** Alert the user that they are about to import classes from their clipboard */
export function importFromClipboardAlert(loadCallback: () => void) {
    Alert.alert("Import from clipboard?", "Make sure you have the classes copied into your clipboard", [
        {
            style: "default",
            text: "Cancel"
        },
        {
            onPress: loadCallback,
            style: "destructive",
            text: "Load"
        }
    ]);
}

/** Alert the user that their classes are copied to their clipboard */
export function copiedToClipboardAlert() {
    Alert.alert("Copied to clipboard!", "Save this somewhere safe in case you need to reuse it");
}

/** Alert the user that their classes were not in their clipboard */
export function invalidClassesAlert() {
    Alert.alert("Failed to load from clipboard", "The clipboard contents were not valid classes or there was a problem loading them");
}