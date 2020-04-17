/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { ValidationError, ValidationWarning } from "@whsha/classes/v1/class/validation";
import React from "react";
import { render } from "react-native-testing-library";
import ThemeWrapper from "../test-helpers/ThemeWrapper";
import ProblemsIcons from "./ProblemsIcons";

// TODO: Handle press
describe("Renders different sets of problem icons", () => {
    it("Renders with no problems", () => {
        const comp = render(
            <ProblemsIcons />,
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });

    it("Renders with only warnings", () => {
        const comp = render(
            (
                <ProblemsIcons
                    warnings={[ValidationWarning.MissingName, ValidationWarning.MissingRoom]}
                />
            ),
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });

    it("Renders with only errors", () => {
        const comp = render(
            (
                <ProblemsIcons
                    errors={[ValidationError.DRConflictWithDR, ValidationError.MeetsEveryDay, ValidationError.MajorHasDuplicateBlockColor]}
                />
            ),
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });

    it("Renders with both errors and warnings", () => {
        const comp = render(
            (
                <ProblemsIcons
                    warnings={[ValidationWarning.MissingName, ValidationWarning.MissingRoom]}
                    errors={[ValidationError.DRConflictWithDR, ValidationError.MeetsEveryDay, ValidationError.MajorHasDuplicateBlockColor]}
                />
            ),
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });
});