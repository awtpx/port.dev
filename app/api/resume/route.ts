import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer, DocumentProps } from "@react-pdf/renderer";
import React from "react";
import { getGitHubUser, getRankedProjects } from "@/lib/github";
import { generateAIBio } from "@/lib/ai";
import { ResumeDocument } from "@/lib/resume-pdf";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username")?.trim();

    if (!username) {
      return NextResponse.json(
        { error: "Username parameter is required" },
        { status: 400 }
      );
    }

    // Validate username pattern: alphanumeric, dashes, underscores
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return NextResponse.json(
        { error: "Invalid username format" },
        { status: 400 }
      );
    }

    // Fetch user details & top projects
    const profile = await getGitHubUser(username);
    if (!profile) {
      return NextResponse.json(
        { error: `User '${username}' not found on GitHub` },
        { status: 404 }
      );
    }

    const projects = await getRankedProjects(username);
    const summary = await generateAIBio(profile, projects);

    // Render PDF to buffer
    const element = React.createElement(ResumeDocument, {
      profile,
      projects,
      summary,
    }) as unknown as React.ReactElement<DocumentProps>;

    const buffer = await renderToBuffer(element);

    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${username}-port-resume.pdf"`,
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Resume generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate resume PDF", details: errorMessage },
      { status: 500 }
    );
  }
}
