/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { Alert, View } from "react-native";
import { IProblems } from "../../util/problemMap";
import IconComponent from "../IconComponent";

function ProblemsIcons<E, W>({ problems }: { problems?: IProblems<E, W> }) {
    if (problems === undefined) {
        return null;
    }

    const haswarns = problems.warns.length > 0;
    const haserrors = problems.errors.length > 0;

    const showWarns = () => Alert.alert("Validation Warnings", problems.warns.map(x => `• ${x}`).join("\n"));
    const showErrors = () => Alert.alert("Validation Errors", problems.errors.map(x => `• ${x}`).join("\n"));

    return (
        <View style={{ flexDirection: "row", paddingRight: 10 }}>
            {haswarns ? <IconComponent name="warning" size={24} style={{ paddingRight: 10, paddingLeft: 10 }} color={"gold"} onPress={showWarns} /> : null}
            {haserrors ? <IconComponent name="alert" size={24} style={{ paddingRight: 10, paddingLeft: 10 }} color={"red"} onPress={showErrors} /> : null}
        </View>
    );
}

export default memo(ProblemsIcons);