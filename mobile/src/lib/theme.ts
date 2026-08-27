// Exact port of goldplanner-app's web `src/index.css` @theme block + surface
// classes. Keep these two files in sync by hand — small enough that a build
// step to share them isn't worth it.

export const colors = {
  clay: "#f2f3f5",
  paper: "#ffffff",
  ink: "#1c1e21",
  green: "#c93b02",
  action: "#c93b02",
  sand: "#b6b9bf",
  pillar: "#b6b9bf",
  success: "#3e6b4e",
  danger: "#9b3d2e",
  warning: "#d9a404",
  stone400: "#9296a0",
  stone500: "#6b6f76",
};

export const surfaces = {
  1: { backgroundColor: "#e8eaed", borderColor: "rgba(28,30,33,0.07)", borderWidth: 1 },
  2: {
    backgroundColor: "#ffffff",
    borderColor: "rgba(28,30,33,0.1)",
    borderWidth: 1,
    shadowColor: "#1c1e21",
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  3: { backgroundColor: "#fafbfc", borderColor: "rgba(28,30,33,0.1)", borderWidth: 1 },
} as const;

// Font family names as exposed by @expo-google-fonts/* — loaded via useFonts
// in the root layout before anything renders.
export const fonts = {
  sans: "Inter_400Regular",
  sansMedium: "Inter_500Medium",
  sansSemiBold: "Inter_600SemiBold",
  sansBold: "Inter_700Bold",
  mono: "JetBrainsMono_400Regular",
  monoMedium: "JetBrainsMono_500Medium",
  serifItalic: "EBGaramond_500Medium_Italic",
};

export const radii = { sm: 6, md: 8, lg: 12, xl: 16 };
