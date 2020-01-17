/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { StackNavigationOptions } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

// TODO: move colors to /themes
// tslint:disable:completed-docs

export const navigationHeaderPaddingStyle: StackNavigationOptions = {
    headerLeftContainerStyle: { paddingLeft: 15 },
    headerRightContainerStyle: { paddingRight: 15 },
    headerTitleAlign: "center"
};

export const tableViewStyle = StyleSheet.create({
    redbutton: {
        color: "#FF5050"
    }
});

export const tabBarIconNotSelectedColor = "#ccc";
export const tabBarIconSelectedColor = "#2f95dc";

export const loadingViewStyle = StyleSheet.create({
    image: {
        backgroundColor: "#000000",
        height: "100%",
        width: "100%"
    },
    overlay: {
        alignItems: "center",
        flex: 1,
        height: "100%",
        justifyContent: "center",
        left: 0,
        position: "absolute",
        top: 0,
        width: "100%"
    },
    taskText: {
        color: "#ffffff",
        fontSize: 20
    }
});

export const settingsViewStyles = StyleSheet.create({
    container: {
        backgroundColor: "#EFEFF4",
        flex: 1
    },
    textInput: {
        color: "#555555",
        flex: 1,
        fontSize: 15,
        height: 40,
        textAlign: "left",
    }
});

export const noSchoolViewStyles = StyleSheet.create({
    goToNextSchoolDay: {
        alignItems: "flex-end",
        backgroundColor: "white",
        borderColor: "#A0A0A0",
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    goToNextSchoolDayDiffText: {
        color: "#808080",
    },
    goToNextSchoolDayText: {
        color: "#1f85cc",
    },
    noSchoolView: {
        alignItems: "center",
        backgroundColor: "#EFEFF4",
        flex: 1,
        height: "100%",
        justifyContent: "center",
        width: "100%"
    }
});

export const creditsViewStyles = StyleSheet.create({
    header: {
        fontSize: 23,
        fontWeight: "700",
        paddingVertical: 10,
        textAlign: "center"
    },
    item: {
        fontSize: 18,
        textAlign: "center"
    },
    name: {
        fontWeight: "bold"
    }
});