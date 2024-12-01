export function toFirstUpper(text: string): string {
  if (!text.length) return text;
  else if (text.length === 1) return text.toUpperCase();
  else return `${text[0].toUpperCase()}${text.slice(1)}`;
}

export function textToSplitParts(text: string) {
  return text
    .split(/(?=[A-Z])/)
    .filter(Boolean)
    .map(part => part.toLowerCase());
}
