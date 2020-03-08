/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { useObserver } from "mobx-react-lite";
import React from "react";
import { Switch } from "react-native-gesture-handler";
import { Theme } from "../../stores/preferencesStore";
import { SettingsScrollView } from "../../styles/components/settings";
import { Cell, Section, TableView } from "../../styles/components/tableview";
import usePreferences from "../../util/hooks/usePreferences";
import useTheme from "../../util/hooks/useTheme";
import withHaptics from "../../util/withHaptics";

/** The settings to control different accessibility functionalitys of the app */
export default function AccessibilitySettingsView() {
    const preferences = usePreferences();
    const theme = useTheme();

    const updateLabelColors = (val: boolean) =>
        preferences.accessibility.labelColors = val;

    const updateMatchLabelColors = (val: boolean) =>
        preferences.accessibility.matchLabelColors = val;

    const updateTheme = (val: boolean) =>
        preferences.theme.theme = val ? Theme.Dark : Theme.Light;

    const updateMatchTheme = (val: boolean) =>
        preferences.theme.matchSystemTheme = val;

    const TextLabelsSwitch = useObserver(() => (
        <Switch
            value={preferences.accessibility.labelColors}
            onValueChange={withHaptics(updateLabelColors)}
        />
    ));

    const MatchColorsSwitch = useObserver(() => (
        <Switch
            value={preferences.accessibility.matchLabelColors}
            onValueChange={withHaptics(updateMatchLabelColors)}
        />
    ));

    const DarkThemeSwitch = useObserver(() => (
        <Switch
            value={preferences.theme.theme === Theme.Dark}
            onValueChange={withHaptics(updateTheme)}
        />
    ));

    const SystemThemeSwitch = useObserver(() => (
        <Switch
            value={preferences.theme.matchSystemTheme}
            onValueChange={withHaptics(updateMatchTheme)}
        />
    ));

    return (
        <SettingsScrollView>
            <TableView>
                <Section header="Class Color Labels" footer="These settings would add labels to the class display in order to assist users that have trouble differentiating the different colors in identifying the block colors">
                    <Cell title="Text Labels for Colors" cellAccessoryView={TextLabelsSwitch} />
                    {/* Hide the option if the label colors are disabled */}
                    {preferences.accessibility.labelColors ? <Cell title="Match Colors on Labels" cellAccessoryView={MatchColorsSwitch} /> : undefined}
                </Section>
                <Section header="Theme">
                    {/* Hide the switch if the system does not have a theme preference */}
                    {theme.device !== undefined ? <Cell title="Match System Theme" cellAccessoryView={SystemThemeSwitch} /> : undefined}
                    {/* Hide the option if the theme is using the system theme */}
                    {!preferences.theme.matchSystemTheme ? <Cell title="Dark Theme (Beta)" cellAccessoryView={DarkThemeSwitch} /> : undefined}
                </Section>
            </TableView>
        </SettingsScrollView>
    );
}