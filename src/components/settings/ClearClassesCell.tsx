/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { useContext } from "react";
import { Alert, StyleSheet } from "react-native";
import { Cell } from "react-native-tableview-simple";
import { ClassesContext, TempClassesContext } from "../../contexts";

const styles = StyleSheet.create({
    redbutton: {
        color: "#FF5050"
    }
});

export default function ResetClassesCell() {
    const classes = useContext(ClassesContext);
    const tempClasses = useContext(TempClassesContext);

    const clear = () => Alert.alert("Are you sure you want to clear your classes", "This action is irriverable", [
        {
            style: "cancel",
            text: "Cancel"
        },
        {
            style: "destructive",
            text: "Clear",
            onPress() {
                classes.clear();
                tempClasses.clear();

                Alert.alert("Classes cleared");
            }
        }
    ]);

    return (
        <Cell title="Clear Classes" titleTextStyle={styles.redbutton} onPress={clear} />
    );
}