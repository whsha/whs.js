/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { useContext } from "react";
import { Alert } from "react-native";
import { Cell } from "react-native-tableview-simple";
import { ClassesContext, TempClassesContext } from "../../contexts";
import { tableViewStyle } from "../../layout/default";
import { clearClassesAlert } from "../../util/alerts";

export default function ClearClassesCell() {
    const classes = useContext(ClassesContext);
    const tempClasses = useContext(TempClassesContext);

    const clear = () => clearClassesAlert(() => {
        classes.clear();
        tempClasses.clear();

        Alert.alert("Classes cleared");
    });

    return (
        <Cell title="Clear Classes" titleTextStyle={tableViewStyle.redbutton} onPress={clear} />
    );
}