// - Trim trailing slashes from NEXT_PUBLIC_API_*_DOMAIN before appending '/api'
//- Prevents malformed URLs like https://domain.com//api
//- Improves robustness of BASE_URL handling in different environments

function sanitizeDomain(domain?: string) {
  if (!domain) return "";
  return domain.endsWith("/") ? domain.slice(0, -1) : domain;
}

const prodDomain = sanitizeDomain(process.env.NEXT_PUBLIC_API_PRODUCTION_DOMAIN);
const devDomain = sanitizeDomain(process.env.NEXT_PUBLIC_API_DEVELOPMENT_DOMAIN);

export const BASE_URL = `${process.env.NODE_ENV === "production" ? prodDomain : devDomain}/api`;
