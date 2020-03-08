/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { Text } from "../../styles/components/common";
import { CreditsHeader, CreditsItem, CreditsName } from "../../styles/components/credits";
import { SettingsScrollView } from "../../styles/components/settings";

/** The credits view */
export default function CreditsView() {
    return (
        <SettingsScrollView>
            <CreditsHeader>Developers:</CreditsHeader>
            <CreditsItem>
                <CreditsName>Zachary Kohnen</CreditsName> - Lead Developer
            </CreditsItem>
            <CreditsHeader>Marketing:</CreditsHeader>
            <CreditsItem>
                <CreditsName>Nathaniel Kohnen</CreditsName> - Head of Marketing
            </CreditsItem>
            <CreditsHeader>Sponsors:</CreditsHeader>
            <CreditsItem>
                <CreditsName>Michael Kohnen</CreditsName>
            </CreditsItem>
            <CreditsItem>
                <CreditsName>Elliot Kovacs</CreditsName> - Assistant to the Lead Developer
            </CreditsItem>
            <CreditsHeader>Alpha Testers:</CreditsHeader>
            <CreditsItem>
                <CreditsName>iOS</CreditsName>
            </CreditsItem>
            <CreditsItem>Yasin Akbashev</CreditsItem>
            <CreditsItem>Abby Duffy</CreditsItem>
            <CreditsItem>Elliot Kovacs</CreditsItem>
            <CreditsItem>Owen Matejka</CreditsItem>
            <Text>&nbsp;</Text>
            <CreditsItem>
                <CreditsName>Android</CreditsName>
                </CreditsItem>
            <CreditsItem>Nicholas Totonchy</CreditsItem>
            <CreditsItem>Tanay Venkata</CreditsItem>
            <CreditsItem>Chris Zavaro</CreditsItem>
        </SettingsScrollView>
    );
}