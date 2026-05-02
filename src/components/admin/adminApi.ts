"use client";

export async function saveContent({
  password,
  file,
  data,
  message
}: {
  password: string;
  file: string;
  data: unknown;
  message: string;
}) {
  const response = await fetch("/api/admin/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, file, data, message })
  });

  const result = (await response.json()) as { ok?: boolean; error?: string };

  if (!response.ok || !result.ok) {
    throw new Error(result.error ?? "保存失败");
  }
}
