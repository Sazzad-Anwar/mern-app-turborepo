import supertest from "supertest";
import { createServer } from "../server";

let app = supertest(createServer());

describe("server", () => {
  it("health check returns 200", async () => {
    await app
      .get("/")
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("App is running!");
      });
  });
});
