/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { render } from "react-native-testing-library";
import ThemeWrapper from "../test-helpers/ThemeWrapper";
import ClearClassesCell from "./ClearClassesCell";

// TODO: Test press

/** Test navigator */
const Stack = createStackNavigator();

it("Renders <ClearClassesCell/>", () => {
    const comp = render(
        (
            // Change into wrapper
            <NavigationNativeContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Test" component={ClearClassesCell} />
                </Stack.Navigator>
            </NavigationNativeContainer>
        ),
        { wrapper: ThemeWrapper }
    );

    expect(comp.toJSON()).toMatchSnapshot();
});