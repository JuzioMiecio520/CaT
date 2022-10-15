import { customAlphabet as nanoid } from "nanoid";

export function randomString(
  length: number = 16,
  alphabet: string = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
): string {
  return nanoid(alphabet, length)();
}

export async function createId(prefix: string = ""): Promise<string> {
  return `${prefix}_${nanoid(
    "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    16
  )()}`;
}
