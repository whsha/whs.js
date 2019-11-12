/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { useContext } from "react";
import { Alert } from "react-native";
import { Cell } from "react-native-tableview-simple";
import { ClassesContext, TempClassesContext } from "../../contexts";
import { tableViewStyle } from "../../layout/default";

export default function ClearClassesCell() {
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
        <Cell title="Clear Classes" titleTextStyle={tableViewStyle.redbutton} onPress={clear} />
    );
}