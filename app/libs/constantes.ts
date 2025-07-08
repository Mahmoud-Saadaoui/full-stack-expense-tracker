function sanitizeDomain(domain?: string) {
  if (!domain) return "";
  return domain.endsWith("/") ? domain.slice(0, -1) : domain;
}

const prodDomain = sanitizeDomain(process.env.NEXT_PUBLIC_API_PRODUCTION_DOMAIN);
const devDomain = sanitizeDomain(process.env.NEXT_PUBLIC_API_DEVELOPMENT_DOMAIN);

export const BASE_URL = `${process.env.NODE_ENV === "production" ? prodDomain : devDomain}/api`;
