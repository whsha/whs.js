/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import * as Base from "react-native-tableview-simple";
import styled from "styled-components/native";

/** A styled version of the `TableView` */
export const TableView = styled(Base.TableView)``;

/** A styled version of the `Section` */
export const Section = styled(Base.Section).attrs<unknown, Base.SectionProps>(props => ({
    footerTextColor: props.theme.colors.dimText,
    headerTextColor: props.theme.colors.dimText,
    sectionTintColor: props.theme.colors.background,
    separatorTintColor: props.theme.colors.border
}))``;

/** Props on a cell for use of displaying verification information */
interface ICellVerifProps {
    /** Warning */
    warning?: string;
    /** Error */
    error?: string;
}

/** A styled version of the `Cell` */
export const Cell = styled(Base.Cell).attrs<ICellVerifProps, Base.CellProps & ICellVerifProps>(props => ({
    accessory: props.warning !== undefined || props.error !== undefined ? "Detail" : props.accessory,
    backgroundColor: props.warning !== undefined ? props.theme.colors.warning : props.theme.colors.foreground,
    highlightUnderlayColor: props.theme.colors.border,
    // TODO: Better presentation
    onPressDetailAccessory: () => console.warn(props.error ?? props.warning ?? "There is no error"),
    subtitleColor: props.theme.colors.dimText,
    titleTextColor: props.theme.colors.text,
}))``;

/** A red/warning cell */
export const RedCell = styled(Cell).attrs<unknown, Base.CellProps>(props => ({
    titleTextColor: props.theme.colors.error
}))``;

/** A cell that wants to be pressed */
export const ButtonCell = styled(Cell).attrs<unknown, Base.CellProps>(props => ({
    titleTextColor: props.theme.colors.button
}))``;