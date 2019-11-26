/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import Constants from "expo-constants";
import { observable, toJS } from "mobx";
import { useObserver } from "mobx-react-lite";
import React, { useContext } from "react";
import { Alert, Clipboard, Linking, ScrollView, Switch, Text, View } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import IconComponent from "../../components/IconComponent";
import ClearCalCacheCell from "../../components/settings/ClearCalCacheCell";
import ResetClassesCell from "../../components/settings/ClearClassesCell";
import { TempClassesContext } from "../../contexts";
import { settingsViewStyles } from "../../layout/default";
import ClassesStore from "../../stores/classesStore";
import { openLinkInBrowserAlert } from "../../util/alerts";
import usePreferences from "../../util/hooks/usePreferences";
import { SettingsParams } from "../SettingsView";

/** The main settings view */
export default function MainSettingsView() {
    const navigation = useNavigation<StackNavigationProp<SettingsParams>>();
    const tempClasses = useContext(TempClassesContext);
    const preferences = usePreferences();

    const navigateTo = (to: keyof SettingsParams) =>
        () => navigation.navigate(to);

    const openLink = (link: string) =>
        () => openLinkInBrowserAlert(() => Linking.openURL(link));

    const backupClasses = () => {
        Clipboard.setString(JSON.stringify(toJS(tempClasses, { recurseEverything: true })));
        Alert.alert("Copied to clipboard!", "Save this somewhere safe incase you need to reuse it");
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
                                || parsed.minors === undefined) {
                                throw new Error();
                            }
                            tempClasses.DRs = observable.map(parsed.DRs);
                            tempClasses.advisory = parsed.advisory;
                            tempClasses.majors = observable.map(parsed.majors);
                            tempClasses.minors = observable.map(parsed.minors);

                            navigation.navigate("ClassesList");
                        } catch {
                            Alert.alert("Failed to load from clipboard", "The clipboard contents were not valid classes or there was a problem loading them");
                        }
                    });
                }
            }
        ]);
    };

    const updateLabelColors = (val: boolean) =>
        preferences.accessability.labelColors = val;

    return (
        <View style={settingsViewStyles.container}>
            <ScrollView>
                <TableView>
                    <Section header="Class Settings">
                        <Cell title="Configure Classes" accessory="DisclosureIndicator" onPress={navigateTo("ClassesList")} />
                        <Cell title="Configure Lunches" accessory="DisclosureIndicator" /* onPress={navigateTo("LunchesSettings")} */ isDisabled={true} />
                        <Cell title="Backup Classes" accessory="DisclosureIndicator" onPress={backupClasses} />
                        <Cell title="Load Classes" accessory="DisclosureIndicator" onPress={loadClasses} />
                    </Section>
                    <Section header="Accessability">
                        <Cell title="Label Colors" cellAccessoryView={useObserver(() => <Switch value={preferences.accessability.labelColors} onValueChange={updateLabelColors} />)} />
                    </Section>
                    <Section header="Legal">
                        <Cell title="View License" cellAccessoryView={<IconComponent name="open" />} onPress={openLink("https://github.com/DusterTheFirst/whs.js/blob/master/LICENSE")} />
                        <Cell title="View 3rd Party Licenses" cellAccessoryView={<IconComponent name="open" />} onPress={openLink("")} isDisabled={true} />
                    </Section>
                    <Section header="App Info">
                        <Cell title="Help" accessory="Detail" /* onPress={navigateTo("HelpView")} */ isDisabled={true} />
                        <Cell title="Source Code" cellAccessoryView={<IconComponent name="open" />} onPress={openLink("https://github.com/DusterTheFirst/whs.js")} />
                        <Cell title="Changelog" accessory="DisclosureIndicator" /* onPress={navigateTo("ChangelogView")} */ isDisabled={true} />
                        <Cell title="Version" cellAccessoryView={<Text>{Constants.nativeAppVersion}</Text>} />
                        <Cell title="Build" cellAccessoryView={<Text>{Constants.nativeBuildVersion}</Text>} />
                        <Cell title="Release Channel" cellAccessoryView={<Text>{Constants.manifest.releaseChannel as string}</Text>} />
                    </Section>
                    <Section header="Clear" footer="If your schedule shows up incorrectly, clearing the caches may help.">
                        <ClearCalCacheCell />
                        <ResetClassesCell />
                    </Section>
                </TableView>
            </ScrollView>
        </View>
    );
}