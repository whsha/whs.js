/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { render } from "react-native-testing-library";
import IconComponent from "./IconComponent";
import ThemeWrapper from "./test-helpers/ThemeWrapper";

describe("Tests different variations of <IconComponent/>", () => {
    it("Renders <IconComponent name=\"list\"/>", () => {
        const comp = render(
            <IconComponent name="list" />,
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });
    it("Renders <IconComponent name=\"cog\" size={20}/>", () => {
        const comp = render(
            <IconComponent name="cog" size={20} />,
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });
});