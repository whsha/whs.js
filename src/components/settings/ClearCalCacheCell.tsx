/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useContext, useEffect, useState } from "react";
import { Cell } from "react-native-tableview-simple";
import { CalendarContext, ReloadFunctionContext } from "../../contexts";
import { tableViewStyle } from "../../layout/default";

dayjs.extend(relativeTime);

export default function ClearCalCacheCell() {
    const calendar = useContext(CalendarContext);
    const [fromNow, setFromNow] = useState(dayjs(calendar.updated).fromNow());
    const load = useContext(ReloadFunctionContext);

    useEffect(() => {
        const interval = setInterval(() => setFromNow(dayjs(calendar.updated).fromNow()), 1000);

        return () => clearInterval(interval);
    }, []);

    const clearCalendarCache = () => {
        load(true);
    };

    return (
        <Cell title="Clear Calendar Cache" detail={`Last update: ${fromNow}`} cellStyle="Subtitle" titleTextStyle={tableViewStyle.redbutton} onPress={clearCalendarCache} />
    );
}