/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { Cell, TableView } from "react-native-tableview-simple";
import useRouter from "use-react-router";
import { HeaderCancelButton, HeaderSaveButton } from "../../../components/header/HeaderButtons";
import { SinglelineHeader } from "../../../components/header/SinglelineHeader";
import { settingsViewStyles } from "../../../themes/light";

export default function ClassEditView() {
    const { match } = useRouter<{ id: string }>();

    const { history } = useRouter();

    const goBack = () => history.goBack();
    const done = () => history.push("/settings/classes");

    return (
        <SafeAreaView style={settingsViewStyles.container}>
            <SinglelineHeader title="Edit Major" leftButton={<HeaderCancelButton onPress={goBack} />} rightButton={<HeaderSaveButton onPress={done} disabled={true/* TODO */} />} />
            <ScrollView>
                <TableView>
                    <Text>{JSON.stringify(match.params.id, undefined, 4)}</Text>
                    <Cell title={"Delete"}/>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
}