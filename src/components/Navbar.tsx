import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Navbar as MantineNavbar,
  ThemeIcon,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
  Text,
  Menu,
} from "@mantine/core";
import {
  IconChevronRight,
  IconChevronLeft,
  IconSun,
  IconMoonStars,
  IconGitPullRequest,
  IconSettings,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconArrowsLeftRight,
  IconTrash,
  IconHome,
} from "@tabler/icons";

export default function Navbar() {
  const theme = useMantineTheme();
  const links: {
    title: string;
    icon: React.ReactNode;
    to: string;
    color?: string;
  }[] = [
    { title: "Home", icon: <IconHome size={16} />, to: "/", color: "blue" },
  ];

  return (
    <>
      <MantineNavbar p="xs" width={{ base: 300 }}>
        <MantineNavbar.Section grow>
          {links.map((link) => (
            <UnstyledButton
              sx={(theme) => ({
                display: "block",
                width: "100%",
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.black,

                "&:hover": {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                },
              })}
              onClick={() => console.log("navigate", link.to)}
            >
              <Group>
                <ThemeIcon color={link.color || "blue"} variant="light">
                  {link.icon}
                </ThemeIcon>

                <Text size="sm">{link.title}</Text>
              </Group>
            </UnstyledButton>
          ))}
        </MantineNavbar.Section>
        <MantineNavbar.Section>
          <Box
            sx={{
              paddingTop: theme.spacing.sm,
              borderTop: `1px solid ${
                theme.colorScheme === "dark"
                  ? theme.colors.dark[4]
                  : theme.colors.gray[2]
              }`,
            }}
          >
            <Menu shadow="md" width={200} position="right-end">
              <Menu.Target>
                <UnstyledButton
                  sx={{
                    display: "block",
                    width: "100%",
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[0]
                        : theme.black,

                    "&:hover": {
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[6]
                          : theme.colors.gray[0],
                    },
                  }}
                >
                  <Group>
                    <Avatar
                      src="https://xsgames.co/randomusers/assets/avatars/male/48.jpg"
                      radius="xl"
                    />
                    <Box sx={{ flex: 1 }}>
                      <Text size="sm" weight={500}>
                        Dennis Kappus
                      </Text>
                      <Text color="dimmed" size="xs">
                        kappus@example.com
                      </Text>
                    </Box>

                    {theme.dir === "ltr" ? (
                      <IconChevronRight size={18} />
                    ) : (
                      <IconChevronLeft size={18} />
                    )}
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item icon={<IconSettings size={14} />}>
                  Settings
                </Menu.Item>
                <Menu.Item icon={<IconMessageCircle size={14} />}>
                  Messages
                </Menu.Item>
                <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
                <Menu.Item
                  icon={<IconSearch size={14} />}
                  rightSection={
                    <Text size="xs" color="dimmed">
                      ⌘K
                    </Text>
                  }
                >
                  Search
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
                  Transfer my data
                </Menu.Item>
                <Menu.Item color="red" icon={<IconTrash size={14} />}>
                  Delete my account
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Box>
        </MantineNavbar.Section>
      </MantineNavbar>
    </>
  );
}
