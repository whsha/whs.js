/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import { shallow } from "enzyme";
import React from "react";
import TodayView from "../views/TodayView";

describe("Render Tests:", () => {
    it("Renders the today page", () => {
        shallow(<TodayView/>);
    });
});