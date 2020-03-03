/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { parsev1 } from "@whsha/classes/migrate/parse";
import migratetov2 from "@whsha/classes/migrate/tov2";
import { default as Constants } from "expo-constants";
import { toJS } from "mobx";
import React from "react";
import { AsyncStorage, Clipboard } from "react-native";
import ClearCalCacheCell from "../../components/settings/ClearCalCacheCell";
import { SettingsParams } from "../../navigators/SettingsNavigator";
import StorageKey from "../../storageKey";
import { DimText } from "../../styles/components/common";
import { SettingsScrollView } from "../../styles/components/settings";
import { Cell, RedCell, Section, TableView } from "../../styles/components/tableview";
import { copiedToClipboardAlert, importFromClipboardAlert, invalidClassesAlert } from "../../util/alerts";
import useClasses from "../../util/hooks/useClasses";

/** The main settings view */
export default function MainSettingsView() {
    const navigation = useNavigation<StackNavigationProp<SettingsParams>>();
    const classes = useClasses();

    const navigateTo = (to: keyof SettingsParams) =>
        () => navigation.navigate(to);

    const exportClasses = () => {
        Clipboard.setString(JSON.stringify(toJS(classes.saved, { recurseEverything: true })));
        copiedToClipboardAlert();
    };

    const exportLegacyClasses = () => {
        AsyncStorage.getItem(StorageKey.ClassesV1).then((classesv1) => {
            Clipboard.setString(classesv1 ?? "");
            copiedToClipboardAlert();
        }).catch((e) => console.error(e));
    };

    const importLegacyClasses = () => importFromClipboardAlert(() =>
        Clipboard.getString().then((str) => {
            try {
                const oldClasses = parsev1(JSON.parse(str));
                const newClasses = migratetov2(oldClasses);
                classes.temp.hydrateFrom(newClasses);

                navigation.navigate("ClassesList");
            } catch {
                invalidClassesAlert();
            }
        }).catch((e) => console.error(e))
    );

    return (
        <SettingsScrollView>
            <TableView>
                <Section header="Class Settings">
                    <Cell title="Edit Classes" accessory="DisclosureIndicator" onPress={navigateTo("ClassesList")} />
                    <Cell title="Export Classes" accessory="DisclosureIndicator" onPress={exportClasses} />
                    <Cell title="Import Classes" accessory="DisclosureIndicator" isDisabled={true} />
                    <RedCell title="Recover Legacy Classes" accessory="DisclosureIndicator" onPress={exportLegacyClasses} />
                    <RedCell title="Import Legacy Classes" accessory="DisclosureIndicator" onPress={importLegacyClasses} />
                </Section>
                <Section header="Accessibility">
                    <Cell title="Accessibility Options" accessory="DisclosureIndicator" onPress={navigateTo("Accessibility")} />
                </Section>
                <Section header="App Info">
                    <Cell title="Credits" accessory="DisclosureIndicator" onPress={navigateTo("Credits")} />
                    <Cell title="Links" accessory="DisclosureIndicator" onPress={navigateTo("Links")} />
                    <Cell title="Version" cellAccessoryView={<DimText>{Constants.nativeAppVersion} ({Constants.manifest.releaseChannel as string})</DimText>} />
                </Section>
                <Section header="Reset" footer="If your schedule shows up incorrectly, clearing the caches may help.">
                    <ClearCalCacheCell />
                </Section>
            </TableView>
        </SettingsScrollView>
    );
}