/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React, { createRef, PropsWithChildren, useEffect, useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { settingsViewStyles } from "../styles/layout/default";

/** A "wrapper" for KeyboardAvoidingView that works in a react-navigation navigator */
export default function NavigationKeyboardAvoidingView({ children }: PropsWithChildren<{}>) {
    /** The offset to use */
    const [keyAvoidOffset, setKeyLayoutHeight] = useState(0);
    /** The ref to the inner view */
    const viewRef = createRef<View>();

    // The effect to compute the view with
    useEffect(() => {
        // A delay to allow for the render to finish before computing the height
        setTimeout(() => {
            if (viewRef.current !== null) {
                viewRef.current.measure((x, y, width, height, pageX, pageY) => {
                    console.warn(x, y, width, height, pageX, pageY);
                    setKeyLayoutHeight(pageY);
                });
            }
        }, 100);
    }, []);

    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={keyAvoidOffset} style={settingsViewStyles.container}>
            <View style={settingsViewStyles.container} ref={viewRef}>
                {children}
            </View>
        </KeyboardAvoidingView>
    );
}