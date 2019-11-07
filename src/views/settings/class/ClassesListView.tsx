/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { FlatList, ListRenderItem, SafeAreaView, ScrollView } from "react-native";
import { Cell, Section, Separator, TableView } from "react-native-tableview-simple";
import { HeaderCancelButton, HeaderSaveButton } from "../../../components/header/HeaderButtons";
import IconComponent from "../../../components/IconComponent";
import { settingsViewStyles } from "../../../themes/light";
import { getDisplayColorForBlock } from "../../../util/blocks/blockColor";
import { IClassMeta } from "../../../util/class/extentions";
import { IMajor } from "../../../util/class/storage";
import { useClasses } from "../../../util/hooks/classes/useClasses";

export default function ClassesListView() {
    // const { history } = useRouter();
    const classes = useClasses();
    const goBack = () => {
        // history.push("/settings");
        classes.reset();
    };
    const done = () => {
        // history.push("/settings");
        classes.save();
    };

    const goTo = (_path: string) => () => void 0;// history.push(path);

    const majorRenderItem: ListRenderItem<IMajor> = ({ item }) => {
        return (
            <Cell title={item.name} detail={`Room: ${item.room} Teacher: ${item.teacher}`} cellStyle="Subtitle" accessory="DisclosureIndicator" titleTextColor={getDisplayColorForBlock(item.block)} onPress={goTo(`/settings/classes/major/${item.uuid}`)} />
        );
    };

    const keyExtractor = (x: IClassMeta) => x.uuid;

    const addMajor = () => {
        // let uuid = classes.addMajor();
        // history.push(`/settings/classes/major/${uuid}`);
    };

    return (
        <SafeAreaView style={settingsViewStyles.container}>
            {/* <SinglelineHeader title="Class Settings" leftButton={<HeaderCancelButton onPress={goBack} />} rightButton={<HeaderSaveButton onPress={done} disabled={!classes.updated} />} /> */}
            <ScrollView>
                <TableView>
                    <Section header="Advisory" footer="Basically your homeroom">
                        <Cell title="Configure Advisory" accessory="DisclosureIndicator" onPress={goTo("/settings/classes/advisory")} />
                    </Section>
                    <Section header="Majors" footer="Majors are classes that meet the full 5 days of the cycle">
                        <FlatList keyExtractor={keyExtractor} data={Array.from(classes.temp.majors.values())} renderItem={majorRenderItem} ItemSeparatorComponent={Separator} />
                        <Cell title="Add a class" cellAccessoryView={<IconComponent name="add-circle-outline" />} titleTextColor={"#1f85cc"} onPress={addMajor} />
                    </Section>
                    <Section header="Minors" footer="Minors are any class that meets less than 5 times a cycle">
                        <Cell title="TODO" />
                    </Section>
                    <Section header="DRs" footer="A DR or Directed Research is what lowerclassmen have in place of a free block. They are simply advised free blocks.">
                        <Cell title="TODO" />
                    </Section>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
}
