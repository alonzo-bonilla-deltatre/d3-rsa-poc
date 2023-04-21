import { NextApiRequest, NextApiResponse } from "next";
import logger from "@/utilities/logger";
import { LoggerLevel } from "@/models/types/logger";
import { getRobotsTxt } from "@/services/robotsService";

const renderRobots = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const robotsTxtContent = await getRobotsTxt();

    res.setHeader("Content-Type", "text/plain");
    res.write(robotsTxtContent ?? "");
    res.end();
  } catch (error) {
    logger.log("Error rendering robots.txt", LoggerLevel.error);

    res.status(500).send("Internal server error");
  }
};


export default renderRobots;
