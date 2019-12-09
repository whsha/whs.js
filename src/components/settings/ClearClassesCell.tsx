/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext } from "react";
import { Cell } from "react-native-tableview-simple";
import { TempClassesContext } from "../../contexts";
import { SettingsParams } from "../../navigators/SettingsNavigator";
import { tableViewStyle } from "../../styles/layout/default";
import { clearClassesAlert } from "../../util/alerts";

/** A settings cell to clear the classes */
export default function ClearClassesCell() {
    const navigation = useNavigation<StackNavigationProp<SettingsParams>>();
    const tempClasses = useContext(TempClassesContext);

    const clear = () => clearClassesAlert(() => {
        tempClasses.clear();

        navigation.navigate("ClassesList");
    });

    return (
        <Cell title="Clear Classes" titleTextStyle={tableViewStyle.redbutton} onPress={clear} />
    );
}