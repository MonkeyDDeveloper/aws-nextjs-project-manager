import { Link } from "@nextui-org/react"
import Image from "next/image";
import logo from "@/utils/images/javier_logo.jpeg"
import { urls } from "@/urls";

export default function AppLogo() {
  return (
    <Link href={urls.base}>
        <Image      
            alt="Javier Code Logo"
            src={logo}
        />
    </Link>
  );
}