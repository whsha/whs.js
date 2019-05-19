/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { Prompt } from "react-router-native";
import useRouter from "use-react-router";
import AdvisoryComponent from "../../components/AdvisoryComponent";
import { SinglelineHeader } from "../../components/header/Header";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EFEFF4",
        flex: 1
    },
    text: {
        flex: 1,
        height: 40
    }
});

export default function AdvisoryConfigureView() {
    const { history } = useRouter();
    let [teacher, setTeacher] = useState("Hello there");
    let [room, setRoom] = useState(1);

    const goBack = () => history.goBack();
    const done = () => history.push("/settings");
    const roomNumberChange = (x: string) => setRoom(x.length > 0 ? parseInt(x, 10) : 0);

    return (
        <SafeAreaView style={styles.container}>
            <SinglelineHeader title="Advisory Settings" back={goBack} done={done} canDone={true} />
            <TableView>
                <Section header="Advisory Teacher">
                    <Cell cellContentView={<TextInput value={teacher} onChangeText={setTeacher} style={styles.text} />} />
                </Section>
                <Section header="Room Number">
                    <Cell cellContentView={<TextInput value={room.toString()} maxLength={3} onChangeText={roomNumberChange} keyboardType="numeric" style={styles.text} />} />
                </Section>
                <Section header="Example">
                    <Cell cellContentView={<AdvisoryComponent teacher={teacher} room={room} />} />
                </Section>
            </TableView>
        </SafeAreaView>
    );
}