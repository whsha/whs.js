/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "@whsha/classes/v1/blocks/blockColor";
import { SchoolDay } from "@whsha/classes/v1/calendar/types";
import { IrregularMeetDays } from "@whsha/classes/v1/class/primitives";
import { getSchoolDaysThatHaveColor } from "@whsha/classes/v1/schoolDays";
import React, { memo, useEffect, useMemo, } from "react";
import { Section } from "react-native-tableview-simple";
import { ButtonCell } from "../../styles/components/tableview";

/** The props for a SchoolDayPicker */
interface ISchoolDayPickerProps {
    /** The callback for when a day is toggled */
    onToggle(day: SchoolDay): void;
    /** The value of the picker */
    value: IrregularMeetDays;
    /** The restraint to lock the block colors to */
    blockColorRestraint: BlockColor;
}

/** A component for picking the school days that a class meets on */
export default function SchoolDayPicker({ onToggle, value, blockColorRestraint }: ISchoolDayPickerProps) {
    const schoolDays = useMemo(() => getSchoolDaysThatHaveColor(blockColorRestraint), [blockColorRestraint]);

    return (
        <Section header="School Days">
            <DayPicker day={SchoolDay.One} value={value} toggle={onToggle} enabledDays={schoolDays} />
            <DayPicker day={SchoolDay.Two} value={value} toggle={onToggle} enabledDays={schoolDays} />
            <DayPicker day={SchoolDay.Three} value={value} toggle={onToggle} enabledDays={schoolDays} />
            <DayPicker day={SchoolDay.Four} value={value} toggle={onToggle} enabledDays={schoolDays} />
            <DayPicker day={SchoolDay.Five} value={value} toggle={onToggle} enabledDays={schoolDays} />
            <DayPicker day={SchoolDay.Six} value={value} toggle={onToggle} enabledDays={schoolDays} />
            <DayPicker day={SchoolDay.Seven} value={value} toggle={onToggle} enabledDays={schoolDays} />
        </Section>
    );
}

/** The props for DayPicker */
interface IDayPickerProps<D extends SchoolDay> {
    /** The day for the picker */
    day: D;
    /** The current selected value */
    value: IrregularMeetDays;
    /** The callback to use to pick a new day */
    toggle(day: D): void;
    /** The school days that are enabled */
    enabledDays: SchoolDay[];
}

/** The cell to choose colors with */
const DayPicker = memo(<D extends SchoolDay>({ day, enabledDays, toggle, value }: IDayPickerProps<D>) => {
    const disabled = !enabledDays.includes(day);
    const selected = value[day] === true;
    const toggleCallback = () => toggle(day);

    useEffect(() => {
        if (disabled && selected) {
            toggleCallback();
        }
    }, [disabled, selected]);

    return (
        <ButtonCell
            title={`Day ${day}`}
            onPress={toggleCallback}
            accessory={selected ? "Checkmark" : undefined}
            isDisabled={disabled}
        />
    );
});