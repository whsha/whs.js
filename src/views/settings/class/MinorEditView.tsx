/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import useCustomFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { SafeAreaView, ScrollView, TextInput } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import ClassComponent from "../../../components/blocks/ClassComponent";
import { HeaderCancelButton, HeaderSaveButton } from "../../../components/header/HeaderButtons";
import BlockColorPicker from "../../../components/settings/BlockColorPicker";
import SchoolDayPicker from "../../../components/settings/SchoolDayPicker";
import { SettingsParams } from "../../../navigators/SettingsNavigator";
import { classesStyle, settingsViewStyles, tableViewStyle } from "../../../styles/layout/default";
import { deleteClassAlert, discardChangesAlert } from "../../../util/alerts";
import { BlockColor } from "../../../util/blocks/blockColor";
import { SchoolDay } from "../../../util/calendar/types";
import { useMinor } from "../../../util/hooks/classes/useMinor";
import useNoHardwareBack from "../../../util/hooks/useNoHardwareBack";

dayjs.extend(useCustomFormat);

/** The minor configure view */
export default function MinorEditView() {
    useNoHardwareBack();
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
        <SafeAreaView style={settingsViewStyles.container}>
            <ScrollView>
                <TableView>
                    <BlockColorPicker value={minor.tempValue.block} onPick={updateBlock} hasNone={true} />
                    <SchoolDayPicker value={minor.tempValue.meets} onToggle={toggleMeet} blockColorRestraint={minor.tempValue.block} />
                    <Section header="Basic Info">
                        <Cell cellContentView={<TextInput placeholder="Class Name" value={minor.tempValue.name} onChangeText={updateName} style={settingsViewStyles.textInput} />} />
                        <Cell cellContentView={<TextInput placeholder="Teacher" value={minor.tempValue.teacher} onChangeText={updateTeacher} style={settingsViewStyles.textInput} />} />
                        <Cell cellContentView={<TextInput placeholder="Room" value={minor.tempValue.room} onChangeText={updateRoom} style={settingsViewStyles.textInput} />} />
                    </Section>
                    <Section header="Example">
                        <Cell cellContentView={<ClassComponent block={minor.tempValue.block} name={minor.tempValue.name} room={minor.tempValue.room} teacher={minor.tempValue.teacher} start={dayjs("9:51 AM", "h:mm A")} end={dayjs("10:50 AM", "h:mm A")} style={classesStyle.outerContainerEditView} />} />
                    </Section>
                    <Section>
                        <Cell title={"Delete"} titleTextStyle={tableViewStyle.redbutton} onPress={pomptDelete} />
                    </Section>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
}