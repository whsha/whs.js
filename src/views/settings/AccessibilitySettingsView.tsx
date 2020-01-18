/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { useObserver } from "mobx-react-lite";
import React from "react";
import { Switch } from "react-native-gesture-handler";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { Theme } from "../../stores/preferencesStore";
import { SettingsScrollView } from "../../styles/components/settings";
import usePreferences from "../../util/hooks/usePreferences";

/** The settings to control different accessibility functionalitys of the app */
export default function AccessibilitySettingsView() {
    const preferences = usePreferences();

    const updateLabelColors = (val: boolean) =>
        preferences.accessibility.labelColors = val;

    const updateMatchLabelColors = (val: boolean) =>
        preferences.accessibility.matchLabelColors = val;

    const updateTheme = (val: boolean) =>
        preferences.theme = val ? Theme.Dark : Theme.Light;

    const TextLabelsSwitch = useObserver(() => (
        <Switch
            value={preferences.accessibility.labelColors}
            onValueChange={updateLabelColors}
        />
    ));

    const MatchColorsSwitch = useObserver(() => (
        <Switch
            value={preferences.accessibility.matchLabelColors}
            onValueChange={updateMatchLabelColors}
            disabled={!preferences.accessibility.labelColors}
        />
    ));

    const DarkThemeSwitch = useObserver(() => (
        <Switch
            value={preferences.theme === Theme.Dark}
            onValueChange={updateTheme}
        />
    ));

    return (
        <SettingsScrollView>
            <TableView>
                <Section header="Class Color Labels" footer="These settings would add labels to the class display in order to assist users that have trouble differentiating the different colors in identifying the block colors">
                    <Cell title="Text Labels for Colors" cellAccessoryView={TextLabelsSwitch} />
                    <Cell title="Match Colors on Labels" cellAccessoryView={MatchColorsSwitch} isDisabled={!preferences.accessibility.labelColors} />
                </Section>
                <Section header="Theme">
                    <Cell title="Dark Theme (Alpha)" cellAccessoryView={DarkThemeSwitch} />
                </Section>
            </TableView>
        </SettingsScrollView>
    );
}