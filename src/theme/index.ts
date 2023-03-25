import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    blue: {
      normal: "#364D9D",
      light: "#647AC7",
      1: "#647ac71a",
    },
    green: {
      700: "#00875F",
      500: "#00B37E",
    },
    gray: {
      1: "#1A181B",
      2: "#3E3A40",
      3: "#5F5B62",
      4: "#9F9BA1",
      5: "#D9D8DA",
      6: "#EDECEE",
      7: "#F7F7F8",
    },
    white: "#FFFFFF",
    red: {
      500: "#F75A68",
    },
  },
  fonts: {
    light: "Karla_300Light",
    regular: "Karla_400Regular",
    medium: "Karla_600SemiBold",
    heading: "Karla_700Bold",
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  sizes: {
    14: 56,
    33: 148,
  },
});
