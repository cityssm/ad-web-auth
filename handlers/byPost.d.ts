import type { Request, Response } from 'express';
export default function handler(request: Request<unknown, unknown, Record<string, string>>, response: Response): Promise<void>;
