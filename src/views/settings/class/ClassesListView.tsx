/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useMemo } from "react";
import { Alert, FlatList, ListRenderItem, SafeAreaView, ScrollView, Text } from "react-native";
import { Cell, Section, Separator, TableView } from "react-native-tableview-simple";
import uuid from "uuid";
import { HeaderCancelButton, HeaderSaveButton } from "../../../components/header/HeaderButtons";
import IconComponent from "../../../components/IconComponent";
import ProblemsIcons from "../../../components/settings/ProblemsIcons";
import { settingsViewStyles } from "../../../layout/default";
import { discardChangesAlert } from "../../../util/alerts";
import { getDisplayColorForBlock } from "../../../util/blocks/blockColor";
import { IClassMeta } from "../../../util/class/extentions";
import { irregularMeetDays } from "../../../util/class/primitives";
import { IMajor, IMinor } from "../../../util/class/storage";
import { useClasses } from "../../../util/hooks/classes/useClasses";
import useNoHardwareBack from "../../../util/hooks/useNoHardwareBack";
import { SettingsParams } from "../../SettingsView";

export default function ClassesListView() {
    useNoHardwareBack();
    const navigation = useNavigation<StackNavigationProp<SettingsParams, "ConfigureMajor">>();
    const classes = useClasses();

    const validation = useMemo(() => classes.validate(), [classes.temp]);

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
        const validationResults = classes.validate();

        if (validationResults.size === 0) {
            classes.save();
            navigation.goBack();
        } else {
            Alert.alert("You cannot save the classes in their current state", "There are errors with the classes that need to be resolved");
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
            cellImageView={<ProblemsIcons problems={validation.get(item.uuid)} />}
            cellStyle={item.lab ? "Subtitle" : undefined}
            accessory="DisclosureIndicator"
            titleTextColor={getDisplayColorForBlock(item.block)}
            onPress={goTo("ConfigureMajor", { majorId: item.uuid })}
        />
    );

    const minorRenderItem: ListRenderItem<IMinor> = ({ item }) => {
        const meetDays = irregularMeetDays(item);

        return (
            <Cell
                title={item.name.length === 0 ? "No Name" : item.name}
                detail={`Meets day${meetDays.length === 1 ? "" : "s"}: ${meetDays.join(", ")}`}
                cellImageView={<ProblemsIcons problems={validation.get(item.uuid)} />}
                cellStyle={"Subtitle"}
                accessory="DisclosureIndicator"
                titleTextColor={getDisplayColorForBlock(item.block)}
                onPress={goTo("ConfigureMinor", { minorId: item.uuid })}
            />
        );
    };

    const keyExtractor = (x: IClassMeta) => x.uuid;

    const addMajor = () =>
        navigation.navigate({ name: "ConfigureMajor", params: { majorId: uuid() } });
    const addMinor = () =>
        navigation.navigate({ name: "ConfigureMinor", params: { minorId: uuid() } });

    const addDr = () => void 0;
    const fillDrs = () => void 0;

    return (
        <SafeAreaView style={settingsViewStyles.container}>
            <ScrollView>
                <TableView>
                    <Section header="Advisory" footer="Basically your homeroom">
                        <Cell title="Configure Advisory" accessory="DisclosureIndicator" onPress={goTo("ConfigureAdvisory", undefined)} />
                    </Section>
                    <Section header="Majors" footer="Majors are classes that meet the full 5 days of the cycle.">
                        <FlatList
                            keyExtractor={keyExtractor}
                            data={Array.from(classes.temp.majors.values())}
                            renderItem={majorRenderItem}
                            ItemSeparatorComponent={Separator}
                        />
                        <Cell title="Add a class" cellAccessoryView={<IconComponent name="add-circle-outline" />} titleTextColor={"#1f85cc"} onPress={addMajor} />
                    </Section>
                    <Section header="Minors" footer="Minors are any class that meets less than 5 times a cycle">
                        <FlatList
                            keyExtractor={keyExtractor}
                            data={Array.from(classes.temp.minors.values())}
                            renderItem={minorRenderItem}
                            ItemSeparatorComponent={Separator}
                        />
                        <Cell title="Add a class" cellAccessoryView={<IconComponent name="add-circle-outline" />} titleTextColor={"#1f85cc"} onPress={addMinor} />
                    </Section>
                    <Section header="DRs" footer="A DR or Directed Research is what lowerclassmen have in place of a free block. They are simply advised free blocks.">
                        <Cell title="TODO" />
                        <Cell title="Add a DR" cellAccessoryView={<IconComponent name="add-circle-outline" />} titleTextColor={"#1f85cc"} onPress={addDr} />
                        <Cell title="Fill Drs" cellAccessoryView={<IconComponent name="color-fill" />} titleTextColor={"#1f85cc"} onPress={fillDrs} />
                    </Section>
                    <Section header="Debug">
                        <Cell cellContentView={<Text>{JSON.stringify(classes, undefined, 4)}</Text>} />
                    </Section>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
}
