import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { GitHubProfile, RankedProject } from "@/types";

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontFamily: "Helvetica",
    color: "#111111",
    backgroundColor: "#FFFFFF",
    fontSize: 9.5,
    lineHeight: 1.45,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#111111",
    paddingBottom: 14,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#111111",
    marginBottom: 4,
  },
  title: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#2D2D2D",
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    fontSize: 8.5,
    color: "#4A5568",
    marginBottom: 6,
  },
  contactItem: {
    marginRight: 10,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: "#111111",
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    color: "#111111",
    borderBottomWidth: 1,
    borderBottomColor: "#111111",
    paddingBottom: 3,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 9,
    color: "#2D2D2D",
    lineHeight: 1.5,
  },
  skillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skillBadge: {
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: "#1E293B",
  },
  projectItem: {
    marginBottom: 9,
    paddingBottom: 7,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E2E8F0",
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  projectName: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#111111",
  },
  projectMeta: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#4B5563",
  },
  projectDesc: {
    fontSize: 8.5,
    color: "#374151",
    marginBottom: 3,
  },
  projectUrl: {
    fontSize: 7.5,
    color: "#2563EB",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 36,
    right: 36,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7.5,
    color: "#9CA3AF",
  },
});

interface ResumeProps {
  profile: GitHubProfile;
  projects: RankedProject[];
  summary: string;
}

export function ResumeDocument({ profile, projects, summary }: ResumeProps) {
  const languages = Array.from(
    new Set(projects.map((p) => p.language).filter(Boolean))
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{profile.name || profile.username}</Text>
          <Text style={styles.title}>
            Full-Stack Software Engineer & Open Source Builder
          </Text>

          <View style={styles.contactRow}>
            {profile.location && (
              <Text style={styles.contactItem}>Location: {profile.location}</Text>
            )}
            <Text style={styles.contactItem}>
              GitHub: github.com/{profile.username}
            </Text>
            {profile.blog && (
              <Text style={styles.contactItem}>Site: {profile.blog}</Text>
            )}
            {profile.twitter_username && (
              <Text style={styles.contactItem}>
                X: @{profile.twitter_username}
              </Text>
            )}
          </View>

          <View style={styles.statsRow}>
            <Text>Public Repos: {profile.public_repos}</Text>
            <Text>Followers: {profile.followers}</Text>
            <Text>Merged PRs: {profile.pull_requests_merged}</Text>
            <Text>Issues Closed: {profile.issues_closed}</Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summaryText}>{summary}</Text>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Core Technologies & Languages</Text>
          <View style={styles.skillsWrap}>
            {languages.map((lang, idx) => (
              <Text key={idx} style={styles.skillBadge}>
                {lang}
              </Text>
            ))}
            <Text style={styles.skillBadge}>React / Next.js</Text>
            <Text style={styles.skillBadge}>TypeScript</Text>
            <Text style={styles.skillBadge}>REST & GraphQL APIs</Text>
            <Text style={styles.skillBadge}>Git & CI/CD Pipelines</Text>
          </View>
        </View>

        {/* Top Open Source Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Key Projects & Open Source Contributions
          </Text>
          {projects.slice(0, 5).map((p) => (
            <View key={p.id} style={styles.projectItem}>
              <View style={styles.projectHeader}>
                <Text style={styles.projectName}>{p.name}</Text>
                <Text style={styles.projectMeta}>
                  {p.language} • {p.stargazers_count} Stars • {p.forks_count} Forks
                </Text>
              </View>
              <Text style={styles.projectDesc}>{p.description}</Text>
              <Text style={styles.projectUrl}>{p.html_url}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Generated automatically via port — Verified GitHub Portfolio Engine</Text>
          <Text>{new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</Text>
        </View>
      </Page>
    </Document>
  );
}
