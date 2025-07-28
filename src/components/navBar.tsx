"use client"
import { Button } from "./ui/button";
import { Globe, Bird } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link'

export function Navbar() {
  return (
    <header className="border-b border-white/20 bg-black/40 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Center everything in this row */}
        <div className="flex items-center justify-center h-16">
        <Link
          href="/"
          className="
            text-xl nunito-sans-bold text-white drop-shadow-sm
            animate-pulse
            transition-transform duration-300 ease-out
            hover:-translate-y-1 hover:scale-105
          "
        >
    Ceasefire.com
  </Link>
</div>
      </div>
    </header>
  )
}
  // return (
  //   <header className="border-b border-white/20 bg-black/40 backdrop-blur-md sticky top-0 z-50">
  //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //       <div className="flex items-center justify-between h-16">
  //         {/* Logo */}
  //         <div className="flex items-center space-x-2">
  //           <Link
  //             href="/"
  //             className="text-xl font-semibold text-white drop-shadow-sm hover:underline"
  //           >
  //             Ceasefire.com
  //           </Link>
  //         </div>

          {/* Navigation */}
          {/* <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-200 hover:text-white transition-colors">
              Home
            </a> */}
            {/* <a href="#" className="text-gray-200 hover:text-white transition-colors">
              All Conflicts
            </a>
            <a href="#" className="text-gray-200 hover:text-white transition-colors">
              Emergency Aid
            </a>
            <a href="#" className="text-gray-200 hover:text-white transition-colors">
              Peace Initiatives
            </a>
            <a href="#" className="text-gray-200 hover:text-white transition-colors">
              Get Involved
            </a> */}
          {/* </nav> */}

          {/* Language Switcher */}
          {/* <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-gray-300" />
            <div className="flex items-center space-x-1 text-sm">
              <button className="text-gray-200  px-2 py-1 rounded hover:bg-white/10 transition-colors">
                🇺🇸
              </button>
              <span className="text-gray-500">|</span>
              <button className="text-gray-200  px-2 py-1 rounded hover:bg-white/10 transition-colors">
                🇺🇦
              </button>
              <span className="text-gray-500">|</span>
              <button className="text-gray-200  px-2 py-1 rounded hover:bg-white/10 transition-colors">
                🇷🇺
              </button>
              <span className="text-gray-500">|</span>
              <button className="text-gray-200 px-2 py-1 rounded hover:bg-white/10 transition-colors">
                🌍
              </button>
            </div>
          </div> */}
//         </div>
//       </div>
//     </header>
//   );
// }