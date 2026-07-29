import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const jobs = JSON.parse(await fs.readFile(path.join(root, "state", "jobs.json"), "utf8"));
const outputDir = path.join(root, "output");
await fs.mkdir(outputDir, { recursive: true });

const workbook = Workbook.create();
const tracker = workbook.worksheets.add("Job Tracker");
const rules = workbook.worksheets.add("Scoring Guide");
tracker.showGridLines = false;
rules.showGridLines = false;

tracker.mergeCells("A1:N1");
tracker.getRange("A1").values = [["RASHED — REMOTE JOB SCOUT"]];
tracker.getRange("A1:N1").format = {
  fill: "#17191C",
  font: { name: "Arial", size: 20, bold: true, color: "#FFFFFF" },
  verticalAlignment: "center",
};
tracker.getRange("A1:N1").format.rowHeight = 40;

tracker.mergeCells("A2:N2");
tracker.getRange("A2").values = [[
  `Generated ${new Date().toLocaleString("en-GB")} · ${jobs.length} qualified remote roles · Review before applying`,
]];
tracker.getRange("A2:N2").format = {
  fill: "#F3F0E9",
  font: { name: "Cascadia Mono", size: 9, color: "#616872" },
};

const headers = [
  "Score", "Status", "Role", "Company", "Location", "Remote", "Source",
  "Published", "Matched Skills", "Missing Skills", "Salary", "Job URL", "First Seen",
  "Application Warning",
];
tracker.getRange("A4:N4").values = [headers];
tracker.getRange("A4:N4").format = {
  fill: "#C65332",
  font: { name: "Cascadia Mono", size: 9, bold: true, color: "#FFFFFF" },
  verticalAlignment: "center",
};

const rows = jobs.map((job) => [
  Number(job.score),
  job.status || "New",
  job.title,
  job.company,
  job.location,
  job.remote ? "Yes" : "No",
  job.source,
  job.published_at || "",
  (job.matched_skills || []).join(", "),
  (job.missing_skills || []).join(", "),
  job.salary || "",
  job.url,
  job.first_seen || "",
  job.application_warning || "",
]);

if (rows.length) {
  tracker.getRangeByIndexes(4, 0, rows.length, headers.length).values = rows;
  const lastRow = rows.length + 4;
  const table = tracker.tables.add(`A4:N${lastRow}`, true, "RemoteJobs");
  table.style = "TableStyleMedium2";
  table.showBandedRows = true;
  tracker.getRange(`A5:A${lastRow}`).format.numberFormat = "0";
  tracker.getRange(`M5:M${lastRow}`).format.numberFormat = "yyyy-mm-dd hh:mm";
  tracker.getRange(`N5:N${lastRow}`).format.wrapText = true;
  tracker.getRange(`N5:N${lastRow}`).conditionalFormats.add("containsText", {
    text: "Manual-only",
    format: { fill: "#FFF1EB", font: { color: "#8D351D", bold: true } },
  });
  tracker.getRange(`A5:N${lastRow}`).format.rowHeight = 36;
  tracker.getRange(`A5:A${lastRow}`).conditionalFormats.add("colorScale", {
    thresholds: ["min", "50%", "max"],
    colors: ["#F5C4B4", "#F4E3A3", "#A7D9C9"],
  });
  tracker.getRange(`B5:B${lastRow}`).dataValidation = {
    rule: { type: "list", values: ["New", "Reviewing", "Ready", "Applied", "Interview", "Rejected", "Archived"] },
  };
  tracker.getRange(`B5:B${lastRow}`).conditionalFormats.add("containsText", {
    text: "Applied",
    format: { fill: "#D8EFE8", font: { color: "#16624F", bold: true } },
  });
  tracker.getRange(`I5:J${lastRow}`).format.wrapText = true;
  tracker.getRange(`L5:L${lastRow}`).format.font = { color: "#1F5C99", underline: true };
}

tracker.freezePanes.freezeRows(4);
tracker.freezePanes.freezeColumns(2);
const widths = [8, 13, 34, 22, 24, 9, 13, 13, 36, 24, 18, 48, 22, 52];
widths.forEach((width, index) => {
  tracker.getRangeByIndexes(0, index, Math.max(5, rows.length + 4), 1).format.columnWidth = width;
});
tracker.getRange(`A4:N${Math.max(5, rows.length + 4)}`).format.verticalAlignment = "top";
tracker.getRange(`A4:N${Math.max(5, rows.length + 4)}`).format.font.size = 9;

rules.getRange("A1:D1").merge();
rules.getRange("A1").values = [["MATCH SCORE — AUDITABLE RULES"]];
rules.getRange("A1:D1").format = {
  fill: "#17191C",
  font: { name: "Arial", size: 18, bold: true, color: "#FFFFFF" },
};
rules.getRange("A3:D9").values = [
  ["Signal", "Points", "Purpose", "Notes"],
  ["Target role title", "Up to +30", "Full Stack / Frontend / Backend / Software Engineer", "Avoids irrelevant titles"],
  ["Primary stack", "Up to +30", "JavaScript, TypeScript, React, Next.js, Node.js, NestJS, APIs, databases", "5 points per detected skill"],
  ["Secondary stack", "Up to +10", "Redux, Tailwind, Socket.IO, Firebase, Docker, Git", "2 points per detected skill"],
  ["Remote/location", "Up to +15", "Remote and globally compatible wording", "Jordan eligibility still requires manual verification"],
  ["Seniority mismatch", "-14 to -35", "Senior stretch; Staff/Principal excluded", "Prevents inflated matches"],
  ["Technology mismatch", "-22", "Laravel/PHP/WordPress/.NET/mobile-native", "Not the current core stack"],
];
rules.getRange("A3:D3").format = {
  fill: "#C65332",
  font: { name: "Cascadia Mono", size: 9, bold: true, color: "#FFFFFF" },
};
rules.getRange("A3:D9").format.wrapText = true;
rules.getRange("A:D").format.columnWidth = 26;
rules.getRange("C:D").format.columnWidth = 42;
rules.freezePanes.freezeRows(3);

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(path.join(outputDir, "Rashed_Remote_Job_Tracker.xlsx"));

const preview = await workbook.render({
  sheetName: "Job Tracker",
  range: `A1:N${Math.min(Math.max(8, rows.length + 4), 18)}`,
  scale: 1,
  format: "png",
});
await fs.writeFile(
  path.join(outputDir, "tracker-preview.png"),
  new Uint8Array(await preview.arrayBuffer()),
);

const inspection = await workbook.inspect({
  kind: "sheet,table,region",
  sheetId: "Job Tracker",
  range: `A1:N${Math.min(Math.max(8, rows.length + 4), 18)}`,
  maxChars: 5000,
  tableMaxRows: 8,
  tableMaxCols: 14,
});
await fs.writeFile(path.join(outputDir, "tracker-inspection.ndjson"), inspection.ndjson, "utf8");
