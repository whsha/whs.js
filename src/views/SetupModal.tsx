import React, { Component } from "react";
import { Button, FlatList, ImageStyle, Modal, Platform, SafeAreaView, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { classes1 } from "../DemoObjects";
import { AllDays, IBlock, isAdvisory, isClassBlock } from "../types/Block";

interface ISetupModalState {
    /** The blocks that the user has */
    blocks: IBlock[];
    /** The block the user is editing */
    editing?: IBlock;
}

export default class SetupModal extends Component<{}, ISetupModalState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            blocks: classes1
        };
    }

    public render() {
        return (
            <SafeAreaView>
                <View style={styles.background}>
                    <Text style={styles.header}>Class Setup</Text>
                    <Button title="Add Class" onPress={() => console.log("boop")} />

                    <FlatList
                        data={this.state.blocks}
                        keyExtractor={x => x.name}
                        renderItem={({item}) =>
                            <BlockListView block={item} onPress={this.startEditing}/>
                        }/>
                </View>
                <Modal visible={this.state.editing !== undefined} animationType="slide">
                    <BlockEditor block={this.state.editing} onPress={this.stopEditing}/>
                </Modal>
            </SafeAreaView>
        );
    }

    private readonly startEditing = (block: IBlock) => this.setState({editing: block});
    private readonly stopEditing = () => this.setState({editing: undefined});
}

function BlockEditor({block, onPress}: {block: IBlock, onPress: () => void}) {
    return (
        <SafeAreaView>
            <Text>youre ediding {block.name}</Text>
            <Button title="close" onPress={() => onPress()}/>
        </SafeAreaView>
    );
}

function BlockListView({block, onPress}: {block: IBlock, onPress: (block: IBlock) => void}) {
    let days = !isAdvisory(block) ? block.days : AllDays;

    return (
        <View>
            <View>
                <Text style={[styles.blockListTitle, isClassBlock(block) ? {color: block.color} : undefined]}>{block.name}</Text>
                <Text>Meets on Day{days.length !== 1 ? "s" : ""} {days}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={() => onPress(block)}>
                    <IonIcon name={`${Platform.OS === "ios" ? "ios" : "md"}-information-circle-outline`} size={25} color="#2f95dc"/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#FFFFFF",
        height: "100%",
        padding: 10
    } as ViewStyle | TextStyle | ImageStyle,
    header: {
        backgroundColor: "red",
        fontWeight: "bold",
        fontSize: 25,
        textAlign: "center",
        textAlignVertical: "center"
    } as ViewStyle | TextStyle | ImageStyle,
    blockListTitle: {
        fontSize: 25
    } as ViewStyle | TextStyle | ImageStyle
});