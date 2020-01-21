/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { ValidationError, ValidationErrorMessage, ValidationWarning, ValidationWarningMessage } from "@whsha/classes/v1/class/validation";
import React, { memo } from "react";
import { Alert } from "react-native";
import {ErrorsCount, ProblemsButton, ProblemsIconsView, WarningsCount} from "../../styles/components/problemsicons";
import IconComponent from "../IconComponent";

/** The props for the ProblemsIcons */
interface IProblemsIconsProps {
    /** The errors to show */
    errors?: ValidationError[];
    /** The warnings to show */
    warnings?: ValidationWarning[];
}

/** A component to show the problems and errors with icons */
function ProblemsIcons({ errors = [], warnings = [] }: IProblemsIconsProps) {
    const haswarns = warnings.length > 0;
    const haserrors = errors.length > 0;
    if (!haswarns && !haserrors) {
        return null;
    }

    // TODO: better display
    const showWarns = () => Alert.alert(`${warnings.length} Validation Warning${warnings.length === 1 ? "" : "s"}`, warnings.map(x => `• ${ValidationWarningMessage[x]} (${ValidationWarning[x as unknown as keyof typeof ValidationWarning]})`).join("\n"));
    const showErrors = () => Alert.alert(`${errors.length} Validation Error${errors.length === 1 ? "" : "s"}`, errors.map(x => `• ${ValidationErrorMessage[x]} (${ValidationError[x as unknown as keyof typeof ValidationError]})`).join("\n"));

    return (
        <ProblemsIconsView>
            <ProblemsButton onPress={showWarns} display={haswarns}>
                <WarningsCount>{warnings.length}</WarningsCount>
                <IconComponent name="warning" color="gold" />
            </ProblemsButton>
            <ProblemsButton onPress={showErrors} display={haserrors}>
                <ErrorsCount>{errors.length}</ErrorsCount>
                <IconComponent name="alert" color="red" />
            </ProblemsButton>
        </ProblemsIconsView>
    );
}

export default memo(ProblemsIcons);