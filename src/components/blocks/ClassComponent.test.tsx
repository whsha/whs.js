/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import dayjs from "dayjs";
import useCustomFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { render } from "react-native-testing-library";
import { BlockColor } from "../../util/blocks/blockColor";
import ClassComponent from "./ClassComponent";

dayjs.extend(useCustomFormat);

describe("Tests different variations of <ClassComponent>", () => {
    it("Renders ClassComponent with a string room", () => {
        let comp = render(<ClassComponent name="Class" room="Office" teacher="Mr. Teacher Man" block={BlockColor.Red} start={dayjs("7:30 AM", "h:mm A")} end={dayjs("8:30 AM", "h:mm A")}/>);

        expect(comp.toJSON()).toMatchSnapshot();
    });
    it("Renders ClassComponent with a numerical room", () => {
        let comp = render(<ClassComponent name="Class" room="Office" teacher="Mr. Teacher Man" block={BlockColor.Red} start={dayjs("12:14 PM", "h:mm A")} end={dayjs("1:24 PM", "h:mm A")}/>);

        expect(comp.toJSON()).toMatchSnapshot();
    });
});