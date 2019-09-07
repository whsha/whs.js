/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { Route, Switch } from "react-router";
import AdvisoryConfigureView from "./class/AdvisoryConfigureView";
import ClassEditView from "./class/ClassEditView";
import ClassesListView from "./class/ClassesListView";

export default function ClassesConfigureView() {
    return (
        <Switch>
            <Route path="/settings/classes" exact={true} component={ClassesListView} />
            <Route path="/settings/classes/advisory" exact={true} component={AdvisoryConfigureView}/>
            <Route path="/settings/classes/:id" exact={true} component={ClassEditView} />
        </Switch>
    );
}
