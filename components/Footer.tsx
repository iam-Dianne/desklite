import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="container py-12 flex flex-col items-center gap-3 justify-center border-t border-foreground/20 text-muted">
      <p className="text-sm ">ramirez.dianneangelika@gmail.com | 2026</p>
      <ul className="flex items-center justify-center gap-4">
        <Link
          href={"https://www.linkedin.com/in/dianne-ramirez/"}
          className=" text-2xl"
        >
          <FaLinkedin />
        </Link>
        <Link href={"https://github.com/iam-Dianne"} className=" text-2xl">
          <FaGithub />
        </Link>
      </ul>
    </div>
  );
};

export default Footer;
