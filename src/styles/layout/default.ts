/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
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

export const classesStyle = StyleSheet.create({
    colorblindColor: {
        fontWeight: "bold",
        paddingHorizontal: 10
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    dim: {
        color: "#808080",
    },
    info: {
        marginTop: 5
    },
    left: {
        flex: 1,
        textAlign: "left",
    },
    middle: {
        flex: 1,
        textAlign: "center",
    },
    outerContainer: {
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        padding: 10
    },
    right: {
        flex: 1,
        textAlign: "right"
    },
    row: {
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
    },
    times: {
        flex: 0,
        paddingLeft: 5,
    },
    title: {
        color: "#444444",
        fontSize: 25,
        fontWeight: "bold",
    }
});

export const headerStyles = StyleSheet.create({
    header: {
        alignItems: "center",
        backgroundColor: "#fff",
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
        height: 50,
        justifyContent: "center",
    },
    headerSubtitle: {
        color: "#808080",
        fontSize: 12,
        textAlign: "center"
    },
    headerTitle: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center"
    },
    leftButton: {
        left: 0,
        marginHorizontal: 15,
        marginVertical: 10,
        position: "absolute",
    },
    rightButton: {
        marginHorizontal: 15,
        marginVertical: 10,
        position: "absolute",
        right: 0
    },
    singleHeaderTitle: {
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center"
    }
});

export const headerButtonStyles = StyleSheet.create({
    arrowButton: {
        alignItems: "center",
        flex: 1,
        height: 30,
        justifyContent: "center",
        width: 30
    },
    button: {
        color: "#2f95dc",
        fontSize: 17
    },
    buttonContainer: {
    },
    disabled: {
        color: "#dadada"
    },
    doneButton: {
        fontWeight: "bold"
    }
});

export const tableViewStyle = StyleSheet.create({
    redbutton: {
        color: "#FF5050"
    }
});

export const tabBarIconNotSelectedColor = "#ccc";
export const tabBarIconSelectedColor = "#2f95dc";

export const loadingViewStyle = StyleSheet.create({
    image: {
        backgroundColor: "#FFFFFF",
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
        color: "#A0A0A0",
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
        textAlign: "right",
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