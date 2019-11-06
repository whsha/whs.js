/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AdvisoryConfigureView from "./class/AdvisoryEditView";
import ClassesListView from "./class/ClassesListView";
import MajorEditView from "./class/MajorEditView";

const Stack = createStackNavigator();

export default function ClassesConfigureView() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ListView" component={ClassesListView} />
            <Stack.Screen name="Advisory" component={AdvisoryConfigureView} />
            <Stack.Screen name="Major" component={MajorEditView} />
            {/* <Stack.Screen name="Minor" component={MinorEditView}/> */}
            {/* <Stack.Screen name="DR" component={DREditView}/> */}
        </Stack.Navigator>
    );
}
