/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo, useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import Splash from "../../assets/splash.png";
import { ApplicationState } from "../App";
import { LoadingImage, LoadingOverlayView, TaskText } from "../styles/components/loading";

/** The props for the LoadingView */
interface ILoadingProps {
    /** The current task the app is on */
    task: ApplicationState;
}

/** The view to show when the application is in any state other than loaded */
function LoadingView({ task }: ILoadingProps) {
    const [displayStatus, setDisplayStatus] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setDisplayStatus(true), 10000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <View>
            <StatusBar barStyle="light-content" />
            <LoadingImage source={Splash} resizeMode={"contain"} />
            <LoadingOverlayView display={displayStatus}>
                <TaskText>{task}...</TaskText>
            </LoadingOverlayView>
        </View>
    );
}

export default memo(LoadingView);