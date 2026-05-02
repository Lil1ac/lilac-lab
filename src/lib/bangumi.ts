import type { BangumiSubject } from "./types";

type BangumiSubjectResponse = {
  id: number;
  name: string;
  name_cn?: string;
  summary?: string;
  images?: {
    common?: string;
    large?: string;
    medium?: string;
  };
  rating?: {
    score?: number;
  };
  rank?: number;
};

type NextFetchInit = RequestInit & {
  next: {
    revalidate: number;
  };
};

const userAgent = "LilacLab/0.1.0 (https://github.com/Lil1ac/lilac-lab)";
const dayInSeconds = 60 * 60 * 24;

export async function getBangumiSubject(id: number): Promise<BangumiSubject | undefined> {
  const requestInit: NextFetchInit = {
    headers: {
      "User-Agent": userAgent,
      Accept: "application/json"
    },
    next: {
      revalidate: dayInSeconds
    }
  };

  try {
    const response = await fetch(`https://api.bgm.tv/v0/subjects/${id}`, requestInit);

    if (!response.ok) {
      return undefined;
    }

    const subject = (await response.json()) as BangumiSubjectResponse;

    return {
      id: subject.id,
      name: subject.name,
      nameCn: subject.name_cn ?? subject.name,
      summary: subject.summary ?? "",
      image: subject.images?.common ?? subject.images?.medium ?? subject.images?.large ?? "",
      score: subject.rating?.score,
      rank: subject.rank,
      url: `https://bgm.tv/subject/${subject.id}`
    };
  } catch {
    return undefined;
  }
}
