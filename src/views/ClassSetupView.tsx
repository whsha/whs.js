import React, { PureComponent } from "react";
import { FlatList, Platform, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Cell, Section, Separator } from "react-native-tableview-simple";
import IonIcon from "react-native-vector-icons/Ionicons";
import { NavigationScreenConfig, NavigationStackScreenOptions } from "react-navigation";
import { INavigationElementProps } from "../App";
import { DEMOOBJECT_advisory, DEMOOBJECT_classes } from "../DemoObjects";
import { IAdvisory, IClassBlock } from "../types/Block";

interface IClassSetupViewState {
    /** The blocks that the user has */
    blocks: IClassBlock[];
    /** The users advisory */
    advisory: IAdvisory;
}

export default class ClassSetupView extends PureComponent<INavigationElementProps, IClassSetupViewState> {
    public static navigationOptions: NavigationScreenConfig<NavigationStackScreenOptions> = {
        title: "Class Setup",
        headerRight: (
            <TouchableOpacity style={{marginVertical: 10, marginHorizontal: 15}} onPress={() => console.log("e")}>
                <IonIcon name={`${Platform.OS === "ios" ? "ios" : "md"}-add`} size={26} color="#2f95dc"/>
            </TouchableOpacity>
        )
    };

    constructor(props: INavigationElementProps) {
        super(props);

        this.state = {
            blocks: DEMOOBJECT_classes,
            advisory: DEMOOBJECT_advisory
        };
    }

    public render() {
        return (
            <SafeAreaView style={styles.background}>
                <ScrollView style={{paddingTop: 10}}>
                    <Section header="Advisory" sectionPaddingTop={5}>
                        <Cell
                            title="Advisory"
                            cellStyle="Basic"
                            accessory="DisclosureIndicator"
                            onPress={() => void this.props.navigation.navigate("EditClass", {
                                block: this.state.advisory
                            })}
                        />
                    </Section>
                    <Section header="Classes" sectionPaddingTop={5}>
                        <FlatList
                            data={[]/* this.state.blocks.sort((a, b) => a.name.localeCompare(b.name)) */}
                            keyExtractor={x => x.name}
                            renderItem={({ item, separators }) =>
                                <Cell
                                    title={item.name}
                                    detail={`Meets on day${item.days.length === 1 ? "" : "s"} ${item.days.sort((a, b) => a - b).join(", ")}`}
                                    cellStyle="Subtitle"
                                    accessory="DisclosureIndicator"
                                    titleTextColor={item.color}
                                    onPress={() => console.log("e")}
                                    onHighlightRow={separators.highlight}
                                    onUnHighlightRow={separators.unhighlight}
                                />
                            }
                            ItemSeparatorComponent={({ highlighted }) =>
                                <Separator isHidden={highlighted} />
                            }
                            scrollEnabled={false}
                            ListEmptyComponent={
                                <Cell
                                    title={"No Classes"}
                                    cellStyle="Basic"
                                    isDisabled
                                />
                            }
                        />
                    </Section>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#EFEFF4",
        height: "100%",
        padding: 10
    },
    blockListTitle: {
        fontSize: 25
    }
});