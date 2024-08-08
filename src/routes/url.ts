import express from "express";
import { UrlRoutes } from "../constants/routes";
import { getShortenUrl, shortenUrlController } from "../controllers/url";

const router = express.Router();

router.get(UrlRoutes.GetShortenUrl, getShortenUrl);

router.post(UrlRoutes.ShortenUrl, shortenUrlController);

export { router as UrlRouter };
