import z from "zod";
import { IShortUrlRequest } from "../interfaces/url";

export const validateShortenUrl = (request: IShortUrlRequest) => {
  const schema = z.object({
    url: z.string(),
  });

  return schema.safeParse(request);
};
