/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { StatusBar, StyleSheet } from "react-native";

export const classComponentStyles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        // borderBottomColor: "#CECECE",
        // borderBottomWidth: 1,
        height: 75,
        justifyContent: "center",
        padding: 10,
        width: "100%"
    },
    dim: {
        color: "#808080"
    },
    dualView: {
        alignItems: "baseline",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between"
    },
    info: {
        marginTop: 5
    },
    room: {
        overflow: "visible"
    },
    teacher: {
        maxWidth: "50%"
    },
    title: {
        color: "#A0A0A0",
        fontSize: 25,
        fontWeight: "bold"
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
        flex: 1,
        height: 40,
        textAlign: "right"
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

export const todayViewStyles = StyleSheet.create({
    todayView: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    }
});

export const blockColorPickerStyles = StyleSheet.create({
    color: {
        borderRadius: 5,
        height: 20,
        width: 20,
    },
    container: {
        alignContent: "center",
        backgroundColor: "white",
        borderColor: "#CECECE",
        borderRadius: 10,
        borderWidth: 1,
        padding: 10
    },
    containerSelected: {
        backgroundColor: "black"
    },
    scrollView: {
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
        height: 60,
        justifyContent: "space-evenly",
        minWidth: 500,
    },
    slash: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
        height: 1,
        left: 8,
        position: "absolute",
        top: 20,
        transform: [{ rotate: "45deg" }],
        width: 24,
    }
});