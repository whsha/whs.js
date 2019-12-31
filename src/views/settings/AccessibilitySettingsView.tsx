/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { useObserver } from "mobx-react-lite";
import React from "react";
import { ScrollView } from "react-native";
import { Switch } from "react-native-gesture-handler";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { settingsViewStyles } from "../../styles/layout/default";
import usePreferences from "../../util/hooks/usePreferences";

/** The settings to control different accessibility functionalitys of the app */
export default function AccessibilitySettingsView() {
    const preferences = usePreferences();

    const updateLabelColors = (val: boolean) =>
        preferences.accessibility.labelColors = val;

    const updateMatchLabelColors = (val: boolean) =>
        preferences.accessibility.matchLabelColors = val;

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

    return (
        <ScrollView style={settingsViewStyles.container}>
            <TableView>
                <Section header="Class Color Labels" footer="These settings would add labels to the class display in order to assist users that have trouble differentiating the different colors in identifying the block colors">
                    <Cell title="Text Labels for Colors" cellAccessoryView={TextLabelsSwitch} />
                    <Cell title="Match Colors on Labels" cellAccessoryView={MatchColorsSwitch} isDisabled={!preferences.accessibility.labelColors} />
                </Section>
            </TableView>
        </ScrollView>
    );
}