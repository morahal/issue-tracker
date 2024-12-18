"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Box, Flex } from "@radix-ui/themes";

const NavBar: React.FC = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Flex justify={"between"}>
        <Flex align={"center"} gap={"3"}>
          <Link href={"/"}>
            <AiFillBug />
          </Link>
          <ul className="flex space-x-6">
            {links.map((link) => (
              <Link
                key={link.href}
                className={classnames({
                  "text-zinc-900": link.href === currentPath,
                  "text-zinc-500": link.href !== currentPath,
                  "hover: text-zinc-800 transition-colors": true,
                })}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </ul>
        </Flex>

        <Box>
          {status === "authenticated" && (
            <Link href={"api/auth/signout"}>Logout</Link>
          )}
          {status === "unauthenticated" && (
            <Link href={"api/auth/signin"}>Signin</Link>
          )}
        </Box>
      </Flex>
    </nav>
  );
};

export default NavBar;
