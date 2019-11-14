/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { FlatList, ListRenderItem, SafeAreaView, ScrollView, Text } from "react-native";
import { Cell, Section, Separator, TableView } from "react-native-tableview-simple";
import uuid from "uuid";
import { HeaderCancelButton, HeaderSaveButton } from "../../../components/header/HeaderButtons";
import IconComponent from "../../../components/IconComponent";
import { settingsViewStyles } from "../../../layout/default";
import { discardChangesAlert, ValidationErrorAlert } from "../../../util/alerts";
import { getDisplayColorForBlock } from "../../../util/blocks/blockColor";
import { IClassMeta } from "../../../util/class/extentions";
import { IMajor } from "../../../util/class/storage";
import { ClassesValidationResult, useClasses } from "../../../util/hooks/classes/useClasses";
import { SettingsParams } from "../../SettingsView";

export default function ClassesListView() {
    const navigation = useNavigation<StackNavigationProp<SettingsParams, "ConfigureMajor">>();
    const classes = useClasses();

    const goBack = () => {
        if (classes.updated) {
            discardChangesAlert(() => {
                navigation.goBack();
                classes.reset();
            });
        } else {
            navigation.goBack();
            classes.reset();
        }
    };
    const done = () => {
        // Validation
        const validationResult = classes.validate();

        if (validationResult === ClassesValidationResult.Valid) {
            classes.save();
            navigation.goBack();
        } else {
            ValidationErrorAlert(validationResult);
        }
    };

    navigation.setOptions({
        headerLeft: () => <HeaderCancelButton onPress={goBack} />,
        headerRight: () => <HeaderSaveButton onPress={done} disabled={!classes.updated} />,
    });

    const goTo = <T extends keyof SettingsParams>(path: T, options: SettingsParams[T]) => () => navigation.navigate({ name: path, params: options });// history.push(path);

    const majorRenderItem: ListRenderItem<IMajor> = ({ item }) => (
        <Cell
            title={item.name.length === 0 ? "No Name" : item.name}
            detail={"Has Lab Block"}
            cellStyle={item.lab ? "Subtitle" : undefined}
            accessory="DisclosureIndicator"
            titleTextColor={getDisplayColorForBlock(item.block)}
            onPress={goTo("ConfigureMajor", { majorId: item.uuid })}
        />
    );

    const keyExtractor = (x: IClassMeta) => x.uuid;

    const addMajor = () =>
        navigation.navigate({ name: "ConfigureMajor", params: { majorId: uuid() } });

    return (
        <SafeAreaView style={settingsViewStyles.container}>
            <ScrollView>
                <TableView>
                    <Section header="Advisory" footer="Basically your homeroom">
                        <Cell title="Configure Advisory" accessory="DisclosureIndicator" onPress={goTo("ConfigureAdvisory", undefined)} />
                    </Section>
                    <Section header="Majors" footer="Majors are classes that meet the full 5 days of the cycle">
                        <FlatList
                            keyExtractor={keyExtractor}
                            data={Array.from(classes.temp.majors.values())}
                            renderItem={majorRenderItem}
                            ItemSeparatorComponent={Separator}
                        />
                        <Cell title="Add a class" cellAccessoryView={<IconComponent name="add-circle-outline" />} titleTextColor={"#1f85cc"} onPress={addMajor} />
                    </Section>
                    <Section header="Minors" footer="Minors are any class that meets less than 5 times a cycle">
                        <Cell title="TODO" />
                    </Section>
                    <Section header="DRs" footer="A DR or Directed Research is what lowerclassmen have in place of a free block. They are simply advised free blocks.">
                        <Cell title="TODO" />
                    </Section>
                    <Section header="Debug">
                        <Cell cellContentView={<Text>{JSON.stringify(classes, undefined, 4)}</Text>} />
                    </Section>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
}
