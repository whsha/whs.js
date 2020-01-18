/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useContext, useEffect, useState } from "react";
import { CalendarContext, ReloadFunctionContext } from "../../contexts";
import { RedCell } from "../../styles/components/tableview";

dayjs.extend(relativeTime);

/** A settings cell for clearing the calendar cache */
export default function ClearCalCacheCell() {
    const calendar = useContext(CalendarContext);
    const [fromNow, setFromNow] = useState(dayjs(calendar.updated).fromNow());
    const load = useContext(ReloadFunctionContext);

    useEffect(() => {
        const interval = setInterval(() => setFromNow(dayjs(calendar.updated).fromNow()), 1000);

        return () => clearInterval(interval);
    }, []);

    const clearCalendarCache = () => {
        load(true).catch((e) => console.warn("Failed to reload app", e));
    };

    return (
        <RedCell
            title="Clear Calendar Cache"
            detail={`Last update: ${fromNow}`}
            cellStyle="Subtitle"
            onPress={clearCalendarCache}
        />
    );
}