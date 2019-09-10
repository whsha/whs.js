/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { createRef, useEffect } from "react";
import { GestureResponderEvent, ScrollView, TouchableOpacity, View } from "react-native";
import { blockColorPickerStyles } from "../../themes/light";
import { BlockColor, getDisplayColorForBlock } from "../../util/blocks/blockColor";

const BlockColorOffset: BlockColor[] = [
    BlockColor.Orange,
    BlockColor.Yellow,
    BlockColor.Green,
    BlockColor.Tan,
    BlockColor.Red,
    BlockColor.Purple,
    BlockColor.Blue,
    BlockColor.None
];

export default function BlockColorPicker({ onPick, value, hasNone }: { onPick(value: BlockColor): void; value: BlockColor; hasNone?: boolean }) {
    const pick = (color: BlockColor) => () => onPick(color);

    const scrollRef = createRef<ScrollView>();

    useEffect(() => {
        let current = scrollRef.current;
        if (current !== null) {
            current.scrollTo({ x: BlockColorOffset.indexOf(value) * 30, animated: true });
        }
    });

    return (
        <ScrollView horizontal={true} ref={scrollRef}>
            <View style={blockColorPickerStyles.scrollView}>
                <ColorPicker color={BlockColor.Orange} selected={value === BlockColor.Orange} onPress={pick(BlockColor.Orange)} />
                <ColorPicker color={BlockColor.Yellow} selected={value === BlockColor.Yellow} onPress={pick(BlockColor.Yellow)} />
                <ColorPicker color={BlockColor.Green} selected={value === BlockColor.Green} onPress={pick(BlockColor.Green)} />
                <ColorPicker color={BlockColor.Tan} selected={value === BlockColor.Tan} onPress={pick(BlockColor.Tan)} />
                <ColorPicker color={BlockColor.Red} selected={value === BlockColor.Red} onPress={pick(BlockColor.Red)} />
                <ColorPicker color={BlockColor.Purple} selected={value === BlockColor.Purple} onPress={pick(BlockColor.Purple)} />
                <ColorPicker color={BlockColor.Blue} selected={value === BlockColor.Blue} onPress={pick(BlockColor.Blue)} />
                {hasNone === true ? <ColorPicker color={BlockColor.None} selected={value === BlockColor.None} onPress={pick(BlockColor.None)} /> : undefined}
            </View>
        </ScrollView>
    );
}

function ColorPicker({ color, selected, onPress }: { color: BlockColor; selected: boolean; onPress?(event: GestureResponderEvent): void }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[blockColorPickerStyles.container, selected ? blockColorPickerStyles.containerSelected : undefined]}>
                <View style={[blockColorPickerStyles.color, { backgroundColor: getDisplayColorForBlock(color) }]} />
                <View style={[blockColorPickerStyles.slash, { display: color === BlockColor.None ? undefined : "none" }]} />
            </View>
        </TouchableOpacity>
    );
}