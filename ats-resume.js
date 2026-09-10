/* ============================================================
   ATS Resume Generator — Lakshman Sharma
   Generates a clean, ATS-friendly PDF using jsPDF.
   No images, no logos, no declaration — pure text, single column.
   Update the `resumeData` object below to change resume content.
   ============================================================ */

const resumeData = {
  name: "LAKSHMAN SHARMA",
  contact: {
    email: "lakshmansharma217@gmail.com",
    phone: "+91 7002966224",
    location: "Guwahati, Assam, India",
    linkedin: "linkedin.com/in/lakshman-sharma-048563286",
    github: "github.com/Lakshmansharma12",
  },
  summary:
    "Final-year B.Tech CSE student with hands-on experience in AI/ML, LLM fine-tuning (QLoRA), and full-stack web development. Built production-grade projects spanning applied deep learning, data-driven web apps, and responsive front-end interfaces. Seeking internship and entry-level opportunities in AI/ML and software engineering.",
  education: [
    {
      degree: "Bachelor of Technology — Computer Science & Engineering",
      institution: "University of Science and Technology Meghalaya (USTM)",
      duration: "2023 – 2027 (Expected)",
      cgpa: "8.4 CGPA",
    },
  ],
  skills: {
    "Programming Languages": "C, C++, Python, JavaScript",
    "Web Development":
      "HTML5, CSS3, Tailwind CSS, Bootstrap, Node.js, Express.js, MongoDB, Mongoose",
    "AI / ML":
      "Machine Learning, Deep Learning, Generative AI, LLMs, LLM Fine-Tuning (QLoRA), Dataset Preparation",
    "Core CS": "Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, OOP",
    "Tools & Platforms": "Git / GitHub, Google Colab, Gemini API",
  },
  experience: [
    {
      role: "AI/ML Intern",
      company: "IIT Guwahati",
      duration: "Jul – Aug 2026",
      points: [
        "Developed an AI-based nutritionist application using LLMs for nutrition-related information and conversational assistance.",
        "Prepared and processed nutrition-focused datasets for model training and fine-tuning.",
        "Fine-tuned an LLM using QLoRA to improve contextual understanding of nutrition queries and conversational responses.",
        "Evaluated model outputs and refined training data to improve quality, relevance, and consistency.",
        "Integrated the fine-tuned model into the application workflow for end-to-end inference.",
      ],
    },
    {
      role: "Frontend Development Intern",
      company: "Cognifyz Technologies",
      duration: "Dec 2024 – Jan 2025",
      points: [
        "Built interactive, responsive web pages with HTML, CSS, JavaScript and Tailwind CSS, including a Tic-Tac-Toe game.",
        "Integrated third-party APIs to fetch and display dynamic data within web applications.",
        "Developed responsive UI components with Bootstrap and handled client-side form validation.",
        "Focused on cross-browser usability and a consistent experience across all pages.",
      ],
    },
  ],
  projects: [
    {
      name: "Virtual Herbal Garden",
      tech: "Tailwind CSS, JavaScript",
      description:
        "A responsive web app for exploring medicinal plants with structured plant cards and an interactive quiz to boost user engagement.",
    },
    {
      name: "Cosmetic Store Management System",
      tech: "Database Design, Web App",
      description:
        "A full management system covering inventory, products, suppliers, POS, expiry alerts, and reporting with admin/user workflows and billing.",
    },
    {
      name: "Earthquake Early Warning — AI/DL",
      tech: "Deep Learning, Signal Data",
      description:
        "A proposed AI/DL system for rapid earthquake detection using regional seismic waveform datasets.",
    },
  ],
  certifications: [
    "Google Cloud Computing Foundation — NPTEL",
    "Fundamentals of Machine Learning — Microsoft Learn",
    "Fundamental AI Concepts — LinkedIn Learning",
    "Pwskills Masterclass — Pwskills",
  ],
  achievements: [
    "Participated in a 12-hour offline hackathon, 'Greeks of Gurukul,' gaining hands-on exposure to Web3 and blockchain.",
    "Continuously developing skills in C++, DSA, web development, AI/ML and generative AI.",
  ],
};

/* ---------- PDF generator ---------- */

function generateATSResume() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const PAGE_W = 210;
  const MARGIN = 18;
  const CONTENT_W = PAGE_W - 2 * MARGIN;
  const LINE_H = 5.5;
  const PAGE_H = 297;
  const BOTTOM_MARGIN = 22;
  let y = MARGIN;

  /* helpers */
  function checkPage(needed) {
    if (y + needed > PAGE_H - BOTTOM_MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  }

  function drawLine() {
    doc.setDrawColor(180);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 3;
  }

  function sectionTitle(text) {
    checkPage(14);
    y += 3;
    drawLine();
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(30, 30, 30);
    doc.text(text.toUpperCase(), MARGIN, y);
    y += LINE_H + 2;
  }

  function bodyText(text, indent) {
    indent = indent || 0;
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    const lines = doc.splitTextToSize(text, CONTENT_W - indent);
    lines.forEach(function (line) {
      checkPage(LINE_H);
      doc.text(line, MARGIN + indent, y);
      y += LINE_H;
    });
  }

  function bulletPoint(text) {
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    const lines = doc.splitTextToSize(text, CONTENT_W - 8);
    lines.forEach(function (line, i) {
      checkPage(LINE_H);
      if (i === 0) {
        doc.text("\u2022", MARGIN + 2, y);
      }
      doc.text(line, MARGIN + 8, y);
      y += LINE_H;
    });
  }

  /* ---- Name ---- */
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(20, 20, 20);
  doc.text(resumeData.name, PAGE_W / 2, y, { align: "center" });
  y += 8;

  /* ---- Contact row ---- */
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(70, 70, 70);
  const c = resumeData.contact;
  const contactLine1 = c.email + "  |  " + c.phone + "  |  " + c.location;
  doc.text(contactLine1, PAGE_W / 2, y, { align: "center" });
  y += 4.5;
  const contactLine2 = c.linkedin + "  |  " + c.github;
  doc.text(contactLine2, PAGE_W / 2, y, { align: "center" });
  y += 4;

  /* ---- Summary ---- */
  sectionTitle("Professional Summary");
  bodyText(resumeData.summary);

  /* ---- Education ---- */
  sectionTitle("Education");
  resumeData.education.forEach(function (edu) {
    checkPage(14);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(30, 30, 30);
    doc.text(edu.degree, MARGIN, y);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(90, 90, 90);
    doc.text(edu.duration, PAGE_W - MARGIN, y, { align: "right" });
    y += LINE_H;
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    doc.text(edu.institution + "  —  " + edu.cgpa, MARGIN, y);
    y += LINE_H + 1;
  });

  /* ---- Skills ---- */
  sectionTitle("Technical Skills");
  Object.keys(resumeData.skills).forEach(function (category) {
    checkPage(LINE_H + 2);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(30, 30, 30);
    doc.text(category + ": ", MARGIN, y);
    var labelWidth = doc.getTextWidth(category + ": ");
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    var remaining = doc.splitTextToSize(
      resumeData.skills[category],
      CONTENT_W - labelWidth
    );
    if (remaining.length === 1) {
      doc.text(remaining[0], MARGIN + labelWidth, y);
      y += LINE_H + 1;
    } else {
      doc.text(remaining[0], MARGIN + labelWidth, y);
      y += LINE_H;
      for (var i = 1; i < remaining.length; i++) {
        checkPage(LINE_H);
        doc.text(remaining[i], MARGIN, y);
        y += LINE_H;
      }
      y += 1;
    }
  });

  /* ---- Experience ---- */
  sectionTitle("Experience");
  resumeData.experience.forEach(function (exp) {
    checkPage(18);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(30, 30, 30);
    doc.text(exp.role, MARGIN, y);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(90, 90, 90);
    doc.text(exp.duration, PAGE_W - MARGIN, y, { align: "right" });
    y += LINE_H;
    doc.setFont("Helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(70, 70, 70);
    doc.text(exp.company, MARGIN, y);
    y += LINE_H + 1;

    exp.points.forEach(function (pt) {
      bulletPoint(pt);
    });
    y += 2;
  });

  /* ---- Projects ---- */
  sectionTitle("Projects");
  resumeData.projects.forEach(function (proj) {
    checkPage(16);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(30, 30, 30);
    doc.text(proj.name, MARGIN, y);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(90, 90, 90);
    doc.text(proj.tech, PAGE_W - MARGIN, y, { align: "right" });
    y += LINE_H;
    bodyText(proj.description);
    y += 2;
  });

  /* ---- Certifications ---- */
  sectionTitle("Certifications");
  resumeData.certifications.forEach(function (cert) {
    bulletPoint(cert);
  });

  /* ---- Achievements ---- */
  sectionTitle("Achievements & Activities");
  resumeData.achievements.forEach(function (ach) {
    bulletPoint(ach);
  });

  /* ---- Save ---- */
  doc.save("Lakshman_Sharma_Resume.pdf");
}
