function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown) {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isLinkArray(value: unknown) {
  return (
    Array.isArray(value) &&
    value.every((item) => isRecord(item) && typeof item.label === "string" && typeof item.href === "string")
  );
}

function validateProfile(data: unknown) {
  return (
    isRecord(data) &&
    typeof data.name === "string" &&
    typeof data.handle === "string" &&
    typeof data.status === "string" &&
    typeof data.location === "string" &&
    isStringArray(data.directions) &&
    isLinkArray(data.links)
  );
}

function validateProjects(data: unknown) {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        isRecord(item) &&
        typeof item.slug === "string" &&
        typeof item.title === "string" &&
        typeof item.description === "string" &&
        isStringArray(item.tags) &&
        typeof item.featured === "boolean" &&
        typeof item.updatedAt === "string" &&
        typeof item.href === "string"
    )
  );
}

function validatePosts(data: unknown) {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        isRecord(item) &&
        typeof item.slug === "string" &&
        typeof item.title === "string" &&
        typeof item.excerpt === "string" &&
        typeof item.publishedAt === "string" &&
        isStringArray(item.tags)
    )
  );
}

export function validateContentPayload(file: string, data: unknown) {
  if (file === "content/profile.json") {
    return validateProfile(data);
  }

  if (file === "content/projects.json") {
    return validateProjects(data);
  }

  if (file === "content/posts.json") {
    return validatePosts(data);
  }

  if (file === "content/site.json" || file === "content/galgames.json") {
    return typeof data === "object" && data !== null;
  }

  return false;
}
