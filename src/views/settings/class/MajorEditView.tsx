/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { Alert, SafeAreaView, ScrollView, TextInput } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { HeaderCancelButton, HeaderSaveButton } from "../../../components/header/HeaderButtons";
import BlockColorPicker from "../../../components/settings/BlockColorPicker";
import { settingsViewStyles, tableViewStyle } from "../../../themes/light";
import { BlockColor } from "../../../util/blocks/blockColor";
import { useMajor } from "../../../util/hooks/classes/useMajor";

export default function ClassEditView() {
    // const { match, history } = useRouter<{ id: string }>();
    const major = useMajor(""/* match.params.id */);

    const goBack = () => void 0;// history.goBack();
    const done = () => {
        major.save();
        // history.push("/settings/classes");
    };

    const pomptDelete = () => {
        Alert.alert("Are you sure you want to delete this class?", "This action is irreverable", [
            {
                style: "destructive",
                text: "Delete",
                onPress() {
                    major.delete();
                    // history.goBack();
                }
            },
            {
                style: "cancel",
                text: "Cancel"
            }
        ]);
    };

    const pick = (block: BlockColor) => major.update({block});

    return (
        <SafeAreaView style={settingsViewStyles.container}>
            {/* <SinglelineHeader title="Edit Major" leftButton={<HeaderCancelButton onPress={goBack} />} rightButton={<HeaderSaveButton onPress={done} disabled={!major.updated} />} /> */}
            <ScrollView>
                <TableView>
                    <Section header="Color Block">
                        <Cell cellContentView={<BlockColorPicker value={major.tempValue.block} onPick={pick}/>}/>
                    </Section>
                    <Section header="Basic Info">
                        <Cell title="Teacher" cellAccessoryView={<TextInput/>}/>
                        <Cell title={JSON.stringify(major)}/>
                    </Section>
                    <Section>
                        <Cell title={"Delete"} titleTextStyle={tableViewStyle.redbutton} onPress={pomptDelete}/>
                    </Section>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
}