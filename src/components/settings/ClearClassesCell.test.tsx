/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { render } from "react-native-testing-library";
import ClearClassesCell from "./ClearClassesCell";

// TODO: Test press

it("Renders <ClearClassesCell/>", () => {
    const comp = render(<ClearClassesCell/>);

    expect(comp.toJSON()).toMatchSnapshot();
});