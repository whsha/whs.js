/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { createRef, memo, useEffect } from "react";
import { FlatList, GestureResponderEvent, TouchableOpacity, View } from "react-native";
import { blockColorPickerStyles } from "../../layout/default";
import { BlockColor, getDisplayColorForBlock } from "../../util/blocks/blockColor";

const BlockColors: BlockColor[] = [
    BlockColor.Orange,
    BlockColor.Yellow,
    BlockColor.Green,
    BlockColor.Tan,
    BlockColor.Red,
    BlockColor.Purple,
    BlockColor.Blue,
    BlockColor.None
];

export default function BlockColorPicker({ onPick, value, hasNone = false }: { onPick(value: BlockColor): void; value: BlockColor; hasNone?: boolean }) {
    const pick = (color: BlockColor) => () => onPick(color);

    const scrollRef = createRef<FlatList<BlockColor>>();

    useEffect(() => {
        const current = scrollRef.current;
        if (current !== null && !(!hasNone && value === BlockColor.None)) {
            // FIXME: Workaround for not being run
            setTimeout(() => {
                current.scrollToIndex({ animated: true, index: BlockColors.indexOf(value), viewOffset: 0, viewPosition: 0.5 });
            }, 1);
        }
    }, [value]);

    const renderItem = ({ item }: { item: BlockColor }) => (
        <ColorPicker
            color={item}
            selected={value === item}
            onPress={pick(item)}
        />
    );

    const keyExtractor = (c: BlockColor) => c;

    const ITEM_HEIGHT = blockColorPickerStyles.container.padding * 2 + blockColorPickerStyles.color.width + blockColorPickerStyles.container.marginHorizontal * 2;

    const itemLayout = (_: BlockColor[] | null, index: number) => (
        { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
    );

    return (
        <FlatList
            data={hasNone ? BlockColors : BlockColors.slice(0, 7)}
            extraData={value}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            horizontal={true}
            ref={scrollRef}
            getItemLayout={itemLayout}
        />
    );
}

const ColorPicker = memo(({ color, selected, onPress }: { color: BlockColor; selected: boolean; onPress?(event: GestureResponderEvent): void }) =>  {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[blockColorPickerStyles.container, selected ? blockColorPickerStyles.containerSelected : undefined]}>
                <View style={[blockColorPickerStyles.color, { backgroundColor: getDisplayColorForBlock(color) }]} />
                <View style={[blockColorPickerStyles.slash, { display: color === BlockColor.None ? undefined : "none" }]} />
            </View>
        </TouchableOpacity>
    );
});