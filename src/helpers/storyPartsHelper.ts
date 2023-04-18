export const getSrcFromMarkup = (html: string): string => {
  if (!html) {
    return "";
  }
  const patternRegex = /(?<=src=").*?(?=[\*"])/g;
  const src = Array.from(html.matchAll(patternRegex)).map(m => m[0]);
  
  return src.length > 0 ? src[0] : "";
}