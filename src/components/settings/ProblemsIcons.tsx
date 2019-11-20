/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { ValidationError, ValidationErrorMessage, ValidationWarning, ValidationWarningMessage } from "../../util/hooks/classes/useClasses";
import IconComponent from "../IconComponent";

function ProblemsIcons({ errors = [], warnings = [] }: { errors?: ValidationError[]; warnings?: ValidationWarning[] }) {
    const haswarns = warnings.length > 0;
    const haserrors = errors.length > 0;
    if (!haswarns && !haserrors) {
        return null;
    }

    const showWarns = () => Alert.alert(`${warnings.length} Validation Warning${warnings.length === 1 ? "" : "s"}`, warnings.map(x => `• ${ValidationWarningMessage[x]} (${ValidationWarning[x as unknown as keyof typeof ValidationWarning]})`).join("\n"));
    const showErrors = () => Alert.alert(`${errors.length} Validation Error${errors.length === 1 ? "" : "s"}`, errors.map(x => `• ${ValidationErrorMessage[x]} (${ValidationError[x as unknown as keyof typeof ValidationError]})`).join("\n"));

    return (
        <View style={{ flexDirection: "row", paddingRight: 10 }}>
            <TouchableOpacity onPress={showWarns} style={{ flexDirection: "row", paddingRight: 10, paddingLeft: 10, display: haswarns ? "flex" : "none" }}>
                <Text style={{ color: "gold", alignSelf: "center", paddingRight: 5 }}>{warnings.length}</Text>
                <IconComponent name="warning" color={"gold"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={showErrors} style={{ flexDirection: "row", paddingRight: 10, paddingLeft: 10, display: haserrors ? "flex" : "none" }}>
                <Text style={{ color: "red", alignSelf: "center", paddingRight: 5 }}>{errors.length}</Text>
                <IconComponent name="alert" color={"red"} style={{ alignSelf: "center" }} />
            </TouchableOpacity>
        </View>
    );
}

export default memo(ProblemsIcons);