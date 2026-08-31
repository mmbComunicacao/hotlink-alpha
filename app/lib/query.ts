export function getQueryId(
  searchParams: Record<string, string | string[] | undefined>
): string {
  const rawId = searchParams.id
  return Array.isArray(rawId) ? (rawId[0] ?? 'demo') : (rawId ?? 'demo')
}
