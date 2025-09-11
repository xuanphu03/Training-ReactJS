import type { Request, Response } from 'express';
import express from 'express';
import session from 'express-session';
import type { Session, SessionData } from 'express-session';

const router = express();

type userRs = string;

router.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
    }, // 24h
  })
);

const users = [
  {
    id: 1,
    email: 'chuyennhagao@gmail.com',
    password: '123456',
  },
  {
    id: 2,
    email: 'demo@gmail.com',
    password: '123456',
  },
];

router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'User does not exist' });
  }

  (req.session as Session & Partial<SessionData> & { user?: userRs }).user =
    user.email;

  res.json({
    message: 'Login successful',
    user: (req.session as Session & Partial<SessionData> & { user?: userRs })
      .user,
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.json({ message: 'Logout successful' });
  });
});

export default router;
