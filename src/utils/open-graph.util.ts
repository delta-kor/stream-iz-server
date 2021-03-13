import { NextFunction, Request, Response } from 'express';
import { promises as fs } from 'fs';

const userAgents: string[] = [
  'facebookexternalhit/1.1; kakaotalk-scrap/1.0; +https://devtalk.kakao.com/t/scrap/33984',
];

export default async function OpenGraph(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userAgent = req.get('User-Agent')!;
  if (userAgents.includes(userAgent)) {
    const file = await fs.readFile('open-graph.html');
    const html = file.toString();
    const data = html.replace('%PATH%', req.path);

    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.send(data);
  } else {
    next();
  }
}
