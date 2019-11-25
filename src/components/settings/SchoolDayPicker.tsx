/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { schoolDayPickerStyles } from "../../layout/default";
import { BlockColor } from "../../util/blocks/blockColor";
import { SchoolDay } from "../../util/calendar/types";
import { IrregularMeetDays } from "../../util/class/primitives";
import { getSchoolDaysThatHaveColor } from "../../util/schoolDays";

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
    const toggle = (day: SchoolDay) => () => onToggle(day);

    const schoolDays = getSchoolDaysThatHaveColor(blockColorRestraint);

    return (
        <ScrollView horizontal={true}>
            <DayPicker day={SchoolDay.One} selected={value[SchoolDay.One]} onPress={toggle(SchoolDay.One)} disabled={schoolDays.indexOf(SchoolDay.One) === -1} />
            <DayPicker day={SchoolDay.Two} selected={value[SchoolDay.Two]} onPress={toggle(SchoolDay.Two)} disabled={schoolDays.indexOf(SchoolDay.Two) === -1} />
            <DayPicker day={SchoolDay.Three} selected={value[SchoolDay.Three]} onPress={toggle(SchoolDay.Three)} disabled={schoolDays.indexOf(SchoolDay.Three) === -1} />
            <DayPicker day={SchoolDay.Four} selected={value[SchoolDay.Four]} onPress={toggle(SchoolDay.Four)} disabled={schoolDays.indexOf(SchoolDay.Four) === -1} />
            <DayPicker day={SchoolDay.Five} selected={value[SchoolDay.Five]} onPress={toggle(SchoolDay.Five)} disabled={schoolDays.indexOf(SchoolDay.Five) === -1} />
            <DayPicker day={SchoolDay.Six} selected={value[SchoolDay.Six]} onPress={toggle(SchoolDay.Six)} disabled={schoolDays.indexOf(SchoolDay.Six) === -1} />
            <DayPicker day={SchoolDay.Seven} selected={value[SchoolDay.Seven]} onPress={toggle(SchoolDay.Seven)} disabled={schoolDays.indexOf(SchoolDay.Seven) === -1} />
        </ScrollView>
    );
}

/** The props for a DayPicker */
interface IDayPickerProps<T extends SchoolDay> {
    /** The day to pick */
    day: T;
    /** If the day is disabled */
    disabled?: boolean;
    /** If the day is selected */
    selected: boolean;
    /** The callback for when the day is pressed */
    onPress?(): void;
}

/** The individual days in the SchoolDayPicker component */
const DayPicker = memo(<T extends SchoolDay>({ day, disabled = false, selected, onPress }: IDayPickerProps<T>) => {
    const containerStyles = [
        schoolDayPickerStyles.container,
        selected ? schoolDayPickerStyles.containerSelected : undefined,
        disabled ? schoolDayPickerStyles.containerDisabled : undefined
    ];

    const textStyles = [
        schoolDayPickerStyles.number,
        selected ? schoolDayPickerStyles.numberSelected : undefined,
    ];

    useEffect(() => {
        if (disabled && selected && onPress !== undefined) {
            onPress();
        }
    }, [disabled, selected, onPress]);

    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <View style={containerStyles}>
                <Text style={textStyles}>{day}</Text>
            </View>
        </TouchableOpacity>
    );
});