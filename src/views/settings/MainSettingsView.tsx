/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import migratetov2 from "@whsha/classes/migrate/tov2";
import parsev1 from "@whsha/classes/v1/parse";
import { ClassesStorev2 } from "@whsha/classes/v2/store";
import { default as Constants } from "expo-constants";
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
import withHaptics from "../../util/withHaptics";

/** The main settings view */
export default function MainSettingsView() {
    const navigation = useNavigation<StackNavigationProp<SettingsParams>>();
    const classes = useClasses();

    const navigateTo = (to: keyof SettingsParams) =>
        () => navigation.navigate(to);

    const exportClasses = () => {
        // Save the classes to the clipboard
        Clipboard.setString(classes.saved.toString());
        // Alert the user about it
        copiedToClipboardAlert();
    };

    const importClasses = () => importFromClipboardAlert(() => {
        // Load the classes from the clipboard
        Clipboard.getString().then((str) => {
            // Parse them
            const store = ClassesStorev2.fromString(str);
            // And deal with the result
            store.unwrap(
                (newClasses) => {
                    // Load the classes into the temp classes store
                    classes.temp.hydrateFrom(newClasses);

                    // Finally, navigate to the list as to save the classes
                    navigation.navigate("ClassesList");
                },
                // Alert the user of the bad classes
                (err) => invalidClassesAlert(err.message)
            );
        }).catch((e) => console.error(e));
    });

    // TODO: Phase Out
    const exportLegacyClasses = () => void AsyncStorage.getItem(StorageKey.ClassesV1)
        .then((classesv1) => {
            Clipboard.setString(classesv1 ?? "");
            copiedToClipboardAlert();
        }).catch((e) => console.error(e));

    // TODO: Phase Out
    const importLegacyClasses = () => importFromClipboardAlert(() =>
        Clipboard.getString().then((str) => {
            // try {
            const oldClasses = parsev1(JSON.parse(str));
            const newClasses = migratetov2(oldClasses);
            classes.temp.hydrateFrom(newClasses);

            navigation.navigate("ClassesList");
            // } catch {
            //     invalidClassesAlert();
            // }
        }).catch((e) => console.error(e))
    );

    return (
        <SettingsScrollView>
            <TableView>
                <Section header="Class Settings">
                    <Cell title="Edit Classes" accessory="DisclosureIndicator" onPress={withHaptics(navigateTo("ClassesList"))} />
                    <Cell title="Export Classes" accessory="DisclosureIndicator" onPress={withHaptics(exportClasses)} />
                    <Cell title="Import Classes" accessory="DisclosureIndicator" onPress={withHaptics(importClasses)} />
                </Section>
                <Section header="Legacy Class Tools">
                    <RedCell title="Recover Legacy Classes" accessory="DisclosureIndicator" onPress={withHaptics(exportLegacyClasses)} />
                    <RedCell title="Import Legacy Classes" accessory="DisclosureIndicator" onPress={withHaptics(importLegacyClasses)} />
                </Section>
                <Section header="Accessibility">
                    <Cell title="Accessibility Options" accessory="DisclosureIndicator" onPress={withHaptics(navigateTo("Accessibility"))} />
                </Section>
                <Section header="App Info">
                    <Cell title="Credits" accessory="DisclosureIndicator" onPress={withHaptics(navigateTo("Credits"))} />
                    <Cell title="Links" accessory="DisclosureIndicator" onPress={withHaptics(navigateTo("Links"))} />
                    <Cell title="Version" cellAccessoryView={<DimText>{Constants.nativeAppVersion} ({Constants.manifest.releaseChannel as string})</DimText>} />
                </Section>
                <Section header="Reset" footer="If your schedule shows up incorrectly, clearing the caches may help.">
                    <ClearCalCacheCell />
                </Section>
            </TableView>
        </SettingsScrollView>
    );
}