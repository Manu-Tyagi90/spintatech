import { Request, Response, NextFunction } from 'express'

export function clientAuth(req: Request, res: Response, next: NextFunction) {
  // For demo: use a simple header check. In production, use JWT/session.
  const clientSecret = process.env.CLIENT_SECRET || 'spintatechclient'
  if (req.headers['x-client-secret'] === clientSecret) {
    return next()
  }
  return res.status(401).json({ success: false, message: 'Unauthorized' })
}