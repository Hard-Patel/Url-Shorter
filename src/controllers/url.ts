import { Request, Response } from "express";
import { validateShortenUrl } from "../validators/url";
import { redirectToOriginalUrl, shortenUrl } from "../models/url";

export const shortenUrlController = async (
  request: Request,
  response: Response
) => {
  try {
    const { url } = request.body;
    const { success } = validateShortenUrl({ url });
    if (success) {
      await shortenUrl(url, response);
    } else {
      throw new Error("Bad request or invalid arguments");
    }
  } catch (error: any) {
    console.log("error: ", error);
    response.status(400).send({
      message: error.message || "Bad reqeust or invalid arguments",
      error: error,
    });
  }
};

export const getShortenUrl = async (request: Request, response: Response) => {
  try {
    const { short_url } = request.params;
    console.log('short_url: ', short_url);
    if (short_url) {
      await redirectToOriginalUrl(short_url, response);
    } else {
      response.redirect('/');
    }
  } catch (error: any) {
    console.log("error: ", error);
    response.status(400).send({
      message: error.message || "Bad reqeust or invalid arguments",
      error: error,
    });
  }
};
