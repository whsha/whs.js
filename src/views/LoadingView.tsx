/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { Image, StatusBar, Text, View } from "react-native";
import Splash from "../../assets/splash.png";
import { ApplicationState } from "../App";
import { loadingViewStyle } from "../styles/layout/default";

/** The props for the LoadingView */
interface ILoadingProps {
    /** The current task the app is on */
    task: ApplicationState;
}

/** The view to show when the application is in any state other than loaded */
function LoadingView({ task }: ILoadingProps) {
    return (
        <View>
            <StatusBar barStyle="light-content" />
            <Image source={Splash} style={loadingViewStyle.image} resizeMode={"contain"} />
            <View style={loadingViewStyle.overlay}>
                <Text style={loadingViewStyle.taskText}>{task}...</Text>
            </View>
        </View>
    );
}

export default memo(LoadingView);