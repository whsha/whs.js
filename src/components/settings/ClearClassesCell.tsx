/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext } from "react";
import { LegacyTempClassesContext } from "../../contexts";
import { SettingsParams } from "../../navigators/SettingsNavigator";
import { RedCell } from "../../styles/components/tableview";
import { clearClassesAlert } from "../../util/alerts";

/** A settings cell to clear the classes */
export default function ClearClassesCell() {
    const navigation = useNavigation<StackNavigationProp<SettingsParams>>();
    const tempClasses = useContext(LegacyTempClassesContext);

    const clear = () => clearClassesAlert(() => {
        tempClasses.clear();

        navigation.navigate("ClassesList");
    });

    return (
        <RedCell title="Clear Classes" onPress={clear} />
    );
}