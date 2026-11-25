import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");

describe("Decap CMS content setup", () => {
  it("contains all editable page sections", () => {
    const content = JSON.parse(
      readFileSync(resolve(projectRoot, "client/src/content/site.json"), "utf8")
    ) as Record<string, unknown>;

    expect(Object.keys(content)).toEqual(["home", "about", "services", "contact", "submitMusic"]);
    expect(content.home).toMatchObject({ headlineLineOne: "MUSIC FOR", headlineLineTwo: "WHAT'S NEXT." });
    expect(content.about).toHaveProperty("storyParagraphOne");
    expect(content.services).toHaveProperty("introParagraphOne");
  });

  it("points Decap CMS at the Git Gateway and the content file", () => {
    const config = readFileSync(resolve(projectRoot, "client/public/admin/config.yml"), "utf8");

    expect(config).toContain("name: git-gateway");
    expect(config).toContain("file: \"client/src/content/site.json\"");
  });
});
