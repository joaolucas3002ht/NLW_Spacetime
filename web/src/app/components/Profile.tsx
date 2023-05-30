import { User } from "lucide-react";
import Image from "next/image";
import { getUser } from "../lib/auth";

export function Profile() {
  const { avatarUrl, name } = getUser();

  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        src={avatarUrl}
        width={40}
        height={40}
        className="h-11 w-11 border-gray-300 border-2 rounded-full"
        alt="image github avatar"
      />
      <p className="max-w-[8.75rem] text-sm leading-snug">{name}
      <a href="#" className="block text-red-400 hover:text-red-300">Quero sair</a>
      </p>
    </div>
  );
}
