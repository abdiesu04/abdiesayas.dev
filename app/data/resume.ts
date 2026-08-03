/** The résumé is a document, not content the site retypes: the section serves
 *  the real file, so what a visitor reads on screen and what lands in their
 *  downloads folder can never drift apart. Replacing the PDF in /public — and
 *  its first-page image, used where a browser will not inline a PDF — is the
 *  whole update. */
export const pdfPath = "/abdi-esayas-resume.pdf";
export const previewPath = "/resume-preview.png";

/** Page proportions of the file, so the frame can hold it without letterboxing
 *  or a scrollbar. */
export const previewSize = { width: 1130, height: 1600 };

/** What the file is called once it is saved, rather than the slug it is served
 *  under. */
export const downloadName = "Abdi-Esayas-Resume.pdf";
