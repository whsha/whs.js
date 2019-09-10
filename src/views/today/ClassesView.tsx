/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import dayjs from "dayjs";
import useCustomFormat from "dayjs/plugin/customParseFormat";
import React, { useContext } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import useRouter from "use-react-router";
import AdvisoryComponent from "../../components/blocks/AdvisoryComponent";
import ClassComponent from "../../components/blocks/ClassComponent";
import FreeComponent from "../../components/blocks/FreeComponent";
import { ClassesContext } from "../../contexts";
import { settingsViewStyles } from "../../themes/light";
import { Block } from "../../util/blocks/block";
import { BlockColor } from "../../util/blocks/blockColor";
import { ICalendarSchoolDay, SchoolDay } from "../../util/calendar/types";
import { getBlockColorsForDay } from "../../util/schoolDays";

dayjs.extend(useCustomFormat);

export default function ClassesView({ schoolDay }: { schoolDay?: ICalendarSchoolDay }) {
    const classes = useContext(ClassesContext);

    const colors = schoolDay === undefined ? [BlockColor.None].fill(BlockColor.None, 0, 7) : Object.keys(Block)
        .filter(x =>
            isNaN(parseInt(x, 10))
        ).map((x) =>
            getBlockColorsForDay(SchoolDay[schoolDay.dayNumber] as keyof typeof SchoolDay)[x as keyof typeof Block]
        );

    const { history } = useRouter();
    function navigateTo(to: string) {
        return () => {
            history.push(to);
        };
    }

    return (
        <ScrollView style={settingsViewStyles.container}>
            {/* FIXME: */}
            <FreeComponent
                block={colors[0]}
                start={dayjs("7:30 AM", "h:mm A")}
                end={dayjs("8:29 AM", "h:mm A")}
            />
            {/* TODO: */}
            <TouchableOpacity onPress={navigateTo("/settings/classes/0")}>
                <ClassComponent
                    block={colors[1]}
                    start={dayjs("8:34 AM", "h:mm A")}
                    end={dayjs("9:33 AM", "h:mm A")}
                    name="Example"
                    room={100}
                    teacher="Mr. Example"
                />
            </TouchableOpacity>
            <AdvisoryComponent {...classes.advisory} />
            <ClassComponent
                block={colors[2]}
                start={dayjs("9:51 AM", "h:mm A")}
                end={dayjs("10:50 AM", "h:mm A")}
                name="Example"
                room={100}
                teacher="Mr. Example"
            />
            {/* FIXME: LUNCH BLOCK */}
            <ClassComponent
                block={colors[3]}
                // FIXME: LUNCH
                start={dayjs("10:55 AM", "h:mm A")}
                // FIXME: LUNCH
                end={dayjs("12:22 PM", "h:mm A")}
                name="Example"
                room={100}
                teacher="Mr. Example"
            />
            {/* END FIXME: */}
            <ClassComponent
                block={colors[4]}
                start={dayjs("12:27 PM", "h:mm A")}
                end={dayjs("1:26 PM", "h:mm A")}
                name="Example"
                room={100}
                teacher="Mr. Example"
            />
            <ClassComponent
                block={colors[5]}
                start={dayjs("1:31 PM", "h:mm A")}
                end={dayjs("2:30 PM", "h:mm A")}
                name="Example"
                room={100}
                teacher="Mr. Example"
            />
        </ScrollView>
    );
}