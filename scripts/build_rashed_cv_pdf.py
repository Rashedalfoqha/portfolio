from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)


OUT = r"C:\Users\rashe\Downloads\Rashed_Mohammad_Alfuqaha_ATS_CV_2026.pdf"
NAVY = colors.HexColor("#1A365D")
INK = colors.HexColor("#1E1E1E")
MUTED = colors.HexColor("#4B4B4B")
BLUE = colors.HexColor("#1E5CA0")

doc = SimpleDocTemplate(
    OUT,
    pagesize=letter,
    leftMargin=0.58 * inch,
    rightMargin=0.58 * inch,
    topMargin=0.48 * inch,
    bottomMargin=0.48 * inch,
    title="Rashed Mohammad Alfuqaha - Full-Stack Software Engineer CV",
    author="Rashed Mohammad Alfuqaha",
    subject="ATS-ready software engineering resume",
)

styles = getSampleStyleSheet()
name_style = ParagraphStyle(
    "Name",
    fontName="Helvetica-Bold",
    fontSize=19.5,
    leading=21,
    textColor=NAVY,
    alignment=TA_CENTER,
    spaceAfter=1,
)
role_style = ParagraphStyle(
    "Role",
    fontName="Helvetica",
    fontSize=11.2,
    leading=13,
    textColor=MUTED,
    alignment=TA_CENTER,
    spaceAfter=2,
)
contact_style = ParagraphStyle(
    "Contact",
    fontName="Helvetica",
    fontSize=8.2,
    leading=10,
    textColor=MUTED,
    alignment=TA_CENTER,
    spaceAfter=3,
)
heading_style = ParagraphStyle(
    "Section",
    fontName="Helvetica-Bold",
    fontSize=10.4,
    leading=11.5,
    textColor=NAVY,
    spaceBefore=5,
    spaceAfter=2,
)
body_style = ParagraphStyle(
    "Body",
    fontName="Helvetica",
    fontSize=9.0,
    leading=11,
    textColor=INK,
    spaceAfter=1.8,
)
skill_style = ParagraphStyle(
    "Skill",
    parent=body_style,
    fontSize=8.75,
    leading=10.3,
    spaceAfter=0.8,
)
role_line_style = ParagraphStyle(
    "RoleLine",
    parent=body_style,
    fontName="Helvetica-Bold",
    fontSize=9.0,
    leading=10.6,
    spaceBefore=1.8,
    spaceAfter=0.8,
)
bullet_style = ParagraphStyle(
    "Bullet",
    parent=body_style,
    fontSize=8.65,
    leading=10.4,
    leftIndent=11,
    firstLineIndent=-7,
    bulletIndent=0,
    spaceAfter=1.0,
)
project_style = ParagraphStyle(
    "Project",
    parent=body_style,
    fontName="Helvetica-Bold",
    fontSize=9.0,
    leading=10.6,
    spaceBefore=1.7,
    spaceAfter=0.6,
)

story = []


def heading(text):
    story.append(Paragraph(text.upper(), heading_style))
    story.append(HRFlowable(width="100%", thickness=0.65, color=NAVY, spaceBefore=0, spaceAfter=2.5))


def bullet(text):
    # ASCII markers survive PDF text extraction consistently across ATS parsers.
    story.append(Paragraph(f"- {text}", bullet_style))


def role(title, date):
    story.append(
        Paragraph(
            f'<b>{title}</b><font color="#4B4B4B">{"&nbsp;" * 4}{date}</font>',
            role_line_style,
        )
    )


def project(name, stack, text):
    story.append(
        KeepTogether(
            [
                Paragraph(
                    f'<b>{name}</b> <font color="#4B4B4B"><i>| {stack}</i></font>',
                    project_style,
                ),
                Paragraph(f"- {text}", bullet_style),
            ]
        )
    )


story.append(Paragraph("RASHED MOHAMMAD ALFUQAHA", name_style))
story.append(Paragraph("Full-Stack Software Engineer", role_style))
story.append(
    Paragraph(
        'Amman, Jordan &nbsp;|&nbsp; '
        '<link href="tel:+962771709080" color="#1E5CA0">+962 77 170 9080</link> &nbsp;|&nbsp; '
        '<link href="mailto:rashedmohammadalfuqaha@gmail.com" color="#1E5CA0">rashedmohammadalfuqaha@gmail.com</link> &nbsp;|&nbsp; '
        '<link href="https://rashedalfouqaha.netlify.app/" color="#1E5CA0">rashedalfouqaha.netlify.app</link> &nbsp;|&nbsp; '
        '<link href="https://www.linkedin.com/in/rashedalfuqaha/" color="#1E5CA0">linkedin.com/in/rashedalfuqaha</link> &nbsp;|&nbsp; '
        '<link href="https://github.com/Rashedalfoqha" color="#1E5CA0">github.com/Rashedalfoqha</link>',
        contact_style,
    )
)

heading("Professional Summary")
story.append(
    Paragraph(
        "Full-Stack Software Engineer delivering production web applications with TypeScript, React, "
        "Next.js, Node.js, and NestJS. Builds responsive product interfaces, REST APIs, authentication "
        "and RBAC workflows, real-time features, and PostgreSQL/MongoDB data layers. Uses AI-assisted "
        "development for faster exploration and implementation while retaining ownership of architecture, "
        "code review, testing, security, and final engineering decisions.",
        body_style,
    )
)

heading("Technical Skills")
for label, value in [
    ("Languages", "JavaScript, TypeScript, Python (emerging)"),
    ("Front-End", "React, Next.js, Redux, SCSS, Tailwind CSS, Material UI, Responsive UI"),
    ("Back-End", "Node.js, Express.js, NestJS, REST APIs, GraphQL, Socket.IO"),
    ("Data", "PostgreSQL, MongoDB, Firebase"),
    ("Tools & Delivery", "Docker, Git, GitHub, Postman, VS Code, Figma Plugin API"),
    ("Engineering", "Authentication, RBAC, API Integration, Real-Time Systems, Package Development, Microservices (emerging)"),
    ("AI-Augmented Workflow", "Codex, Claude, Cursor, GLM - reviewed through type checks, linting, tests, and manual validation"),
]:
    story.append(Paragraph(f"<b>{label}:</b> {value}", skill_style))

heading("Professional Experience")
role("Software Engineer - GoldenTik (formerly CartBuzz), Amman, Jordan", "Jan 2026 - Present")
bullet(
    "Deliver full-stack changes for a private multi-vendor e-commerce platform using Next.js, NestJS, TypeScript, SCSS, Docker, and project-required integrations."
)
bullet(
    "Implement and review responsive interfaces, REST API integrations, and data-layer changes while protecting confidential product and business information."
)
bullet(
    "Apply Codex, Claude, Cursor, and GLM to scoped exploration and implementation, then validate generated changes through diff review, type checks, linting, tests, and manual verification."
)
role("Freelance Full-Stack Developer - Independent & Vero IT", "May 2025 - Dec 2025")
bullet(
    "Delivered responsive full-stack web applications using React, Next.js, Node.js, PostgreSQL, and MongoDB from requirements analysis through deployment."
)
bullet(
    "Built REST APIs, authentication and RBAC flows, real-time features, and responsive product interfaces independently and within a delivery team."
)
role("Freelance CAD Designer - Independent", "Jul 2022 - Oct 2023")
bullet(
    "Produced precise mosaic and architectural patterns and coordinated technical specifications with artisans and production teams."
)

heading("Selected Projects")
project(
    "EV Solution JO",
    "React, Node.js, MongoDB, PostgreSQL",
    "Built a full-stack operations platform for DC/AC EV charging with live station and session monitoring, reporting, and analytics.",
)
project(
    "Booster Icon System",
    "TypeScript, Node.js, Next.js, SVG, SVGO",
    "Engineered a framework-agnostic package pipeline for 25,396 SVG files with naming, security, parity, and runtime validation gates.",
)
project(
    "Figma Design Intelligence Plugin",
    "TypeScript, Figma Plugin API",
    "Built a plugin that extracts design-system structure, prototype graphs, Smart Animate relationships, and interaction metadata.",
)

heading("Education")
role("Immersive Full-Stack Web Development - MERAKI Academy", "Oct 2023 - Mar 2024")
story.append(
    Paragraph(
        "400+ hours of hands-on, project-based full-stack development training.",
        skill_style,
    )
)
role("Bachelor's Degree in Islamic Arts - WISE University", "Jul 2019 - Jul 2023")

heading("Languages")
story.append(
    Paragraph(
        "Arabic (Native) &nbsp;|&nbsp; Turkish (Fluent) &nbsp;|&nbsp; "
        "English (Basic Conversational Proficiency)",
        skill_style,
    )
)

doc.build(story)
print(OUT)
