/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { render } from "react-native-testing-library";
import AdvisoryComponent from "./AdvisoryComponent";

describe("Tests different variations of <AdvisoryComponent>", () => {
    it("Renders AdvisoryComponent with a string room", () => {
        let comp = render(<AdvisoryComponent room="Office" teacher="Mr. Teacher Man"/>);

        expect(comp.toJSON()).toMatchSnapshot();
    });
    it("Renders AdvisoryComponent with a numerical room", () => {
        let comp = render(<AdvisoryComponent room={132} teacher="Mr. Teacher Man"/>);

        expect(comp.toJSON()).toMatchSnapshot();
    });
});