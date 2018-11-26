import React, { PureComponent } from "react";
import { FlatList, ImageStyle, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { Cell, Section, Separator } from "react-native-tableview-simple";
import IonIcon from "react-native-vector-icons/Ionicons";
import { NavigationScreenConfig, NavigationTabScreenOptions } from "react-navigation";
import { INavigationElementProps } from "../App";
import { DEMOOBJECT_advisory, DEMOOBJECT_classes } from "../DemoObjects";
import { AllDays, IAdvisory, IBlock, IClassBlock, isAdvisory, isClassBlock } from "../types/Block";

interface IClassSetupViewState {
    /** The blocks that the user has */
    blocks: IClassBlock[];
    /** The users advisory */
    advisory: IAdvisory;
}

export default class ClassSetupView extends PureComponent<INavigationElementProps, IClassSetupViewState> {
    public static navigationOptions: NavigationScreenConfig<NavigationTabScreenOptions> = {
        title: "Class Setup"
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
                {/* <Button title="Add Class" onPress={() => console.log("boop")} /> */}

                <ScrollView style={{paddingTop: 10}}>
                    <Section header="Advisory" sectionPaddingTop={5}>
                        <Cell
                            title="Advisory"
                            // detail={!isAdvisory(item) ? item.days.join(", ") : AllDays.join(", ")}
                            cellStyle="Basic"
                            accessory="DisclosureIndicator"
                            onPress={() => console.log("e")}
                        />
                    </Section>
                    <Section header="Classes" sectionPaddingTop={5}>
                        <FlatList
                            data={this.state.blocks}
                            keyExtractor={x => x.name}
                            renderItem={({ item, separators }) =>
                                <Cell
                                    title={item.name}
                                    detail={!isAdvisory(item) ? item.days.join(", ") : AllDays.join(", ")}
                                    cellStyle="Subtitle"
                                    accessory="DisclosureIndicator"
                                    onPress={() => console.log("e")}
                                    onHighlightRow={separators.highlight}
                                    onUnHighlightRow={separators.unhighlight}
                                />
                            }
                            ItemSeparatorComponent={({ highlighted }) =>
                                <Separator isHidden={highlighted} />
                            }
                            scrollEnabled={false}
                        />
                    </Section>
                </ScrollView>
            </SafeAreaView>
        );
    }

    // private readonly startEditing = (block: IBlock) => this.setState({ editing: block });
}

function BlockListView({ block, onPress }: { block: IBlock, onPress: (block: IBlock) => void }) {
    let days = !isAdvisory(block) ? block.days : AllDays;

    return (
        <View>
            <View>
                <Text style={[styles.blockListTitle, isClassBlock(block) ? { color: block.color } : undefined]}>{block.name}</Text>
                <Text>Meets on Day{days.length !== 1 ? "s" : ""} {days}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={() => onPress(block)}>
                    <IonIcon name={`${Platform.OS === "ios" ? "ios" : "md"}-information-circle-outline`} size={25} color="#2f95dc" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#EFEFF4",
        height: "100%",
        padding: 10
    } as ViewStyle | TextStyle | ImageStyle,
    blockListTitle: {
        fontSize: 25
    } as ViewStyle | TextStyle | ImageStyle
});