/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import { Component, PureComponent } from "react";
import { NavigationParams, NavigationScreenProp, NavigationScreenConfig, NavigationTabScreenOptions, NavigationStackScreenOptions, NavigationDrawerScreenOptions, NavigationBottomTabScreenOptions } from "react-navigation";

export interface INavigationElementProps<S = {}, P = NavigationParams> {
    navigation: NavigationScreenProp<S, P>;
}

export class NavigationComponent<P = {}, S = {}, NP = NavigationParams> extends Component<P & INavigationElementProps<{}, NP>, S> {
    public static navigationOptions: NavigationScreenConfig<NavigationTabScreenOptions | NavigationStackScreenOptions | NavigationDrawerScreenOptions | NavigationBottomTabScreenOptions>;
}
export class PureNavigationComponent<P = {}, S = {}, NP = NavigationParams> extends PureComponent<P & INavigationElementProps<{}, NP>, S> {
    public static navigationOptions: NavigationScreenConfig<NavigationTabScreenOptions | NavigationStackScreenOptions | NavigationDrawerScreenOptions | NavigationBottomTabScreenOptions>;
}