import React, { Component } from "react";
import { Button, FlatList, ImageStyle, SafeAreaView, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

export default class SetupModal extends Component {

    render() {
        return (
            <SafeAreaView>
                <View style={styles.background}>
                    <Text style={styles.header}>Class Setup</Text>
                    <View>
                        <Button title="+" onPress={() => console.log("boop")}/>
                    </View>

                    <FlatList
                        data={[{key: "a"}, {key: "b"}]}
                        renderItem={({item}) => <Text>{item.key}</Text>}/>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "yellow",
        height: "100%",
        borderRadius: 10,
        marginTop: 10,
        padding: 10
    } as ViewStyle | TextStyle | ImageStyle,
    header: {
        backgroundColor: "red",
        fontWeight: "bold",
        fontSize: 25,
        textAlign: "center",
        textAlignVertical: "center"
    } as ViewStyle | TextStyle | ImageStyle
});