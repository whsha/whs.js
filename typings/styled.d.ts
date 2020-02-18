import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            foreground: string;
            text: string;
            dimText: string;
            title: string;
            disabled: string;
            button: string;
            error: string;
            background: string;
            input: string;
            border: string;
            warning: string;
        };
    };
}