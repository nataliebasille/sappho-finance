import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import natcore from "@natcore/design-system-core/src/plugin";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [natcore],
} satisfies Config;
