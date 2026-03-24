import jwt from 'jwt-simple';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

const SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function createToken(userId: string, email: string, accountId: string) {
  return jwt.encode(
    {
      userId,
      email,
      accountId,
      iat: Math.floor(Date.now() / 1000),
    },
    SECRET
  );
}

export function decodeToken(token: string) {
  try {
    return jwt.decode(token, SECRET);
  } catch (error) {
    return null;
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function getAuthCookie() {
  const cookieStore = await cookies();
  return cookieStore.get('auth-token')?.value;
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
}

export async function verifyAuth() {
  const token = await getAuthCookie();
  if (!token) return null;

  const decoded = decodeToken(token);
  if (!decoded) return null;

  return decoded;
}
