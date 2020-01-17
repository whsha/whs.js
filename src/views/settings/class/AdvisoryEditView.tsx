/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
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
import NavigationKeyboardAvoidingView from "../../../components/NavigationKeyboardAvoidingView";
import { SettingsParams } from "../../../navigators/SettingsNavigator";
import { settingsViewStyles } from "../../../styles/layout/default";
import { discardChangesAlert } from "../../../util/alerts";
import useAdvisory from "../../../util/hooks/classes/useAdvisory";
import useOverrideBackButton from "../../../util/hooks/useOverrideBackButton";

dayjs.extend(useCustomFormat);

/** The advisory configureation view */
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
            discardChangesAlert(() => navigation.goBack());
        } else {
            navigation.goBack();
        }
    };
    const done = () => {
        save();
        navigation.navigate("ClassesList");
    };

    useOverrideBackButton(goBack);

    navigation.setOptions({
        headerLeft: () => <HeaderCancelButton onPress={goBack} />,
        headerRight: () => <HeaderSaveButton onPress={done} disabled={!updated} />
    });

    return (
        <NavigationKeyboardAvoidingView>
            <ScrollView>
                <SafeAreaView>
                    <TableView>
                        <Section header="Options">
                            <Cell cellContentView={<TextInput placeholder="Teacher" value={tempAdvisory.teacher} onChangeText={setTeacher} style={settingsViewStyles.textInput} />} />
                            <Cell cellContentView={<TextInput placeholder="Room" value={tempAdvisory.room} onChangeText={setRoom} style={settingsViewStyles.textInput} />} />
                        </Section>
                        <Section header="Example">
                            <Cell cellContentView={<AdvisoryComponent teacher={tempAdvisory.teacher} room={tempAdvisory.room} start={dayjs("9:38 AM", "h:mm A")} end={dayjs("9:46 AM", "h:mm A")} />} />
                        </Section>
                    </TableView>
                </SafeAreaView>
            </ScrollView>
        </NavigationKeyboardAvoidingView>
    );
}