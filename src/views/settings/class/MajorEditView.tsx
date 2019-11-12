/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Alert, SafeAreaView, ScrollView, Text, TextInput } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { HeaderCancelButton, HeaderSaveButton } from "../../../components/header/HeaderButtons";
import BlockColorPicker from "../../../components/settings/BlockColorPicker";
import { settingsViewStyles, tableViewStyle } from "../../../layout/default";
import { BlockColor } from "../../../util/blocks/blockColor";
import { useMajor } from "../../../util/hooks/classes/useMajor";
import { SettingsParams } from "../../SettingsView";

export default function MajorEditView() {
    const route = useRoute<RouteProp<SettingsParams, "ConfigureMajor">>();
    const navigation = useNavigation<StackNavigationProp<SettingsParams, "ConfigureMajor">>();

    const major = useMajor(route.params.majorId);

    const goBack = () => {
        if (major.updated) {
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
        major.save();
        navigation.navigate("ClassesList");
    };

    navigation.setOptions({
        headerLeft: () => <HeaderCancelButton onPress={goBack} />,
        headerRight: () => <HeaderSaveButton onPress={done} disabled={!major.updated} />,
        headerTitle: route.params.majorId.substring(0, 5)
    });

    const pomptDelete = () => {
        Alert.alert("Are you sure you want to delete this class?", "This action is irreversable", [
            {
                style: "destructive",
                text: "Delete",
                onPress() {
                    major.delete();
                    navigation.goBack();
                }
            },
            {
                style: "cancel",
                text: "Cancel"
            }
        ]);
    };

    const pick = (block: BlockColor) => major.update({ block });

    const updateTeacher = (teacher: string) => major.update({teacher})

    return (
        <SafeAreaView style={settingsViewStyles.container}>
            <ScrollView>
                <TableView>
                    <Section header="Color Block">
                        <Cell cellContentView={<BlockColorPicker value={major.tempValue.block} onPick={pick} />} />
                    </Section>
                    <Section header="Basic Info">
                        <Cell title="Teacher" cellAccessoryView={<TextInput placeholder="Mrs. Teach" value={major.tempValue.teacher} onChangeText={updateTeacher} style={settingsViewStyles.textInput}/>} />
                        <Cell cellContentView={<Text>{JSON.stringify(major, undefined, 4)}</Text>} />
                    </Section>
                    <Section>
                        <Cell title={"Delete"} titleTextStyle={tableViewStyle.redbutton} onPress={pomptDelete} />
                    </Section>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
}