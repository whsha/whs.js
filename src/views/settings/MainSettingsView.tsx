/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { toJS } from "mobx";
import React, { useContext } from "react";
import { Alert, Clipboard, Linking, ScrollView, View } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import useRouter from "use-react-router";
import { SinglelineHeader } from "../../components/header/SinglelineHeader";
import IconComponent from "../../components/IconComponent";
import ClearCalCacheCell from "../../components/settings/ClearCalCacheCell";
import ResetClassesCell from "../../components/settings/ClearClassesCell";
import { ClassesContext } from "../../contexts";
import { settingsViewStyles } from "../../themes/light";

export default function MainSettingsView() {
    const { history, match, location } = useRouter();
    const classes = useContext(ClassesContext);

    function navigateTo(to: string) {
        return () => history.push(to);
    }

    function openLink(link: string) {
        return () => {
            Alert.alert("Open link in browser?", undefined, [{
                onPress: () => {
                    Linking.openURL(link);
                },
                style: "default",
                text: "Open"
            },
            {
                style: "cancel",
                text: "Cancel"
            }]);
        };
    }

    const backupConfig = () => {
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
                    Alert.alert("TODO"); // TODO:
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
            <SinglelineHeader title="Settings" />
            <ScrollView>
                <TableView>
                    <Section header="Debugging Tools">
                        <Cell title="Current Match" cellStyle="RightDetail" detail={match.path} />
                        <Cell title="Current Match Exact" cellStyle="RightDetail" detail={match.isExact.toString()} />
                        <Cell title="Current Path" cellStyle="RightDetail" detail={location.pathname} />
                    </Section>
                    <Section header="Class Settings">
                        <Cell title="Configure Classes" accessory="DisclosureIndicator" onPress={navigateTo("/settings/classes")} />
                        <Cell title="Backup Classes" accessory="DetailDisclosure" onPress={backupConfig} />
                        <Cell title="Configure Lunches" accessory="DisclosureIndicator" onPress={navigateTo("/settings/lunches")} isDisabled={true} />
                    </Section>
                    <Section header="Legal">
                        <Cell title="View License" cellAccessoryView={<IconComponent name="open" />} onPress={openLink("https://github.com/DusterTheFirst/whs.js/blob/master/LICENSE")} />
                        <Cell title="View 3rd Party Licenses" accessory="DisclosureIndicator" onPress={openLink("")} isDisabled={true} />
                    </Section>
                    <Section header="App Info">
                        <Cell title="Changelog" accessory="DisclosureIndicator" onPress={navigateTo("/settings/changelog")} isDisabled={true} />
                        <Cell title="Help" accessory="Detail" onPress={navigateTo("/settings/help")} isDisabled={true} />
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