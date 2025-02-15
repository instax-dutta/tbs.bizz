import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type SearchBarProps = {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="relative">
      <Input type="text" placeholder="Search tools..." className="pl-10" onChange={(e) => onSearch(e.target.value)} />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
    </div>
  )
}

