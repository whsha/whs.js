/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { useNavigation } from "@react-navigation/core";
import { observable, toJS } from "mobx";
import React, { useContext } from "react";
import { Alert, Clipboard, Linking, ScrollView, View } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import IconComponent from "../../components/IconComponent";
import ClearCalCacheCell from "../../components/settings/ClearCalCacheCell";
import ResetClassesCell from "../../components/settings/ClearClassesCell";
import { ClassesContext, TempClassesContext } from "../../contexts";
import { settingsViewStyles } from "../../layout/default";
import ClassesStore from "../../stores/classesStore";
import { openLinkInBrowserAlert } from "../../util/alerts";

/** The main settings view */
export default function MainSettingsView() {
    const navigation = useNavigation();
    const classes = useContext(ClassesContext);
    const tempClasses = useContext(TempClassesContext);

    const navigateTo = (to: string) =>
        () => navigation.navigate(to);

    const openLink = (link: string) =>
        () => openLinkInBrowserAlert(() => Linking.openURL(link));

    const backupConfig = () => {
        // Make seperate window for
        Alert.alert("Load or Save?", undefined, [
            {
                style: "default",
                text: "Save",
                onPress() {
                    Clipboard.setString(JSON.stringify(toJS(classes, { recurseEverything: true })));
                    Alert.alert("Copied to clipboard!", "Save this somewhere safe incase you need to reuse it");
                }
            },
            {
                style: "destructive",
                text: "Load",
                onPress() {
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
                                    try {
                                        const parsed = JSON.parse(text) as Partial<ClassesStore>;

                                        if (parsed.DRs === undefined
                                            || parsed.advisory === undefined
                                            || parsed.majors === undefined
                                            || parsed.minors === undefined) {
                                            throw new Error();
                                        }
                                        classes.DRs = observable.map(parsed.DRs);
                                        classes.advisory = parsed.advisory;
                                        classes.majors = observable.map(parsed.majors);
                                        classes.minors = observable.map(parsed.minors);
                                        tempClasses.hydrateFrom(classes);

                                        Alert.alert("Loaded!", "Make sure the classes were loaded correctly, if they were not, clear the classes and try again");
                                    } catch {
                                        Alert.alert("Failed to load from clipboard", "The clipboard contents were not valid classes or there was a problem loading them");
                                    }
                                });
                            }
                        }
                    ]);
                }
            },
            {
                style: "cancel",
                text: "Cancel"
            }
        ]);
    };

    return (
        <View style={settingsViewStyles.container}>
            <ScrollView>
                <TableView>
                    <Section header="Class Settings">
                        <Cell title="Configure Classes" accessory="DisclosureIndicator" onPress={navigateTo("ClassesList")} />
                        <Cell title="Configure Lunches" accessory="DisclosureIndicator" onPress={navigateTo("LunchesSettings")} isDisabled={true} />
                        <Cell title="Backup Classes" accessory="DisclosureIndicator" onPress={backupConfig} />
                    </Section>
                    <Section header="Legal">
                        <Cell title="View License" cellAccessoryView={<IconComponent name="open" />} onPress={openLink("https://github.com/DusterTheFirst/whs.js/blob/master/LICENSE")} />
                        <Cell title="View 3rd Party Licenses" cellAccessoryView={<IconComponent name="open" />} onPress={openLink("")} isDisabled={true} />
                    </Section>
                    <Section header="App Info">
                        <Cell title="Changelog" accessory="DisclosureIndicator" onPress={navigateTo("ChangelogView")} isDisabled={true} />
                        <Cell title="Help" accessory="Detail" onPress={navigateTo("HelpView")} isDisabled={true} />
                        <Cell title="Source Code" cellAccessoryView={<IconComponent name="open" />} onPress={openLink("https://github.com/DusterTheFirst/whs.js")} />
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