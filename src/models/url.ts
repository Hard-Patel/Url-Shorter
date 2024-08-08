import { Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prismaClient } from "../client/prisma";
import { nanoid } from "nanoid";

export const shortenUrl = async (url: string, response: Response) => {
  try {
    const shortUrlPresent = await prismaClient.url.findFirst({
      where: {
        shortUrl: url,
      },
    });

    if (shortUrlPresent?.originalUrl) {
      response.send({
        message: "Url already shortend!",
        data: shortUrlPresent,
      });
    } else {
      const shortUrl = nanoid(6);
      const Url = await prismaClient.url.create({
        data: {
          shortUrl: shortUrl,
          originalUrl: url,
          visitCount: 0,
        },
      });

      response.send({
        message: "Url shortend successfully!",
        data: Url,
      });
    }
  } catch (error: any) {
    console.log("e: ", error);
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        // Unique constraint failed
        response
          .status(400)
          .json({ error: "Unique constraint failed", details: error.meta });
      } else if (error.code === "P2003") {
        // Foreign key constraint failed
        response.status(400).json({
          error: "Foreign key constraint failed",
          details: error.meta,
        });
      } else {
        response
          .status(500)
          .json({ error: "Database error", details: error.message });
      }
    } else {
      // Handle other types of errors
      response.status(500).send({
        message: "Internal server error",
        data: {},
      });
    }
  }
};

export const redirectToOriginalUrl = async (
  short_url: string,
  response: Response
) => {
  try {
    const Url = await prismaClient.url.findFirst({
      where: {
        shortUrl: {
          equals: short_url,
        },
      },
    });
    console.log("Url: ", Url);

    if (Url?.originalUrl) {
      response.redirect(Url.originalUrl);
      await prismaClient.url.update({
        where: {
          id: Url.id,
        },
        data: {
          visitCount: {
            increment: 1,
          },
        },
      });
    } else {
      response.redirect("/");
    }
  } catch (error: any) {
    console.log("e: ", error);
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        // Unique constraint failed
        response
          .status(400)
          .json({ error: "Unique constraint failed", details: error.meta });
      } else if (error.code === "P2003") {
        // Foreign key constraint failed
        response.status(400).json({
          error: "Foreign key constraint failed",
          details: error.meta,
        });
      } else {
        response
          .status(500)
          .json({ error: "Database error", details: error.message });
      }
    } else {
      // Handle other types of errors
      response.status(500).send({
        message: "Internal server error",
        data: {},
      });
    }
  }
};
