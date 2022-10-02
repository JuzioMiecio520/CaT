import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";
import { useForm } from "@mantine/form";

export default function Login() {
  const form = useForm({
    initialValues: {
      login: "",
      password: "",
      rememberMe: true,
    },
  });

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        <Anchor<"a">
          href="#"
          size="sm"
          onClick={(event) => {
            event.preventDefault();
            openModal({
              title: "I don't have an account",
              children: (
                <>
                  If you do not currently have an account setup{" "}
                  <b>on this CAT instance</b> please ask the CAT instance owner
                  to create one for you. If you want to host your own instance
                  of CAT check out the{" "}
                  <Text
                    variant={"link"}
                    component={"a"}
                    href={"https://github.com/JuzioMiecio520/cat"}
                  >
                    GitHub repository
                  </Text>{" "}
                  for this project.
                  <br />
                  <br />
                  If you are an owner of this website and want users to be able
                  to create their own accounts (not recommended), please install
                  the{" "}
                  <Text
                    variant={"link"}
                    component={"a"}
                    href={"https://github.com/JuzioMiecio520/CAT-MoreUsers"}
                  >
                    MoreUsers plugin
                  </Text>
                  <Button fullWidth onClick={() => closeAllModals()} mt="md">
                    Ok
                  </Button>
                </>
              ),
            });
          }}
        >
          Do not have an account yet?
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            label="Login"
            placeholder="Your login"
            required
            {...form.getInputProps("login")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <Group position="apart" mt="md">
            <Checkbox
              label="Remember me"
              {...form.getInputProps("rememberMe")}
            />
            <Anchor<"a">
              onClick={(event) => {
                event.preventDefault();
                openModal({
                  title: "I forgot my password",
                  children: (
                    <>
                      If you forgot your account password you please ask the CAT
                      instance owner to reset it for you in the admin dashboard
                      <Button
                        fullWidth
                        onClick={() => closeAllModals()}
                        mt="md"
                      >
                        Ok
                      </Button>
                    </>
                  ),
                });
              }}
              href="#"
              size="sm"
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button type={"submit"} fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
