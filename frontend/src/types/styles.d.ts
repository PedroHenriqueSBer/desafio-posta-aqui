import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;
    colors: {
      primary: string
      secondary: string
      secondary200: string,
      tertiary: string
      background: string
      text: string
      text200: string
      error: string
      success: string
    };
  }
}
