/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { SafeAreaView, Text, StyleSheet, ScrollView } from "react-native";
import useRouter from "use-react-router";
import { SinglelineHeader } from "../../../components/header/Header";
import { HeaderCancelButton, HeaderSaveButton } from "../../../components/header/HeaderButtons";
import { TableView, Cell } from "react-native-tableview-simple";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EFEFF4",
        flex: 1
    }
});

export default function ClassEditView() {
    const { match } = useRouter<{ id: string }>();

    const { history } = useRouter();

    const goBack = () => history.goBack();
    const done = () => history.push("/settings/classes");

    return (
        <SafeAreaView style={styles.container}>
            <SinglelineHeader title="Edit Major" leftButton={<HeaderCancelButton onPress={goBack} />} rightButton={<HeaderSaveButton onPress={done} disabled={true /* TODO */} />} />
            <ScrollView>
                <TableView>
                    <Text>{JSON.stringify(match.params.id, undefined, 4)}</Text>
                    <Cell title={"Delete"}/>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
}