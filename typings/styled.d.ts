import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            main: string;
            text: string;
            dimText: string;
            titleColor: string;
            disabledColor: string;
            buttonColor: string;
        };
    };
}