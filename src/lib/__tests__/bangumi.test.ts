import { afterEach, describe, expect, it, vi } from "vitest";
import { getBangumiSubject } from "../bangumi";

describe("bangumi client", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns undefined when fetch fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));

    await expect(getBangumiSubject(253997)).resolves.toBeUndefined();
  });

  it("normalizes subject response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          id: 253997,
          name: "Summer Pockets",
          name_cn: "Summer Pockets",
          summary: "summary",
          images: { common: "https://lain.bgm.tv/pic.jpg" },
          rating: { score: 8.1 },
          rank: 123
        })
      })
    );

    await expect(getBangumiSubject(253997)).resolves.toEqual({
      id: 253997,
      name: "Summer Pockets",
      nameCn: "Summer Pockets",
      summary: "summary",
      image: "https://lain.bgm.tv/pic.jpg",
      score: 8.1,
      rank: 123,
      url: "https://bgm.tv/subject/253997"
    });
  });
});
