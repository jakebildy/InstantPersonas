"use client";
import { motion } from "framer-motion";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  XIcon,
  TwitterShareButton,
} from "react-share";

export function Share({ title, url }: { title: string; url: string }) {
  return (
    <div>
      <div className=" font-bold text-lg mt-10 mb-5">
        If this was useful, share this with your friends!
      </div>

      <TwitterShareButton title={title} url={url}>
        <motion.div
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <XIcon borderRadius={20}></XIcon>
        </motion.div>
      </TwitterShareButton>

      <RedditShareButton title={title} url={url}>
        <motion.div
          initial={{ scale: 0.8 }}
          //    on hover scale to 1.1
          whileHover={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <RedditIcon borderRadius={20}></RedditIcon>
        </motion.div>
      </RedditShareButton>

      <EmailShareButton title={title} url={url}>
        <motion.div
          initial={{ scale: 0.8 }}
          //    on hover scale to 1.1
          whileHover={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <EmailIcon borderRadius={20}></EmailIcon>
        </motion.div>
      </EmailShareButton>

      <FacebookShareButton title={title} url={url}>
        <motion.div
          initial={{ scale: 0.8 }}
          //    on hover scale to 1.1
          whileHover={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <FacebookIcon borderRadius={20}></FacebookIcon>
        </motion.div>
      </FacebookShareButton>
    </div>
  );
}
