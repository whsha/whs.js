/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import useCustomFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { ScrollView, TextInput, SafeAreaView } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import ClassComponent from "../../../components/blocks/ClassComponent";
import { HeaderCancelButton, HeaderSaveButton } from "../../../components/header/HeaderButtons";
import NavigationKeyboardAvoidingView from "../../../components/NavigationKeyboardAvoidingView";
import BlockColorPicker from "../../../components/settings/BlockColorPicker";
import { SettingsParams } from "../../../navigators/SettingsNavigator";
import { classesStyle, settingsViewStyles, tableViewStyle } from "../../../styles/layout/default";
import { deleteClassAlert, discardChangesAlert } from "../../../util/alerts";
import { BlockColor } from "../../../util/blocks/blockColor";
import { useMajor } from "../../../util/hooks/classes/useMajor";
import useOverrideBackButton from "../../../util/hooks/useOverrideBackButton";

dayjs.extend(useCustomFormat);

/** The major config view */
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
        navigation.goBack();
    };

    useOverrideBackButton(goBack);

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
        <NavigationKeyboardAvoidingView>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <SafeAreaView>
                    <TableView>
                        <BlockColorPicker value={major.tempValue.block} onPick={updateBlock} />
                        <Section header="Basic Info">
                            <Cell cellContentView={<TextInput placeholder="Class Name" value={major.tempValue.name} onChangeText={updateName} style={settingsViewStyles.textInput} numberOfLines={1} />} />
                            <Cell cellContentView={<TextInput placeholder="Teacher" value={major.tempValue.teacher} onChangeText={updateTeacher} style={settingsViewStyles.textInput} />} />
                            <Cell cellContentView={<TextInput placeholder="Room" value={major.tempValue.room} onChangeText={updateRoom} style={settingsViewStyles.textInput} />} />
                            <Cell title="Has a lab block?" accessory={major.tempValue.lab ? "Checkmark" : undefined} onPress={toggleLab} />
                        </Section>
                        <Section header="Example">
                            <Cell cellContentView={<ClassComponent block={major.tempValue.block} name={major.tempValue.name} room={major.tempValue.room} teacher={major.tempValue.teacher} start={dayjs("9:51 AM", "h:mm A")} end={dayjs("10:50 AM", "h:mm A")} style={classesStyle.outerContainerEditView} />} />
                        </Section>
                        <Section>
                            <Cell title={"Delete"} titleTextStyle={tableViewStyle.redbutton} onPress={pomptDelete} />
                        </Section>
                    </TableView>
                </SafeAreaView>
            </ScrollView>
        </NavigationKeyboardAvoidingView>
    );
}