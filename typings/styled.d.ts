import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            /** The backrouund color for the app */
            background: string;
            /** The border color */
            border: string;
            /** The link/button color to use */
            button: string;
            /** The class view's background */
            classBackground: string;
            /** Secondary text color */
            dimText: string;
            /** Disabled links/items color */
            disabled: string;
            /** Error color */
            error: string;
            /** The app foreground color */
            foreground: string;
            /** The color for input text */
            input: string;
            /** The primary text color */
            text: string;
            /** Title text color */
            title: string;
            /** Warning color */
            warning: string;
        };
    };
}