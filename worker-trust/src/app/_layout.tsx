import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Provider } from "react-redux";
import "react-native-reanimated";
import "react-native-url-polyfill/auto";
import { useColorScheme } from "@/components/useColorScheme";
import { LanguageProvider } from "@/src/context/languageContext";
import { AppThemeProvider } from "@/src/context/AppThemeContext";
import { AuthProvider } from "../context/AuthContext";
import { SearchFilterProvider } from "../context/SearchFilterContext";
import { store } from "@/src/store";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SearchFilterProvider>
        <Provider store={store}>
          <AuthProvider>
            <AppThemeProvider>
              <LanguageProvider>
                <Stack>
                  {/* <Stack.Screen name="login" options={{ headerShown: false }} /> Removed login screen */}
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="modal" options={{ presentation: "modal" }} />
                  <Stack.Screen name="signup" options={{ headerShown: false }} />
                </Stack>
              </LanguageProvider>
            </AppThemeProvider>
          </AuthProvider>
        </Provider>
      </SearchFilterProvider>
    </ThemeProvider>
  );
}
