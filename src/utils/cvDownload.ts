export interface CVOption {
  value: string;
  label: string;
  file: string;
  filename: string;
}

export const ENGLISH_CV: CVOption = {
  value: "english",
  label: "English CV",
  file: "/static/Jawdat Abdullah - 2025.pdf",
  filename: "Jawdat Abdullah - CV.pdf",
};

export const HEBREW_CV: CVOption = {
  value: "hebrew",
  label: "Hebrew CV",
  file: "/static/גודאת עבדאללה - קורות חיים 2025.pdf",
  filename: "גודאת עבדאללה - קורות חיים 2025.pdf",
};

export function downloadCV(option: CVOption): void {
  const link = document.createElement("a");
  link.href = option.file;
  link.download = option.filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
