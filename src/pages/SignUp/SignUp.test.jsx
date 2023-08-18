import { validatePassword } from "./SignUp";

describe('validatePassword function', () => {
  test('returns true for a valid password with all requirements', () => {
    const validPassword = 'ValidPassword123';
    const isValid = validatePassword(validPassword);
    expect(isValid).toBe(true);
  });

  test('returns false for an empty password', () => {
    const emptyPassword = '';
    const isValid = validatePassword(emptyPassword);
    expect(isValid).toBe(false);
  });

  test('returns false for a password with insufficient length', () => {
    const shortPassword = 'Short1';
    const isValid = validatePassword(shortPassword);
    expect(isValid).toBe(false);
  });

  test('returns false for a password without lowercase letters', () => {
    const uppercaseOnlyPassword = 'UPPERCASE123';
    const isValid = validatePassword(uppercaseOnlyPassword);
    expect(isValid).toBe(false);
  });

  test('returns false for a password without uppercase letters', () => {
    const lowercaseOnlyPassword = 'lowercase123';
    const isValid = validatePassword(lowercaseOnlyPassword);
    expect(isValid).toBe(false);
  });

  test('returns false for a password without numbers', () => {
    const noNumberPassword = 'PasswordWithoutNumbers';
    const isValid = validatePassword(noNumberPassword);
    expect(isValid).toBe(false);
  });

  test('returns false for a password that violates multiple requirements', () => {
    const invalidPassword = 'short';
    const isValid = validatePassword(invalidPassword);
    expect(isValid).toBe(false);
  });
});




