/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import dayjs from "dayjs";
import useCustomFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { render } from "react-native-testing-library";
import { BlockColor } from "../../util/blocks/blockColor";
import FreeComponent from "./FreeComponent";

dayjs.extend(useCustomFormat);

describe("Tests different variations of <FreeComponent>", () => {
    it("Renders FreeComponent", () => {
        const comp = render(<FreeComponent block={BlockColor.Red} start={dayjs("7:30 AM", "h:mm A")} end={dayjs("8:30 AM", "h:mm A")}/>);

        expect(comp.toJSON()).toMatchSnapshot();
    });
});