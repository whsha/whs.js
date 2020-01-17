/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import styled from "styled-components/native";

/** A view for placing an item in the center of a class view */
export const MiddleClassView = styled.View({
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    maxWidth: "75px"
});

/** A class view row */
export const ClassViewRow = styled.View({
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between"
});

/** The info row for the class view */
export const ClassViewInfoRow = styled(ClassViewRow)({
    marginTop: 5
});

/** Props for a styled component that can have a dynamic flex state */
interface IFlexableProps {
    /** The flex state */
    flex: boolean;
}

/** The view to surround the times part of the class */
export const TimesView = styled.View<IFlexableProps>(props => ({
    alignItems: "center",
    flex: props.flex ? 1 : undefined,
    flexDirection: "row",
    justifyContent: "flex-end"
}));

/** The view for containing a class */
export const ClassContainerView = styled.View(props => ({
    alignItems: "center",
    backgroundColor: props.theme.colors.main,
    justifyContent: "center",
    padding: 10,
    width: "100%"
}));