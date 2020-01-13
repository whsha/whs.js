/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import Constants from "expo-constants";
import { observable, toJS } from "mobx";
import React, { useContext } from "react";
import { Alert, Clipboard, Linking, ScrollView, Text } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import IconComponent from "../../components/IconComponent";
import ClearCalCacheCell from "../../components/settings/ClearCalCacheCell";
import { TempClassesContext } from "../../contexts";
import { SettingsParams } from "../../navigators/SettingsNavigator";
import ClassesStore from "../../stores/classesStore";
import { settingsViewStyles } from "../../styles/layout/default";
import { openLinkInBrowserAlert } from "../../util/alerts";

/** The main settings view */
export default function MainSettingsView() {
    const navigation = useNavigation<StackNavigationProp<SettingsParams>>();
    const tempClasses = useContext(TempClassesContext);

    const navigateTo = (to: keyof SettingsParams) =>
        () => navigation.navigate(to);

    const openLink = (link: string) =>
        () => openLinkInBrowserAlert(() => Linking.openURL(link));

    const backupClasses = () => {
        Clipboard.setString(JSON.stringify(toJS(tempClasses, { recurseEverything: true })));
        Alert.alert("Copied to clipboard!", "Save this somewhere safe in case you need to reuse it");
    };

    const loadClasses = () => {
        Alert.alert("Load from clipboard?", "Make sure you have the classes copied into your clipboard", [
            {
                style: "default",
                text: "Cancel"
            },
            {
                style: "destructive",
                text: "Load",
                onPress() {
                    Clipboard.getString().then(text => {
                        // FIXME: Clean this up
                        try {
                            const parsed = JSON.parse(text) as Partial<ClassesStore>;

                            if (parsed.DRs === undefined
                                || parsed.advisory === undefined
                                || parsed.majors === undefined
                                || parsed.minors === undefined
                                || parsed.lunches === undefined) {
                                throw new Error();
                            }
                            tempClasses.DRs = observable.map(parsed.DRs);
                            tempClasses.advisory = parsed.advisory;
                            tempClasses.majors = observable.map(parsed.majors);
                            tempClasses.minors = observable.map(parsed.minors);
                            tempClasses.lunches = parsed.lunches;

                            navigation.navigate("ClassesList");
                        } catch {
                            Alert.alert("Failed to load from clipboard", "The clipboard contents were not valid classes or there was a problem loading them");
                        }
                    }).catch((e) => console.error("Failed to get string from clipboard", e));
                }
            }
        ]);
    };

    return (
        <ScrollView style={settingsViewStyles.container}>
            <TableView>
                <Section header="Class Settings">
                    <Cell title="Edit Classes" accessory="DisclosureIndicator" onPress={navigateTo("ClassesList")} />
                    <Cell title="Backup Classes" accessory="DisclosureIndicator" onPress={backupClasses} />
                    <Cell title="Load Classes" accessory="DisclosureIndicator" onPress={loadClasses} />
                </Section>
                <Section header="Accessibility">
                    <Cell title="Accessibility Options" accessory="DisclosureIndicator" onPress={navigateTo("Accessibility")} />
                </Section>
                <Section header="App Info">
                    <Cell title="Feedback Discord Server" accessory="DisclosureIndicator" onPress={openLink("https://discord.gg/7q3TxUH")} />
                    <Cell title="Feedback Email" accessory="DisclosureIndicator" onPress={openLink("mailto:feedback@whs.dusterthefirst.com")} />
                    <Cell title="Service Status" accessory="DisclosureIndicator" onPress={openLink("https://status.whs.dusterthefirst.com/")} />
                    <Cell title="Source Code" cellAccessoryView={<IconComponent name="open" />} onPress={openLink("https://github.com/DusterTheFirst/whs.js")} />
                    <Cell title="License" cellAccessoryView={<IconComponent name="open" />} onPress={openLink("https://github.com/DusterTheFirst/whs.js/blob/master/LICENSE")} />
                    <Cell title="Privacy Policy" cellAccessoryView={<IconComponent name="open" />} onPress={openLink("https://whs.dusterthefirst.com/PRIVACY")} />
                    <Cell title="Version" cellAccessoryView={<Text>{Constants.nativeAppVersion}-{Constants.nativeBuildVersion} ({Constants.manifest.releaseChannel as string})</Text>} />
                </Section>
                <Section header="Reset" footer="If your schedule shows up incorrectly, clearing the caches may help.">
                    <ClearCalCacheCell />
                </Section>
            </TableView>
        </ScrollView>
    );
}