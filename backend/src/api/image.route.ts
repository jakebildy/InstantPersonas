import express, { Request, Response } from "express";
import * as https from 'https';

export const router = express.Router();

const fetchImageAsBase64 = async (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    https.get(imageUrl, (response) => {
      const chunks: Buffer[] = [];
      response.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      response.on('end', () => {
        const imageData = Buffer.concat(chunks);
        const base64 = `data:${response.headers['content-type']};base64,${imageData.toString('base64')}`;
        resolve(base64);
      });
    }).on('error', reject);
  });
};

router.post("/image-to-base64", async (req: Request, res: Response) => {
  try {
    const src = req.body.src;
    if (!src) throw new Error("No src provided");
    const _base64 = await fetchImageAsBase64(src);    
    res.status(200).json({ base64: _base64 });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error : "Something went wrong"});
  }
});
