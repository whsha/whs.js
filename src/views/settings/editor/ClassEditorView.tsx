import { EventEmitter } from "fbemitter";
import React, { Component, ComponentType } from "react";
import { Alert, FlatList, ListRenderItem, SafeAreaView, ScrollView, Switch, Text, TextInput, TouchableOpacity } from "react-native";
import { Cell, Section, Separator } from "react-native-tableview-simple";
import { NavigationScreenConfig, NavigationStackScreenOptions } from "react-navigation";
import { INavigationElementProps } from "../../../App";
import { Store } from "../../../AppState";
import { AllDays, BlockColor, BlockColors, IClassBlock } from "../../../types/Block";
import { canBlockMeetToday, whenDoesBlockMeet } from "../../../util/BlocksUtil";

interface IClassEditorViewNavigationProps {
    block: IClassBlock;
    index: number;
}
type Props = INavigationElementProps<{}, IClassEditorViewNavigationProps>;

export default class ClassEditorView extends Component<Props, IClassBlock> {
    public static eventEmitter = new EventEmitter();
    public static navigationOptions: NavigationScreenConfig<NavigationStackScreenOptions> = {
        title: "Edit Class",
        headerRight: (
            <TouchableOpacity style={{ marginVertical: 10, marginHorizontal: 15 }} onPress={ClassEditorView.emit("done")}>
                <Text style={{ color: "#2f95dc", fontSize: 17, fontWeight: "bold" }}>Done</Text>
            </TouchableOpacity>
        ),
        headerLeft: (
            <TouchableOpacity style={{ marginVertical: 10, marginHorizontal: 15 }} onPress={ClassEditorView.emit("cancel")}>
                <Text style={{ color: "#2f95dc", fontSize: 17 }}>Cancel</Text>
            </TouchableOpacity>
        )
    };
    public static emit = (event: string) => () => ClassEditorView.eventEmitter.emit(event);

    constructor(props: Props) {
        super(props);

        this.state = this.props.navigation.getParam("block");

        ClassEditorView.eventEmitter.addListener("done", () => {
            Store.editClass(this.props.navigation.getParam("index"), this.state);
            this.props.navigation.goBack();
        });

        ClassEditorView.eventEmitter.addListener("cancel", () =>
            this.props.navigation.goBack()
        );
    }

    public render() {
        return (
            <SafeAreaView style={{ backgroundColor: "#EFEFF4", height: "100%" }}>
                <ScrollView style={{ paddingTop: 10 }}>
                    <Section header="Class Name">
                        <Cell cellContentView={<TextInput style={{ fontSize: 16, flex: 1 }} placeholder="Class Name" value={this.state.name} onChangeText={this.updateName} />}/>
                    </Section>
                    <Section header="Teacher's Name">
                        <Cell cellContentView={<TextInput style={{ fontSize: 16, flex: 1 }} placeholder="Teacher's Name" value={this.state.teacher} onChangeText={this.updateTeacher} />}/>
                    </Section>
                    <Section header="Room Number">
                        <Cell cellContentView={<TextInput keyboardType="numeric" style={{ fontSize: 16, flex: 1 }} placeholder="Class Room" value={this.state.room.toString()} onChangeText={this.updateRoom} />}/>
                    </Section>
                    <Section header="Class Color">
                        <FlatList
                            data={BlockColors.map(x => ({key: x, value: x}))}
                            renderItem={this.blockColorSelector}
                            ItemSeparatorComponent={SeperatorComponent}
                        />
                        <Cell
                            accessory={this.state.color === undefined ? "Checkmark" : undefined}
                            title="None"
                            onPress={() => this.setState({
                                color: undefined,
                                days: AllDays
                            })}
                        />
                    </Section>
                    <Section header="Days" footer="These are the days in wich the class should meet on">
                        <FlatList
                            data={[1, 2, 3, 4, 5, 6, 7].filter(x => canBlockMeetToday(x, this.state.color) || this.state.color === undefined)}
                            keyExtractor={(i) => `${i}`}
                            renderItem={({item}) => (
                                <Cell
                                    title={`Day ${item}`}
                                    cellAccessoryView={
                                        <Switch
                                            value={(this.state as IClassBlock).days.indexOf(item) !== -1}
                                            onValueChange={(value) => this.setState(preState => {
                                                if (value) { // Rising edge
                                                    if (preState.days.indexOf(item) === -1) {
                                                        preState.days.push(item); // Push only if it is not already in the list
                                                    }
                                                    return {
                                                        days: preState.days
                                                    };
                                                } else { // Falling edge
                                                    return {
                                                        // Filter out the value
                                                        days: preState.days.filter(x => x !== item || value)
                                                    };
                                                }
                                            })}
                                        />
                                    }
                                />
                            )}
                            ItemSeparatorComponent={({ highlighted }) =>
                                <Separator isHidden={highlighted} />
                            }
                        />
                    </Section>
                    <Section>
                        <Cell
                            title="Delete Class"
                            titleTextColor="red"
                            onPress={() => {
                                Alert.alert(
                                    "Delete Confirmation",
                                    `Are you sure you want to delete ${this.state.name}?`,
                                    [
                                        {
                                            text: "Cancel",
                                            style: "cancel"
                                        },
                                        {
                                            text: "Delete",
                                            style: "destructive",
                                            onPress: () => {
                                                Store.removeClass(this.props.navigation.getParam("index"));
                                                this.props.navigation.goBack();
                                            }
                                        }
                                    ]
                                );
                            }}
                        />
                    </Section>
                </ScrollView>
            </SafeAreaView>
        );
    }

    private readonly updateName = (name: string) => {
        this.setState({name});
    }

    private readonly updateTeacher = (teacher: string) => {
        this.setState({teacher});
    }

    private readonly updateRoom = (room: string) => {
        this.setState({
            room: isNaN(parseInt(room, 10))
                    ? 0
                    : parseInt(room, 10)
        });
    }

    private readonly setBlockColor = (color: BlockColor) => {
        this.setState({
            color,
            days: whenDoesBlockMeet(color)
        });
    }

    private readonly blockColorSelector: ListRenderItem<IKV<keyof typeof BlockColor>> = ({item}) => {
        return (
            <Cell
                accessory={this.state.color === BlockColor[item.value] ? "Checkmark" : undefined}
                title={item}
                titleTextColor={BlockColor[item.value]}
                onPress={this.setBlockColor.bind(this, BlockColor[item.value])}
            />
        );
    }
}

export interface IKV<K, V = K> {
    key: K;
    value: V;
}

export function SeperatorComponent({ highlighted }: { highlighted: boolean}) {
    return <Separator isHidden={highlighted} />;
}
