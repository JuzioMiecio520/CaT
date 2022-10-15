const supertest = require("supertest");
const { BASE_URL } = require("./CONSTS");

const request = supertest(BASE_URL + "/users");
const USER_ADMIN = {
  id: "user_M1cDRHla0fEsndWW",
  token: "AFdsIcK9VF0M22D3HmScH3n5Zg4TF43aJVoZtbOwZOJLZFgr",
  username: "admin",
  password: "1234",
  requirePasswordChange: false,
  permissions: ["*"],
  createdAt: new Date(1665592412572),
  updatedAt: new Date(1665592412572),
};
const USER_NORMAL = {
  id: "55890afd-6ec0-4918-b212-68da21146e96",
  token: "ZCqEuCOVlXFkQTNozlbNylrYqxCmm0d0osDnPv4skmXNPSDm",
  username: "user",
  password: "6789",
  createdAt: new Date(1665592412572),
  permissions: ["homepage"],
};

describe("/v1/users/login", () => {
  test("no username and password", async () => {
    const response = await request.post(`/login`).send({});

    expect(response.status).toBe(400);
    expect(response.body.body.error.type).toBe("validation");
    expect(response.body.body.error.code).toBe("invalid_request");
    expect(response.body.body.error.details).toHaveLength(2);
    expect(response.body.body.username).toBeUndefined();
  });

  test("correct username and password", async () => {
    const response = await request.post(`/login`).send({
      username: USER_ADMIN.username,
      password: USER_ADMIN.password,
    });

    expect(response.status).toBe(200);
    expect(response.body.body.username).toBe(USER_ADMIN.username);
    expect(response.body.body.password).toBeUndefined();
  });

  test("incorrect username and password", async () => {
    const response = await request.post(`/login`).send({
      username: USER_ADMIN.username + "__",
      password: USER_ADMIN.password + "__",
    });

    expect(response.status).toBe(400);
    expect(response.body.body.error.type).toBe("authentication");
    expect(response.body.body.error.code).toBe("invalid_credentials");
    expect(response.body.body.username).toBeUndefined();
  });

  test("correct username and incorrect password", async () => {
    const response = await request.post(`/login`).send({
      username: USER_ADMIN.username,
      password: USER_ADMIN.password + "__",
    });

    expect(response.status).toBe(400);
    expect(response.body.body.error.type).toBe("authentication");
    expect(response.body.body.error.code).toBe("invalid_credentials");
    expect(response.body.body.username).toBeUndefined();
  });
});

describe("/v1/users/me & authorization middleware", () => {
  test("correct token", async () => {
    const response = await request
      .get(`/me`)
      .set("Authorization", `Key ${USER_ADMIN.token}`);

    expect(response.status).toBe(200);
    expect(response.body.body.username).toBe(USER_ADMIN.username);
    expect(response.body.body.password).toBeUndefined();
  });
  test("incorrect token", async () => {
    const response = await request.get(`/me`).set("Authorization", `Key 1234`);

    expect(response.status).toBe(401);
    expect(response.body.body.error.type).toBe("authentication");
    expect(response.body.body.error.code).toBe("invalid_token");
    expect(response.body.body.username).toBeUndefined();
  });
  test("no header", async () => {
    const response = await request.get(`/me`);

    expect(response.status).toBe(401);
    expect(response.body.body.error.type).toBe("authentication");
    expect(response.body.body.error.code).toBe("no_auth");
    expect(response.body.body.username).toBeUndefined();
  });
  test("invalid token type", async () => {
    const response = await request.get(`/me`).set("Authorization", `Hi 1234`);

    expect(response.status).toBe(401);
    expect(response.body.body.error.type).toBe("authentication");
    expect(response.body.body.error.code).toBe("invalid_token_type");
    expect(response.body.body.username).toBeUndefined();
  });
  test("no token", async () => {
    const response = await request.get(`/me`).set("Authorization", `Key `);

    expect(response.status).toBe(401);
    expect(response.body.body.error.type).toBe("authentication");
    expect(response.body.body.error.code).toBe("no_token");
    expect(response.body.body.username).toBeUndefined();
  });
});
