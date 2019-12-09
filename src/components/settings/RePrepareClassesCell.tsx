/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { Cell } from "react-native-tableview-simple";
import { tableViewStyle } from "../../styles/layout/default";
import useClasses from "../../util/hooks/classes/useClasses";
import usePreparedClasses from "../../util/hooks/classes/usePreparedClasses";

/** A settings cell to re-prepare the classes */
export default function RePrepareClassesCell() {
    const preparedClasses = usePreparedClasses();
    const classes = useClasses();

    const clear = () => preparedClasses.prepare(classes.saved);

    return (
        <Cell title="Regenerate Schedule" titleTextStyle={tableViewStyle.redbutton} onPress={clear} />
    );
}