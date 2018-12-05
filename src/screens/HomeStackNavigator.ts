/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import { createStackNavigator } from "react-navigation";
import TodayView from "../views/TodayView";

export default createStackNavigator({
    Today: TodayView
}, {
    cardStyle: {
        backfaceVisibility: "visible",
        backgroundColor: "white"
    },
    initialRouteName: "Today"
});