export default function parseURL(url: string) {
  const parts = url.split('/').filter(Boolean);
  return { resource: parts[parts.length - 2], id: parts[parts.length - 1] };
}
