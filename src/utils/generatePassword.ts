interface GeneratePasswordOptions {
  length: number;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

const generatePassword = ({
  length,
  includeLowercase,
  includeUppercase,
  includeNumbers,
  includeSymbols,
}: GeneratePasswordOptions): string => {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  let charset = "";
  if (includeLowercase) charset += lowercase;
  if (includeUppercase) charset += uppercase;
  if (includeNumbers) charset += numbers;
  if (includeSymbols) charset += symbols;

  if (!charset) return "";

  const charsetArray = charset.split("");
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  let generatedPassword = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = randomValues[i] % charsetArray.length;
    generatedPassword += charsetArray[randomIndex];
  }

  return generatedPassword;
};

export default generatePassword;
