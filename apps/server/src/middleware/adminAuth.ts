import { Request, Response, NextFunction } from 'express'

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  const adminSecret = process.env.ADMIN_SECRET || 'spintatechadmin'
  if (req.headers['x-admin-secret'] === adminSecret) {
    return next()
  }
  return res.status(401).json({ success: false, message: 'Unauthorized' })
}