/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import dayjs from "dayjs";
import useCustomFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { SafeAreaView, ScrollView, TextInput } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import AdvisoryComponent from "../../../components/blocks/AdvisoryComponent";
// import { HeaderCancelButton, HeaderSaveButton } from "../../../components/header/HeaderButtons";
// import { SinglelineHeader } from "../../../components/header/SinglelineHeader";
import { settingsViewStyles } from "../../../themes/light";
import useAdvisory from "../../../util/hooks/classes/useAdvisory";

dayjs.extend(useCustomFormat);

export default function AdvisoryConfigureView() {
    // const { history } = useRouter();
    let {
        // save,
        setRoom,
        setTeacher,
        tempAdvisory,
        // updated
    } = useAdvisory();

    // const goBack = () => void 0;// history.push("/settings/classes");
    // const done = () => {
        // save();
        // history.push("/settings/classes");
    // };

    return (
        <SafeAreaView style={settingsViewStyles.container}>
            {/* <SinglelineHeader title="Advisory Settings" leftButton={<HeaderCancelButton onPress={goBack}/>} rightButton={<HeaderSaveButton onPress={done} disabled={!updated}/>} /> */}
            <ScrollView>
                <TableView>
                    <Section header="Options">
                        <Cell title="Teacher" cellAccessoryView={<TextInput value={tempAdvisory.teacher} onChangeText={setTeacher} style={settingsViewStyles.textInput} />} />
                        <Cell title="Room" cellAccessoryView={<TextInput value={tempAdvisory.room} onChangeText={setRoom} style={settingsViewStyles.textInput} />} />
                    </Section>
                    <Section header="Example">
                        <Cell cellContentView={<AdvisoryComponent teacher={tempAdvisory.teacher} room={tempAdvisory.room} start={dayjs("9:38 AM", "h:mm A")} end={dayjs("9:46 AM", "h:mm A")}/>} />
                    </Section>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
}