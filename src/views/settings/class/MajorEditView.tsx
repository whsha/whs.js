/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { SafeAreaView, ScrollView, TextInput } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { HeaderCancelButton, HeaderSaveButton } from "../../../components/header/HeaderButtons";
import BlockColorPicker from "../../../components/settings/BlockColorPicker";
import { settingsViewStyles, tableViewStyle } from "../../../layout/default";
import { deleteClassAlert, discardChangesAlert } from "../../../util/alerts";
import { BlockColor } from "../../../util/blocks/blockColor";
import { useMajor } from "../../../util/hooks/classes/useMajor";
import { replaceSpaceWithNBSP } from "../../../util/textUtils";
import { SettingsParams } from "../../SettingsView";

export default function MajorEditView() {
    const route = useRoute<RouteProp<SettingsParams, "ConfigureMajor">>();
    const navigation = useNavigation<StackNavigationProp<SettingsParams, "ConfigureMajor">>();

    const major = useMajor(route.params.majorId);

    const goBack = () => {
        if (major.updated) {
            discardChangesAlert(() => navigation.goBack());
        } else {
            navigation.goBack();
        }
    };
    const done = () => {
        major.save();
        navigation.navigate("ClassesList");
    };

    navigation.setOptions({
        headerLeft: () => <HeaderCancelButton onPress={goBack} />,
        headerRight: () => <HeaderSaveButton onPress={done} disabled={!major.updated} />,
    });

    const pomptDelete = () =>
        deleteClassAlert(() => {
            major.delete();
            navigation.goBack();
        });

    const updateBlock = (block: BlockColor) => major.update({ block });
    const toggleLab = () => major.update(pre => ({ lab: !pre.lab }));
    const updateName = (name: string) => major.update({ name });
    const updateRoom = (room: string) => major.update({ room });
    const updateTeacher = (teacher: string) => major.update({ teacher });

    return (
        <SafeAreaView style={settingsViewStyles.container}>
            <ScrollView>
                <TableView>
                    <Section header="Color Block">
                        <Cell cellContentView={<BlockColorPicker value={major.tempValue.block} onPick={updateBlock} />} />
                    </Section>
                    <Section header="Basic Info">
                        <Cell title="Name" cellAccessoryView={<TextInput placeholder="ACP US History" value={replaceSpaceWithNBSP(major.tempValue.name)} onChangeText={updateName} style={settingsViewStyles.textInput} />} />
                        <Cell title="Teacher" cellAccessoryView={<TextInput placeholder="Mrs. Teach" value={replaceSpaceWithNBSP(major.tempValue.teacher)} onChangeText={updateTeacher} style={settingsViewStyles.textInput} />} />
                        <Cell title="Room" cellAccessoryView={<TextInput placeholder="107" value={replaceSpaceWithNBSP(major.tempValue.room)} onChangeText={updateRoom} style={settingsViewStyles.textInput} />} />
                        <Cell title="Has a lab block?" accessory={major.tempValue.lab ? "Checkmark" : undefined} onPress={toggleLab} />
                        {/* <Cell cellContentView={<Text>{JSON.stringify(major, undefined, 4)}</Text>} /> */}
                    </Section>
                    <Section>
                        <Cell title={"Delete"} titleTextStyle={tableViewStyle.redbutton} onPress={pomptDelete} />
                    </Section>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
}