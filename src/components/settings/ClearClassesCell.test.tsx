/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { render } from "react-native-testing-library";
import ClearCalCacheCell from "./ClearCalCacheCell";

// TODO: Test press

it("Renders <ClearCalCacheCell/>", () => {
    let comp = render(<ClearCalCacheCell/>);

    expect(comp.toJSON()).toMatchSnapshot();
});