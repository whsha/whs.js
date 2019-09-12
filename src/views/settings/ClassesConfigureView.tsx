/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { Route, Switch } from "react-router";
import AdvisoryConfigureView from "./class/AdvisoryEditView";
import ClassesListView from "./class/ClassesListView";
import MajorEditView from "./class/MajorEditView";

export default function ClassesConfigureView() {
    return (
        <Switch>
            <Route path="/settings/classes" exact={true} component={ClassesListView} />
            <Route path="/settings/classes/advisory" exact={true} component={AdvisoryConfigureView}/>
            <Route path="/settings/classes/major/:id" exact={true} component={MajorEditView} />
            {/* <Route path="/settings/classes/minor/:id" exact={true} component={MinorEditView} /> */}
            {/* <Route path="/settings/classes/dr/:id" exact={true} component={MinorEditView} /> */}
        </Switch>
    );
}
