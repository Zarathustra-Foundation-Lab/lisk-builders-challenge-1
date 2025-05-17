export const truncateAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

/**
 * Parses social media URL to ensure consistent format
 * @param url - The input URL (with or without http/https)
 * @returns The cleaned URL without protocol
 */
export const parseSocialUrl = (url: string): string => {
  if (!url) return "";
  // Remove http/https if present
  return url.replace(/^(https?:\/\/)?(www\.)?/, "").trim();
};

/**
 * Joins array of social media URLs into a single string with ; separator
 * @param socials - Array of social media URLs
 * @returns Joined string with ; separator
 */
export const joinSocials = (socials: string[]): string => {
  return socials
    .map((url) => parseSocialUrl(url))
    .filter((url) => url)
    .join(";");
};
