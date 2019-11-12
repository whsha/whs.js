/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Alert, SafeAreaView, ScrollView, TextInput } from "react-native";
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

    const goBack = () => navigation.goBack();
    const done = () => {
        major.save();
        navigation.navigate("ClassesList");
    };

    navigation.setOptions({
        headerLeft: () => <HeaderCancelButton onPress={goBack} />,
        headerRight: () => <HeaderSaveButton onPress={done} disabled={!major.updated} />,
    });

    const pomptDelete = () => {
        Alert.alert("Are you sure you want to delete this class?", "This action is irreverable", [
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

    return (
        <SafeAreaView style={settingsViewStyles.container}>
            <ScrollView>
                <TableView>
                    <Section header="Color Block">
                        <Cell cellContentView={<BlockColorPicker value={major.tempValue.block} onPick={pick} />} />
                    </Section>
                    <Section header="Basic Info">
                        <Cell title="Teacher" cellAccessoryView={<TextInput />} />
                        <Cell title={JSON.stringify(major)} />
                    </Section>
                    <Section>
                        <Cell title={"Delete"} titleTextStyle={tableViewStyle.redbutton} onPress={pomptDelete} />
                    </Section>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
}