export function shrinkString(str: string, maxLength: number): string {
  if (!str) return '';

  str = str.replace(/\n/g, '').trim();

  if (str.length <= maxLength) {
    return str;
  }

  const truncatedLength = maxLength - 2;

  if (truncatedLength <= 0) {
    return '..';
  }

  return str.substring(0, truncatedLength) + '...';
}
