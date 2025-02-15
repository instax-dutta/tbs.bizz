import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          BizForge
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/tools" className="text-foreground hover:text-primary transition-colors">
            Tools
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-foreground">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background text-foreground">
            <nav className="flex flex-col space-y-4 mt-8">
              <Link href="/" className="text-lg font-semibold hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/tools" className="text-lg font-semibold hover:text-primary transition-colors">
                Tools
              </Link>
              <Link href="/about" className="text-lg font-semibold hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-lg font-semibold hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

