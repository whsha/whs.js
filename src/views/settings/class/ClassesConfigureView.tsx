/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { StyleSheet } from "react-native";
import { Route, Switch } from "react-router";
import ClassEditView from "./ClassEditView";
import ClassesListView from "./ClassesListView";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EFEFF4",
        flex: 1
    },
    text: {
        flex: 1,
        height: 40,
    }
});

export default function ClassesConfigureView() {
    return (
        <Switch>
            <Route path="/settings/classes" exact={true} component={ClassesListView} />
            <Route path="/settings/classes/:id" exact={true} component={ClassEditView} />
        </Switch>
    );
}
