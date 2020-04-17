/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import useCustomFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import AdvisoryComponent from "../../../components/blocks/AdvisoryComponent";
import { HeaderCancelButton, HeaderSaveButton } from "../../../components/header/HeaderButtons";
import NavigationKeyboardAvoidingView from "../../../components/NavigationKeyboardAvoidingView";
import { SettingsParams } from "../../../navigators/SettingsNavigator";
import { SettingsTextInput } from "../../../styles/components/settings";
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
                            <Cell cellContentView={<SettingsTextInput placeholder="Teacher" value={tempAdvisory.teacher} onChangeText={setTeacher} />} />
                            <Cell cellContentView={<SettingsTextInput placeholder="Room" value={tempAdvisory.room} onChangeText={setRoom} />} />
                        </Section>
                        <Section header="Example">
                            <Cell cellContentView={<AdvisoryComponent teacher={tempAdvisory.teacher} room={tempAdvisory.room} />} />
                        </Section>
                    </TableView>
                </SafeAreaView>
            </ScrollView>
        </NavigationKeyboardAvoidingView>
    );
}