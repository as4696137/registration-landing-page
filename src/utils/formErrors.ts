/**
 * Normalizes errors thrown by contestApi (which throws the parsed response
 * body on non-2xx). Laravel validation responses look like:
 *   { message: string, errors: { "field.path": string[] } }
 */
export type FieldErrors = Record<string, string>;

export interface NormalizedError {
  message: string;
  fields: FieldErrors;
}

export function normalizeApiError(err: unknown): NormalizedError {
  if (err && typeof err === "object") {
    const body = err as { message?: string; errors?: Record<string, string[]> };
    const fields: FieldErrors = {};
    if (body.errors) {
      for (const [key, msgs] of Object.entries(body.errors)) {
        if (Array.isArray(msgs) && msgs.length) fields[key] = msgs[0];
      }
    }
    return {
      message:
        body.message ||
        (Object.keys(fields).length ? "請修正表單中的錯誤後再送出。" : "發生錯誤，請稍後再試。"),
      fields,
    };
  }
  return { message: "無法連線到伺服器，請稍後再試。", fields: {} };
}
