/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import useCustomFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { SafeAreaView, ScrollView, TextInput } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import AdvisoryComponent from "../../../components/blocks/AdvisoryComponent";
import { HeaderCancelButton, HeaderSaveButton } from "../../../components/header/HeaderButtons";
import { settingsViewStyles } from "../../../layout/default";
import { discardChangesAlert } from "../../../util/alerts";
import useAdvisory from "../../../util/hooks/classes/useAdvisory";
import useNoHardwareBack from "../../../util/hooks/useNoHardwareBack";
import { replaceSpaceWithNBSP } from "../../../util/textUtils";
import { SettingsParams } from "../../SettingsView";

dayjs.extend(useCustomFormat);

/** The advisory configureation view */
export default function AdvisoryConfigureView() {
    useNoHardwareBack();

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
           discardChangesAlert(() => navigation.goBack());
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
                        <Cell title="Teacher" cellAccessoryView={<TextInput placeholder="Mr. Teach" value={replaceSpaceWithNBSP(tempAdvisory.teacher)} onChangeText={setTeacher} style={settingsViewStyles.textInput} />} />
                        <Cell title="Room" cellAccessoryView={<TextInput placeholder="107" value={replaceSpaceWithNBSP(tempAdvisory.room)} onChangeText={setRoom} style={settingsViewStyles.textInput} />} />
                    </Section>
                    <Section header="Example">
                        <Cell cellContentView={<AdvisoryComponent teacher={tempAdvisory.teacher} room={tempAdvisory.room} start={dayjs("9:38 AM", "h:mm A")} end={dayjs("9:46 AM", "h:mm A")} />} />
                    </Section>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
}