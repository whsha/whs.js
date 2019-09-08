/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { render } from "react-native-testing-library";
import { NativeRouter } from "react-router-native";
import TabBar from "./TabBar";

it("Renders <TabBar/>", () => {
    let component = render(<NativeRouter><TabBar/></NativeRouter>);

    expect(component.toJSON()).toMatchSnapshot();
});