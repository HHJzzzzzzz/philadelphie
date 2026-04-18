export const GRADES = [
  "A/L",
  "A.M.W.",
  "Asst. Ev",
  "Ast.Ev.",
  "Deh",
  "Dev",
  "Dev.",
  "Ev",
  "Ev.",
  "Frère",
  "Leader",
  "Maman",
  "S.Ev.",
  "Sen.",
  "Soeur",
  "Sup.M",
  "Sup.S.Ev.",
  "Supr.Ev",
  "Supr.Ev.",
  "Sœur",
  "Sœur woli",
  "Toute",
  "V.S.Ev.",
  "V.Sup.M",
  "V.Sup.M.W",
  "Ven",
  "Ven.S.Ev.",
  "Ven. Sup.M",
  "Wolidja",
] as const;

export const JOURS_PERMANENCE = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
] as const;

export const SEXES = ["M", "F"] as const;

export type AttendanceScope = "CHORALE" | "PAROISSE";

export const ATTENDANCE_STATUS = {
  PRESENT: "PRESENT",
  ABSENT: "ABSENT",
  PERMISSIONNAIRE: "PERMISSIONNAIRE",
  IMPURE: "IMPURE",
} as const;

export type AttendanceStatus =
  (typeof ATTENDANCE_STATUS)[keyof typeof ATTENDANCE_STATUS];

export const STATUS_LABELS: Record<AttendanceStatus, string> = {
  PRESENT: "Présent",
  ABSENT: "Absent",
  PERMISSIONNAIRE: "Permissionnaire",
  IMPURE: "Impure",
};
