import {
  ReactLocation,
  Router,
  Route,
  Outlet,
  Link,
} from "@tanstack/react-location";
import { ReactLocationDevtools } from "@tanstack/react-location-devtools";
import {
  MantineProvider,
  Loader,
  AppShell,
  Header,
  useMantineTheme,
  Text,
  Footer,
  MediaQuery,
  Burger,
  Box,
  Group,
  ActionIcon,
  UnstyledButton,
  Avatar,
  useMantineColorScheme,
  ThemeIcon,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import Home from "./pages/Home";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { IconMoonStars, IconSun } from "@tabler/icons";

const location = new ReactLocation();
const routes: Route[] = [{ path: "/", element: <Home /> }];

function App() {
  const theme = useMantineTheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: colorScheme }}
    >
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <Router
          location={location}
          routes={routes}
          defaultPendingElement={<Loader />}
        >
          <AppShell
            padding="md"
            fixed={false}
            navbar={<Navbar />}
            header={
              <Header height={60}>
                <Group sx={{ height: "100%" }} px={20} position="apart">
                  {/* TODO: insert logo (should be SVG with 2 color schemes depending on the website theme) */}
                  <svg width={1} height={1}></svg>
                  <ActionIcon
                    variant="outline"
                    onClick={() => toggleColorScheme()}
                    color={colorScheme === "dark" ? "yellow" : "blue"}
                    size={30}
                  >
                    {colorScheme === "dark" ? (
                      <IconSun size={16} />
                    ) : (
                      <IconMoonStars size={16} />
                    )}
                  </ActionIcon>
                </Group>
              </Header>
            }
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            })}
            footer={
              <Footer height={60} p="md">
                Made with ❤ by CAT contributors on{" "}
                <Text
                  variant="link"
                  href="https://github.com/JuzioMiecio520/cat"
                  component={"a"}
                >
                  GitHub
                </Text>
              </Footer>
            }
          >
            <Outlet />
          </AppShell>
          <ReactLocationDevtools position="bottom-right" />
        </Router>
      </ColorSchemeProvider>
    </MantineProvider>
  );
}

export default App;
