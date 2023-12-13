import React from "react";
import Image from "next/image";
import Link from "next/link";
function Navbar() {
  return (
    <nav className="sticky -top-0.5 mx-32 my-5 rounded-full items-center bg-slate-200 p-5 flex justify-center gap-3 ">
      <Image src="/logo.png" alt="logo" width={50} height={50} />
      <ul className="flex gap-3 justify-center items-center">
        <li>
          <Link href="/menu-semaine">Menu de Semaine</Link>
        </li>
        <li>
          <Link href="/suggestion">Suggestion</Link>
        </li>
        <li>
          <Link href="/historique">Historique</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
