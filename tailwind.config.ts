import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import natcore from "@natcore/design-system-core/src/plugin";
import { toRgb } from "@natcore/design-system-core/src/utils";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    natcore({
      primary: toRgb("#001F36"),
      secondary: toRgb("#efaa9c"),
      accent: toRgb("#e87a01"),
      surface: toRgb("#f7dcdf"),
    }),
  ],
} satisfies Config;
