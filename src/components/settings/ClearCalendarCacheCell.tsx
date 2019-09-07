/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Cell } from "react-native-tableview-simple";
import { CalendarContext, ReloadFunctionContext } from "../../contexts";

const styles = StyleSheet.create({
    redbutton: {
        color: "#FF5050"
    }
});

export default function ClearCalCacheCell() {
    const calendar = useContext(CalendarContext);
    let [fromNow, setFromNow] = useState(dayjs(calendar.updated).fromNow());
    const load = useContext(ReloadFunctionContext);

    useEffect(() => {
        let interval = setInterval(() => setFromNow(dayjs(calendar.updated).fromNow()), 1000);

        return () => clearInterval(interval);
    }, []);

    const clearCalendarCache = () => {
        load(true);
    };

    return (
        <Cell title="Clear Calendar Cache" detail={`Last update: ${fromNow}`} cellStyle="Subtitle" titleTextStyle={styles.redbutton} onPress={clearCalendarCache} />
    );
}