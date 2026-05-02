import { NextResponse } from "next/server";
import { saveJsonToGitHub } from "@/lib/admin/githubContent";
import { validateContentPayload } from "@/lib/admin/validateContent";

type SaveRequest = {
  password?: string;
  file?: string;
  data?: unknown;
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as SaveRequest;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json({ error: "ADMIN_PASSWORD is not configured" }, { status: 500 });
  }

  if (body.password !== adminPassword) {
    return NextResponse.json({ error: "Invalid admin password" }, { status: 401 });
  }

  if (!body.file || !body.message || !validateContentPayload(body.file, body.data)) {
    return NextResponse.json({ error: "Invalid content payload" }, { status: 400 });
  }

  try {
    await saveJsonToGitHub({
      path: body.file,
      data: body.data,
      message: body.message
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save content" },
      { status: 500 }
    );
  }
}
