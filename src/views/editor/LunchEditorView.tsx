import { EventEmitter } from "fbemitter";
import React, { Component } from "react";
import { Button, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Cell, Section, Separator } from "react-native-tableview-simple";
import { NavigationScreenConfig, NavigationStackScreenOptions } from "react-navigation";
import { INavigationElementProps } from "../../App";
import { Store } from "../../AppState";
import { AllDays, IClassBlock, LunchBlock } from "../../types/Block";

interface ILunchEditorViewNavigationProps {
    block: IClassBlock;
    index: number;
}
type Props = INavigationElementProps<{}, ILunchEditorViewNavigationProps>;

export default class LunchEditorView extends Component<Props, { lunches: LunchBlock[] }> {
    public static navigationOptions: NavigationScreenConfig<NavigationStackScreenOptions> = {
        title: "Edit Lunches"
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            lunches: Store.lunches
        };

        // LunchEditorView.eventEmitter.addListener("done", () => {
        //     Store.editLunches(this.state.lunches);
        //     this.props.navigation.goBack();
        // });

        // LunchEditorView.eventEmitter.addListener("cancel", () =>
        //     this.props.navigation.goBack()
        // );
    }

    public render() {
        return (
            <SafeAreaView style={{ backgroundColor: "#EFEFF4", height: "100%" }}>
                <ScrollView style={{ paddingTop: 10 }}>
                    <Section header="Lunch Blocks">
                        <FlatList
                            data={AllDays}
                            keyExtractor={x => x.toString()}
                            renderItem={({ item }) =>
                                <Cell
                                    title={`Day ${item}`}
                                    accessory="DisclosureIndicator"
                                    detail={["First", "Second", "Third"][this.state.lunches[item - 1]]}
                                    cellStyle="RightDetail"
                                    onPress={() => false} // Open Modal or menu
                                    // cellContentView={
                                    //     <View style={styles.container}>
                                    //         <Button
                                    //             title="First"
                                    //             onPress={() => {
                                    //                 this.setState(preState => {
                                    //                     this.state.lunches[item - 1] = LunchBlock.First;
                                    //                     return {
                                    //                         lunches: preState.lunches
                                    //                     };
                                    //                 });
                                    //             }} // TODO: SETSTATE not STATE =
                                    //             color={this.state.lunches[item - 1] === LunchBlock.First ? "red" : undefined}
                                    //         />
                                    //         <Button title="Second" onPress={() => void (this.state.lunches[item - 1] = LunchBlock.Second)} color={this.state.lunches[item - 1] === LunchBlock.Second ? "red" : undefined} />
                                    //         <Button title="Third" onPress={() => void (this.state.lunches[item - 1] = LunchBlock.Third)} color={this.state.lunches[item - 1] === LunchBlock.Third ? "red" : undefined} />
                                    //     </View>
                                    // }
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 10
    }
});