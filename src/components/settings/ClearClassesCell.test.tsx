/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { NavigationNativeContainer } from "@react-navigation/native";
import React from "react";
import { render } from "react-native-testing-library";
import ClearClassesCell from "./ClearClassesCell";

// TODO: Test press

it("Renders <ClearClassesCell/>", () => {
    const comp = render(<NavigationNativeContainer><ClearClassesCell/></NavigationNativeContainer>);

    expect(comp.toJSON()).toMatchSnapshot();
});