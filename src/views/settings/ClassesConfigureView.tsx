/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import dayjs from "dayjs";
import React from "react";
import { FlatList, ListRenderItem, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Cell, Section, Separator, TableView } from "react-native-tableview-simple";
import useRouter from "use-react-router";
import { IClass } from "../../components/ClassComponent";
import { SinglelineHeader } from "../../components/header/Header";
import { HeaderCancelButton, HeaderSaveButton } from "../../components/header/HeaderButtons";
import IconComponent from "../../components/IconComponent";
import { BlockColor } from "../../util/blocks/blockColor";

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

export default function ClassesConfigureView() {
    const { history } = useRouter();

    const goBack = () => history.goBack();
    const done = () => {
        // TODO: Save
        history.push("/settings");
    };

    const classRenderItem: ListRenderItem<IClass> = ({ item, separators }) => {
        separators.highlight();

        return (
            <TouchableOpacity>
                <Cell title={item.name} detail={`Room: ${item.room} Teacher: ${item.teacher}`} cellStyle="Subtitle" accessory="DisclosureIndicator"/>
            </TouchableOpacity>
        );
    };

    const keyExtractor = (_: unknown, i: number) => i.toString();

    const tempClasses = [
        {
            block: BlockColor.Green,
            end: dayjs(),
            name: "gween",
            room: 1,
            start: dayjs(),
            teacher: "string"
        },
        {
            block: BlockColor.Yellow,
            end: dayjs(),
            name: "|Yelo",
            room: 32,
            start: dayjs(),
            teacher: "ee"
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <SinglelineHeader title="Class Settings" leftButton={<HeaderCancelButton onPress={goBack} />} rightButton={<HeaderSaveButton onPress={done} disabled={true/* TODO: */} />} />
            <ScrollView>
                <TableView>
                    <Section header="Classes">
                        <FlatList keyExtractor={keyExtractor} data={tempClasses} renderItem={classRenderItem} ItemSeparatorComponent={Separator}/>
                        <TouchableOpacity>
                            <Cell title="Add a class" cellAccessoryView={<IconComponent name="add-circle-outline" />} titleTextColor={"#1f85cc"} />
                        </TouchableOpacity>
                    </Section>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
}