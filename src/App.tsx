import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { ReactLocationDevtools } from "@tanstack/react-location-devtools";
import {
  ActionIcon,
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  Footer,
  Group,
  Header,
  Loader,
  MantineProvider,
  Text,
} from "@mantine/core";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { IconHome, IconMoonStars, IconSearch, IconSun } from "@tabler/icons";
import { SpotlightProvider } from "@mantine/spotlight";
import routes from "./pages";
import { ModalsProvider } from "@mantine/modals";

const location = new ReactLocation();

function App() {
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
        <SpotlightProvider
          actions={[
            {
              title: "Home",
              description: "Get to home page",
              onTrigger: () => console.log("navigate", "/"),
              icon: <IconHome size={18} />,
            },
          ]}
          searchIcon={<IconSearch size={18} />}
          searchPlaceholder="Search..."
          shortcut={["mod + K", "/"]}
          nothingFoundMessage="Nothing found..."
        >
          <ModalsProvider>
            <Router
              location={location}
              routes={routes}
              defaultPendingElement={<Loader />}
            >
              <AppShell
                padding={location.current.href === "/" ? 0 : "md"}
                fixed={false}
                navbar={
                  /()|(\/)|(\/login.*)/g.test(
                    location.current.href
                  ) ? undefined : (
                    <Navbar />
                  )
                }
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
                  /()|(\/)|(\/login.*)/g.test(
                    location.current.href
                  ) ? undefined : (
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
                  )
                }
              >
                <Outlet />
              </AppShell>
              <ReactLocationDevtools position="bottom-right" />
            </Router>
          </ModalsProvider>
        </SpotlightProvider>
      </ColorSchemeProvider>
    </MantineProvider>
  );
}

export default App;
