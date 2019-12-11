/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { useContext } from "react";
import { AsyncStorage } from "react-native";
import { Cell } from "react-native-tableview-simple";
import { ReloadFunctionContext } from "../../contexts";
import StorageKey from "../../storageKey";
import { tableViewStyle } from "../../styles/layout/default";

/** A settings cell to re-prepare the classes */
export default function RemoveOpenedKey() {
    const reload = useContext(ReloadFunctionContext);

    const clear = () => {
        AsyncStorage.removeItem(StorageKey.HasOpened).then(() => reload(false));
    };

    return (
        <Cell title="Remove Opened Key" titleTextStyle={tableViewStyle.redbutton} onPress={clear} />
    );
}