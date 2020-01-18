/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import styled from "styled-components/native";

/** The props for LoadingOverlayView */
export interface IDisplayableProps {
    /** Wheather or not to show the overlay */
    display: boolean;
}

/** Text that is not the main color but a bit more dim */
export const DimText = styled.Text(({ theme }) => ({
    color: theme.colors.dimText
}));