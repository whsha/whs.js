/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import useCustomFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { Alert, SafeAreaView, ScrollView, TextInput } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import AdvisoryComponent from "../../../components/blocks/AdvisoryComponent";
import { HeaderCancelButton, HeaderSaveButton } from "../../../components/header/HeaderButtons";
import { settingsViewStyles } from "../../../layout/default";
import useAdvisory from "../../../util/hooks/classes/useAdvisory";
import { SettingsParams } from "../../SettingsView";

dayjs.extend(useCustomFormat);

export default function AdvisoryConfigureView() {
    const navigation = useNavigation<StackNavigationProp<SettingsParams>>();
    const {
        save,
        setRoom,
        setTeacher,
        tempAdvisory,
        updated
    } = useAdvisory();

    const goBack = () => {
        if (updated) {
            Alert.alert("Discard Changes?", "If you continue without saving your changes, they will all be lost", [
                {
                    style: "default",
                    text: "Cancel"
                },
                {
                    style: "destructive",
                    text: "Discard Changes",
                    onPress() {
                        navigation.goBack();
                    }
                }
            ]);
        } else {
            navigation.goBack();
        }
    };
    const done = () => {
        save();
        navigation.navigate("ClassesList");
    };

    navigation.setOptions({
        headerLeft: () => <HeaderCancelButton onPress={goBack} />,
        headerRight: () => <HeaderSaveButton onPress={done} disabled={!updated} />
    });

    return (
        <SafeAreaView style={settingsViewStyles.container}>
            <ScrollView>
                <TableView>
                    <Section header="Options">
                        <Cell title="Teacher" cellAccessoryView={<TextInput placeholder="Mr. Teach" value={tempAdvisory.teacher} onChangeText={setTeacher} style={settingsViewStyles.textInput} />} />
                        <Cell title="Room" cellAccessoryView={<TextInput placeholder="107" value={tempAdvisory.room} onChangeText={setRoom} style={settingsViewStyles.textInput} />} />
                    </Section>
                    <Section header="Example">
                        <Cell cellContentView={<AdvisoryComponent teacher={tempAdvisory.teacher} room={tempAdvisory.room} start={dayjs("9:38 AM", "h:mm A")} end={dayjs("9:46 AM", "h:mm A")} />} />
                    </Section>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
}