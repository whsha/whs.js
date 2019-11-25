/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
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
import { settingsViewStyles, tableViewStyle } from "../../../layout/default";
import { deleteClassAlert, discardChangesAlert } from "../../../util/alerts";
import { BlockColor } from "../../../util/blocks/blockColor";
import { SchoolDay } from "../../../util/calendar/types";
import { useDR } from "../../../util/hooks/classes/useDR";
import useNoHardwareBack from "../../../util/hooks/useNoHardwareBack";
import { replaceSpaceWithNBSP } from "../../../util/textUtils";
import { SettingsParams } from "../../SettingsView";

dayjs.extend(useCustomFormat);

/** The dr configure view */
export default function DREditView() {
    useNoHardwareBack();
    const route = useRoute<RouteProp<SettingsParams, "ConfigureDR">>();
    const navigation = useNavigation<StackNavigationProp<SettingsParams, "ConfigureDR">>();

    const DR = useDR(route.params.drId);

    const goBack = () => {
        if (DR.updated) {
            discardChangesAlert(() => navigation.goBack());
        } else {
            navigation.goBack();
        }
    };
    const done = () => {
        DR.save();
        navigation.goBack();
    };

    navigation.setOptions({
        headerLeft: () => <HeaderCancelButton onPress={goBack} />,
        headerRight: () => <HeaderSaveButton onPress={done} disabled={!DR.updated} />,
    });

    const pomptDelete = () =>
        deleteClassAlert(() => {
            DR.delete();
            navigation.goBack();
        });

    const updateBlock = (block: BlockColor) => DR.update({ block });
    const updateRoom = (room: string) => DR.update({ room });
    const updateTeacher = (teacher: string) => DR.update({ teacher });

    const toggleMeet = (day: SchoolDay) => DR.update(pre => ({ meets: { ...pre.meets, [day]: !pre.meets[day] } }));

    return (
        <SafeAreaView style={settingsViewStyles.container}>
            <ScrollView>
                <TableView>
                    <Section header="Color Block">
                        <Cell cellContentView={<BlockColorPicker value={DR.tempValue.block} onPick={updateBlock} />} />
                    </Section>
                    <Section header="School Days">
                        <Cell cellContentView={<SchoolDayPicker value={DR.tempValue.meets} onToggle={toggleMeet} blockColorRestraint={DR.tempValue.block} />} />
                    </Section>
                    <Section header="Basic Info">
                        <Cell title="Teacher" cellAccessoryView={<TextInput placeholder="Mrs. Teach" value={replaceSpaceWithNBSP(DR.tempValue.teacher)} onChangeText={updateTeacher} style={settingsViewStyles.textInput} />} />
                        <Cell title="Room" cellAccessoryView={<TextInput placeholder="437" value={replaceSpaceWithNBSP(DR.tempValue.room)} onChangeText={updateRoom} style={settingsViewStyles.textInput} />} />
                    </Section>
                    <Section header="Example">
                        <Cell cellAccessoryView={<ClassComponent block={DR.tempValue.block} name="DR" room={DR.tempValue.room} teacher={DR.tempValue.teacher} start={dayjs("9:51 AM", "h:mm A")} end={dayjs("10:50 AM", "h:mm A")} />} />
                    </Section>
                    <Section>
                        <Cell title={"Delete"} titleTextStyle={tableViewStyle.redbutton} onPress={pomptDelete} />
                    </Section>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
}