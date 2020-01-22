/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import dayjs from "dayjs";
import { default as useCustomFormat } from "dayjs/plugin/customParseFormat";
import React from "react";
import { render } from "react-native-testing-library";
import ThemeWrapper from "../test-helpers/ThemeWrapper";
import AdvisoryComponent from "./AdvisoryComponent";

dayjs.extend(useCustomFormat);

describe("Tests different variations of <AdvisoryComponent>", () => {
    it("Renders AdvisoryComponent with a string room", () => {
        const comp = render(
            (
                <AdvisoryComponent
                    room="Office"
                    teacher="Mr. Teacher Man"
                    start={dayjs("9:38 AM", "h:mm A")}
                    end={dayjs("9:46 AM", "h:mm A")}
                />
            ),
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });
    it("Renders AdvisoryComponent with a numerical room", () => {
        const comp = render(
            (
                < AdvisoryComponent
                    room="132"
                    teacher="Mr. Teacher Man"
                    start={dayjs("11:00 PM", "h:mm A")}
                    end={dayjs("11:30 PM", "h:mm A")}
                />
            ),
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });
});