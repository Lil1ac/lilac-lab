type GitHubContentResponse = {
  sha: string;
};

const allowedFiles = new Set([
  "content/profile.json",
  "content/projects.json",
  "content/posts.json",
  "content/site.json",
  "content/galgames.json"
]);

function encodeBase64(content: string) {
  return Buffer.from(content, "utf8").toString("base64");
}

async function getFileSha({
  repo,
  branch,
  path,
  token
}: {
  repo: string;
  branch: string;
  path: string;
  token: string;
}) {
  const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28"
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to read ${path}: ${response.status}`);
  }

  const data = (await response.json()) as GitHubContentResponse;
  return data.sha;
}

export async function saveJsonToGitHub({
  path,
  data,
  message
}: {
  path: string;
  data: unknown;
  message: string;
}) {
  if (!allowedFiles.has(path)) {
    throw new Error("File is not editable from admin");
  }

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH ?? "main";

  if (!token || !repo) {
    throw new Error("Missing GitHub admin environment variables");
  }

  const content = `${JSON.stringify(data, null, 2)}\n`;
  const sha = await getFileSha({ repo, branch, path, token });

  const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
    method: "PUT",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28"
    },
    body: JSON.stringify({
      branch,
      content: encodeBase64(content),
      message,
      sha
    })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Failed to save ${path}: ${response.status} ${details}`);
  }
}
