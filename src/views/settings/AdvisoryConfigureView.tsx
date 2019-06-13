/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { useContext, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, TextInput } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import useRouter from "use-react-router";
import AdvisoryComponent from "../../components/AdvisoryComponent";
import { SinglelineHeader } from "../../components/header/Header";
import { HeaderCancelButton, HeaderSaveButton } from "../../components/header/HeaderButtons";
import { ClassesContext } from "../../contexts";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EFEFF4",
        flex: 1
    },
    text: {
        flex: 1,
        height: 40,
    }
});

function useAdvisory() {
    let classes = useContext(ClassesContext);
    let [tempAdvisory, setTempAdvisory] = useState(classes.advisory);

    return {
        savedAdvisory: classes.advisory,
        tempAdvisory,
        save() {
            classes.updateAdvisory(tempAdvisory);
            console.log(tempAdvisory);
        },
        setTeacher(teacher: string) {
            setTempAdvisory(pre => ({room: pre.room, teacher}));
        },
        setRoom(room: number) {
            setTempAdvisory(pre => ({room, teacher: pre.teacher}));
        }
    };
}

export default function AdvisoryConfigureView() {
    const { history } = useRouter();
    let {
        save,
        setRoom,
        setTeacher,
        tempAdvisory,
        savedAdvisory
    } = useAdvisory();

    const goBack = () => history.goBack();
    const done = () => {
        save();
        history.push("/settings");
    };
    const roomNumberChange = (x: string) => setRoom(x.length > 0 ? parseInt(x, 10) : 0);

    return (
        <SafeAreaView style={styles.container}>
            <SinglelineHeader title="Advisory Settings" leftButton={<HeaderCancelButton onPress={goBack}/>} rightButton={<HeaderSaveButton onPress={done} disabled={tempAdvisory === savedAdvisory}/>} />
            <ScrollView>
                <TableView>
                    <Section header="Advisory Teacher">
                        <Cell cellContentView={<TextInput value={tempAdvisory.teacher} onChangeText={setTeacher} style={styles.text} />} />
                    </Section>
                    <Section header="Room Number">
                        <Cell cellContentView={<TextInput value={tempAdvisory.room.toString()} maxLength={3} onChangeText={roomNumberChange} keyboardType="numeric" style={styles.text} />} />
                    </Section>
                    <Section header="Example">
                        <Cell cellContentView={<AdvisoryComponent teacher={tempAdvisory.teacher} room={tempAdvisory.room} />} />
                    </Section>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
}