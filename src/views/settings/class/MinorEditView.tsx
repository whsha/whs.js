/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { BlockColor } from "@whsha/classes/v1/blocks/blockColor";
import { SchoolDay } from "@whsha/classes/v1/calendar/types";
import dayjs from "dayjs";
import useCustomFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import ClassComponent from "../../../components/blocks/ClassComponent";
import { HeaderCancelButton, HeaderSaveButton } from "../../../components/header/HeaderButtons";
import NavigationKeyboardAvoidingView from "../../../components/NavigationKeyboardAvoidingView";
import BlockColorPicker from "../../../components/settings/BlockColorPicker";
import SchoolDayPicker from "../../../components/settings/SchoolDayPicker";
import { SettingsParams } from "../../../navigators/SettingsNavigator";
import { SettingsTextInput } from "../../../styles/components/settings";
import { RedCell } from "../../../styles/components/tableview";
import { deleteClassAlert, discardChangesAlert } from "../../../util/alerts";
import { useMinor } from "../../../util/hooks/classes/useMinor";
import useOverrideBackButton from "../../../util/hooks/useOverrideBackButton";

dayjs.extend(useCustomFormat);

/** The minor configure view */
export default function MinorEditView() {
    const route = useRoute<RouteProp<SettingsParams, "ConfigureMinor">>();
    const navigation = useNavigation<StackNavigationProp<SettingsParams, "ConfigureMinor">>();

    const minor = useMinor(route.params.minorId);

    const goBack = () => {
        if (minor.updated) {
            discardChangesAlert(() => navigation.goBack());
        } else {
            navigation.goBack();
        }
    };
    const done = () => {
        minor.save();
        navigation.goBack();
    };

    useOverrideBackButton(goBack);

    navigation.setOptions({
        headerLeft: () => <HeaderCancelButton onPress={goBack} />,
        headerRight: () => <HeaderSaveButton onPress={done} disabled={!minor.updated} />,
    });

    const pomptDelete = () =>
        deleteClassAlert(() => {
            minor.delete();
            navigation.goBack();
        });

    const updateBlock = (block: BlockColor) => minor.update({ block });
    const updateName = (name: string) => minor.update({ name });
    const updateRoom = (room: string) => minor.update({ room });
    const updateTeacher = (teacher: string) => minor.update({ teacher });

    const toggleMeet = (day: SchoolDay) => minor.update(pre => ({ meets: { ...pre.meets, [day]: !pre.meets[day] } }));

    return (
        <NavigationKeyboardAvoidingView>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <SafeAreaView>
                    <TableView>
                        <BlockColorPicker value={minor.tempValue.block} onPick={updateBlock} hasNone={true} />
                        <SchoolDayPicker value={minor.tempValue.meets} onToggle={toggleMeet} blockColorRestraint={minor.tempValue.block} />
                        <Section header="Basic Info">
                            <Cell cellContentView={<SettingsTextInput placeholder="Class Name" value={minor.tempValue.name} onChangeText={updateName} />} />
                            <Cell cellContentView={<SettingsTextInput placeholder="Teacher" value={minor.tempValue.teacher} onChangeText={updateTeacher} />} />
                            <Cell cellContentView={<SettingsTextInput placeholder="Room" value={minor.tempValue.room} onChangeText={updateRoom} />} />
                        </Section>
                        <Section header="Example">
                            <Cell cellContentView={<ClassComponent block={minor.tempValue.block} name={minor.tempValue.name} room={minor.tempValue.room} teacher={minor.tempValue.teacher} />} />
                        </Section>
                        <Section>
                            <RedCell title={"Delete"} onPress={pomptDelete} />
                        </Section>
                    </TableView>
                </SafeAreaView>
            </ScrollView>
        </NavigationKeyboardAvoidingView>
    );
}