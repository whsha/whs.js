/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { useObserver } from "mobx-react-lite";
import React from "react";
import { SafeAreaView } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { SettingsScrollView } from "../../../styles/components/settings";
import { SchoolDay } from "../../../util/calendar/types";
import { Lunch } from "../../../util/class/lunch";
import useClasses from "../../../util/hooks/classes/useClasses";
import { getLunchBlockColorForDay } from "../../../util/schoolDays";

/** The day selector properties */
interface IDaySelectorProps {
    /** The item in the list */
    item: SchoolDay;
}

/** The view to edit the users lunches */
export default function LunchEditView() {
    const classes = useClasses();

    const updateLunchForDay = (day: SchoolDay, lunch: Lunch) => () => classes.updateLunch(day, lunch);

    const DaySelector = ({ item }: IDaySelectorProps) => useObserver(() => (
        <Section header={`Day ${item} (${getLunchBlockColorForDay(item)})`}>
            <Cell
                title="No Lunch"
                accessory={classes.temp.lunches[item] === Lunch.None ? "Checkmark" : undefined}
                onPress={updateLunchForDay(item, Lunch.None)}
            />
            <Cell
                title="First Lunch"
                accessory={classes.temp.lunches[item] === Lunch.First ? "Checkmark" : undefined}
                onPress={updateLunchForDay(item, Lunch.First)}
            />
            <Cell
                title="Second Lunch"
                accessory={classes.temp.lunches[item] === Lunch.Second ? "Checkmark" : undefined}
                onPress={updateLunchForDay(item, Lunch.Second)}
            />
            <Cell
                title="Third Lunch"
                accessory={classes.temp.lunches[item] === Lunch.Third ? "Checkmark" : undefined}
                onPress={updateLunchForDay(item, Lunch.Third)}
            />
        </Section>
    ));

    return (
        <SettingsScrollView contentInsetAdjustmentBehavior="automatic">
            <SafeAreaView>
                <TableView>
                    {[SchoolDay.One, SchoolDay.Two, SchoolDay.Three, SchoolDay.Four, SchoolDay.Five, SchoolDay.Six, SchoolDay.Seven].map((x, i) => <DaySelector item={x} key={i} />)}
                </TableView>
            </SafeAreaView>
        </SettingsScrollView>
    );
}