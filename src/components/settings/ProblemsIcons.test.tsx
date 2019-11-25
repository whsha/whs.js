/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { render } from "react-native-testing-library";
import { ValidationError, ValidationWarning } from "../../util/class/validation";
import ProblemsIcons from "./ProblemsIcons";

// TODO: Handle press
describe("Renders different sets of problem icons", () => {
    it("Renders with no problems", () => {
        const comp = render(<ProblemsIcons />);

        expect(comp.toJSON()).toMatchSnapshot();
    });

    it("Renders with only warnings", () => {
        const comp = render(<ProblemsIcons warnings={[ValidationWarning.MissingName, ValidationWarning.MissingRoom]} />);

        expect(comp.toJSON()).toMatchSnapshot();
    });

    it("Renders with only errors", () => {
        const comp = render(<ProblemsIcons errors={[ValidationError.DRConflictWithDR, ValidationError.MeetsEveryDay, ValidationError.MajorHasDuplicateBlockColor]} />);

        expect(comp.toJSON()).toMatchSnapshot();
    });

    it("Renders with both errors and warnings", () => {
        const comp = render(
            <ProblemsIcons
                warnings={[ValidationWarning.MissingName, ValidationWarning.MissingRoom]}
                errors={[ValidationError.DRConflictWithDR, ValidationError.MeetsEveryDay, ValidationError.MajorHasDuplicateBlockColor]}
            />
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });
});