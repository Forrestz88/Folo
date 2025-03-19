import { ActionSheetProvider } from "@expo/react-native-action-sheet"
import { jotaiStore } from "@follow/utils"
import { PortalProvider } from "@gorhom/portal"
import { QueryClientProvider } from "@tanstack/react-query"
import { useDrizzleStudio } from "expo-drizzle-studio-plugin"
import { Provider } from "jotai"
import type { ReactNode } from "react"
import { StyleSheet, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { RootSiblingParent } from "react-native-root-siblings"
import { SheetProvider } from "react-native-sheet-transitions"
import { useCurrentColors } from "react-native-uikit-colors"

import { ErrorBoundary } from "../components/common/ErrorBoundary"
import { sqlite } from "../database"
import { queryClient } from "../lib/query-client"
import { MigrationProvider } from "./migration"

export const RootProviders = ({ children }: { children: ReactNode }) => {
  useDrizzleStudio(sqlite)

  const currentThemeColors = useCurrentColors()

  return (
    <MigrationProvider>
      <Provider store={jotaiStore}>
        <ErrorBoundary>
          <KeyboardProvider>
            <View style={[styles.flex, currentThemeColors]}>
              <QueryClientProvider client={queryClient}>
                <GestureHandlerRootView>
                  <SheetProvider>
                    <ActionSheetProvider>
                      <RootSiblingParent>
                        <PortalProvider>{children}</PortalProvider>
                      </RootSiblingParent>
                    </ActionSheetProvider>
                  </SheetProvider>
                </GestureHandlerRootView>
              </QueryClientProvider>
            </View>
          </KeyboardProvider>
        </ErrorBoundary>
      </Provider>
    </MigrationProvider>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
})
