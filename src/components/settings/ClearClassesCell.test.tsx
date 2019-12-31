/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { render } from "react-native-testing-library";
import ClearClassesCell from "./ClearClassesCell";

// TODO: Test press

/** Test navigator */
const Stack = createStackNavigator();

it("Renders <ClearClassesCell/>", () => {
    const comp = render(
        <NavigationNativeContainer>
            <Stack.Navigator>
                <Stack.Screen name="Test" component={ClearClassesCell}/>
            </Stack.Navigator>
        </NavigationNativeContainer>
    );

    expect(comp.toJSON()).toMatchSnapshot();
});