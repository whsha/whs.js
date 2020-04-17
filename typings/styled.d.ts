import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            main: string;
            text: string;
            dimText: string;
            title: string;
            disabled: string;
            button: string;
            error: string;
            white: string;
            background: string;
            input: string;
            border: string;
        };
    };
}