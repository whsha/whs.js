/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { useState } from "react";
import { FlatList, ListRenderItem, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Cell, Section, Separator, TableView } from "react-native-tableview-simple";
import useRouter from "use-react-router";
import { SinglelineHeader } from "../../components/header/Header";
import { HeaderCancelButton, HeaderSaveButton } from "../../components/header/HeaderButtons";
import IconComponent from "../../components/IconComponent";
import { BlockColor, BlockColorDisplayColors } from "../../util/blocks/blockColor";
import IClass from "../../util/class";

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

    const classRenderItem: ListRenderItem<IClass> = ({ item }) => {
        return (
            <TouchableOpacity>
                <Cell title={item.name} detail={`Room: ${item.room} Teacher: ${item.teacher}`} cellStyle="Subtitle" accessory="DisclosureIndicator" titleTextColor={BlockColorDisplayColors[item.block]}/>
            </TouchableOpacity>
        );
    };

    const keyExtractor = (_: unknown, i: number) => i.toString();

    const [tempClasses, setTempClasses] = useState<IClass[]>([
        {
            block: BlockColor.Green,
            meets: 0b11111,
            name: "gween",
            room: 1,
            teacher: "string",
        },
        {
            block: BlockColor.Yellow,
            /// TODO:
            meets: 0b10101,
            name: "|Yelo",
            room: 32,
            teacher: "ee",
        }
    ]);

    const addClass = () => {
        console.log("e");
        setTempClasses((p) => [...p, {
            block: BlockColor.None,
            meets: 0b11111,
            name: "New Class",
            room: 0,
            teacher: "",
        }]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <SinglelineHeader title="Class Settings" leftButton={<HeaderCancelButton onPress={goBack} />} rightButton={<HeaderSaveButton onPress={done} disabled={true/* TODO: */} />} />
            <ScrollView>
                <TableView>
                    <Section header="Classes">
                        <FlatList keyExtractor={keyExtractor} data={tempClasses} renderItem={classRenderItem} ItemSeparatorComponent={Separator}/>
                        <TouchableOpacity onPress={addClass}>
                            <Cell title="Add a class" cellAccessoryView={<IconComponent name="add-circle-outline" />} titleTextColor={"#1f85cc"} />
                        </TouchableOpacity>
                    </Section>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
}