/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { toJS } from "mobx";
import React from "react";
import { FlatList, ListRenderItem, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Cell, Section, Separator, TableView } from "react-native-tableview-simple";
import useRouter from "use-react-router";
import { SinglelineHeader } from "../../../components/header/Header";
import { HeaderCancelButton, HeaderSaveButton } from "../../../components/header/HeaderButtons";
import IconComponent from "../../../components/IconComponent";
import { getDisplayColorForBlock } from "../../../util/blocks/blockColor";
import { IClassMeta } from "../../../util/class/extentions";
import { IMajor } from "../../../util/class/storage";
import { useClasses } from "../../../util/hooks/classes/useClasses";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EFEFF4",
        flex: 1
    },
    text: {
        flex: 1,
        height: 40,
    }
});

export default function ClassesListView() {
    const { history } = useRouter();
    const classes = useClasses();
    console.log(toJS(classes, {recurseEverything: true, exportMapsAsObjects: true}));

    const goBack = () => {
        history.push("/settings");
        classes.reset();
    };
    const done = () => {
        history.push("/settings");
        classes.save();
    };

    const goTo = (path: string) => () => history.push(path);

    const classRenderItem: ListRenderItem<IMajor> = ({ item }) => {
        return (
            <TouchableOpacity onPress={goTo(`/settings/classes/${item.uuid}`)}>
                <Cell title={item.name} detail={`Room: ${item.room} Teacher: ${item.teacher}`} cellStyle="Subtitle" accessory="DisclosureIndicator" titleTextColor={getDisplayColorForBlock(item.block)} />
            </TouchableOpacity>
        );
    };

    const keyExtractor = (x: IClassMeta) => x.uuid;

    return (
        <SafeAreaView style={styles.container}>
            <SinglelineHeader title="Class Settings" leftButton={<HeaderCancelButton onPress={goBack} />} rightButton={<HeaderSaveButton onPress={done} disabled={!classes.updated} />} />
            <ScrollView>
                <TableView>
                    <Section header="Majors" footer="Majors are classes that meet the full 5 days of the cycle">
                        <FlatList keyExtractor={keyExtractor} data={Array.from(classes.temp.majors.values())} renderItem={classRenderItem} ItemSeparatorComponent={Separator} />
                        <TouchableOpacity /* onPress={classes.addMajor} */>
                            <Cell title="Add a class" cellAccessoryView={<IconComponent name="add-circle-outline" />} titleTextColor={"#1f85cc"} />
                        </TouchableOpacity>
                    </Section>
                    <Section header="Electives" footer="Electives are any class that meets less than 5 times a cycle">
                        <Cell title="TODO" />
                    </Section>
                    <Section header="DRs" footer="A DR or Directed Research is what lowerclassmen have in place of a free block. They are simply advised free blocks.">
                        <Cell title="TODO" />
                    </Section>
                    <Section header="Advisory" footer="Basically your homeroom">
                        <Cell title="Configure Advisory" accessory="DisclosureIndicator" onPress={goTo("/settings/classes/advisory")} />
                    </Section>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
}
