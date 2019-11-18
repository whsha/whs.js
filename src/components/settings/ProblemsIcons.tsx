/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { IProblems } from "../../util/problemMap";
import IconComponent from "../IconComponent";

function ProblemsIcons<E, W>({ problems }: { problems?: IProblems<E, W> }) {
    if (problems === undefined) {
        return null;
    }

    const haswarns = problems.warns.length > 0;
    const haserrors = problems.errors.length > 0;

    const showWarns = () => Alert.alert(`${problems.warns.length} Validation Warning${problems.warns.length === 1 ? "" : "s"}`, problems.warns.map(x => `• ${x}`).join("\n"));
    const showErrors = () => Alert.alert(`${problems.errors.length} Validation Error${problems.errors.length === 1 ? "" : "s"}`, problems.errors.map(x => `• ${x}`).join("\n"));

    return (
        <View style={{ flexDirection: "row", paddingRight: 10 }}>
            <TouchableOpacity onPress={showWarns} style={{ flexDirection: "row", paddingRight: 10, paddingLeft: 10, display: haswarns ? "flex" : "none" }}>
                <Text style={{ color: "gold", alignSelf: "center" }}>{problems.warns.length}</Text>
                <IconComponent name="warning" color={"gold"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={showErrors} style={{ flexDirection: "row", paddingRight: 10, paddingLeft: 10, display: haserrors ? "flex" : "none" }}>
                <Text style={{ color: "red", alignSelf: "center", paddingRight: 5 }}>{problems.errors.length}</Text>
                <IconComponent name="alert" color={"red"} style={{ alignSelf: "center" }} />
            </TouchableOpacity>
        </View>
    );
}

export default memo(ProblemsIcons);