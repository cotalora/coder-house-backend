import { Request, Response } from 'npm:express';

export const mainController = (req: Request, res: Response) => {
    res.set('Content-Type', 'text/html');
    res.send('<h2>Test String</h2>');
}