import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MenuIcon, ClubIcon, ComputerIcon, HistoryIcon, TvIcon } from "@/components/icons";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
   
     
      <footer className="bg-muted text-muted-foreground py-4 px-6 mt-auto">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">&copy; 2024 News Website</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-sm font-medium hover:text-muted-foreground/80"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-muted-foreground/80"
              prefetch={false}
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
