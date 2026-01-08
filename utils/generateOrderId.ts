export function generateOrderId(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";

  // First 3 random letters
  const prefix = Array.from(
    { length: 3 },
    () => letters[Math.floor(Math.random() * letters.length)]
  ).join("");

  // Middle 4 digits from timestamp
  const timestampPart = Date.now().toString().slice(-4);

  // Last 3 random digits
  const randomDigits = Array.from(
    { length: 3 },
    () => digits[Math.floor(Math.random() * digits.length)]
  ).join("");

  // Last 1 random letter
  const randomLetter = letters[Math.floor(Math.random() * letters.length)];

  return `${prefix}-${timestampPart}-${randomDigits}${randomLetter}`;
}
