import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as cookie from 'cookie';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    console.log("BODY", email, password);

    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis.' }, { status: 400 });
    }

    const admin = await prisma.adminUser.findUnique({
      where: { email },
    });
    console.log("Admin trouvé :", admin);

    if (!admin || !admin.passwordHash) {
      return NextResponse.json({ error: 'Identifiants invalides.' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash);
    console.log("Mot de passe valide :", isValid);
    if (!isValid) {
      return NextResponse.json({ error: 'Identifiants invalides.' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: admin.id, name: admin.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const isProd = process.env.NODE_ENV === 'production';

    const serialized = cookie.serialize('token', token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: '/',
    });

    const res = NextResponse.json({ success: true });
    res.headers.set('Set-Cookie', serialized);

    console.log("Envoi du token JWT...");

    return res;
  } catch (err) {
    console.error(err);
    console.log(err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
