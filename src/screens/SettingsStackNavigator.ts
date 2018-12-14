/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import { createStackNavigator } from "react-navigation";
import AdvisoryConfigureView from "../views/settings/AdvisoryConfigureView";
import SettingsView from "../views/SettingsView";

export default createStackNavigator({
    ConfigureAdvisory: AdvisoryConfigureView,
    MainSettings: SettingsView
}, {
    cardStyle: {
        backfaceVisibility: "visible",
        backgroundColor: "white"
    },
    initialRouteName: "MainSettings"
});