import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { STATUS_LABELS, type AttendanceScope } from "@/lib/constants";

type FideleRow = {
  nom: string;
  prenom: string;
  grade: string;
  jourPermanence: string;
  poste: string;
};

export function downloadFidelesPdf(rows: FideleRow[]) {
  const doc = new jsPDF({ orientation: "landscape" });
  doc.setFontSize(16);
  doc.text("Paroisse Sainte Philadelphie de Godomey Kangloe", 14, 16);
  doc.setFontSize(11);
  doc.setTextColor(80);
  doc.text("Liste des fidèles", 14, 24);
  doc.setTextColor(0);

  autoTable(doc, {
    startY: 30,
    head: [["Nom", "Prénom", "Grade", "Permanence", "Poste"]],
    body: rows.map((r) => [
      r.nom,
      r.prenom,
      r.grade,
      r.jourPermanence,
      r.poste,
    ]),
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: {
      fillColor: [30, 58, 95],
      textColor: 255,
    },
    alternateRowStyles: { fillColor: [248, 250, 252] },
  });

  doc.save(`fideles-${new Date().toISOString().slice(0, 10)}.pdf`);
}

type PresenceRow = {
  nom: string;
  prenom: string;
  status: string;
};

export function downloadPresencePdf(
  scope: AttendanceScope,
  date: Date,
  rows: PresenceRow[],
) {
  const doc = new jsPDF();
  const title =
    scope === "CHORALE" ? "Présences — Chorale" : "Présences — Paroisse";
  doc.setFontSize(15);
  doc.text("Paroisse Sainte Philadelphie de Godomey Kangloe", 14, 18);
  doc.setFontSize(11);
  doc.setTextColor(80);
  doc.text(title, 14, 26);
  doc.text(
    `Date : ${date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })}`,
    14,
    33,
  );
  doc.setTextColor(0);

  autoTable(doc, {
    startY: 40,
    head: [["Nom", "Prénom", "Statut"]],
    body: rows.map((r) => [
      r.nom,
      r.prenom,
      STATUS_LABELS[r.status as keyof typeof STATUS_LABELS] ?? r.status,
    ]),
    styles: { fontSize: 10, cellPadding: 4 },
    headStyles: {
      fillColor: [13, 148, 136],
      textColor: 255,
    },
    alternateRowStyles: { fillColor: [240, 253, 250] },
  });

  doc.save(`presences-${scope.toLowerCase()}-${date.toISOString().slice(0, 10)}.pdf`);
}
