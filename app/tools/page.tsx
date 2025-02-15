"use client"

import { useState, useMemo } from "react"
import { categories, tools } from "../data/tools"
import CategoryFilter from "./components/CategoryFilter"
import SearchBar from "./components/SearchBar"
import ToolGrid from "./components/ToolGrid"
import Pagination from "./components/Pagination"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const ITEMS_PER_PAGE = 30

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const categoryMatch = selectedCategory === "All" || tool.category === selectedCategory
      const searchMatch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      return categoryMatch && searchMatch
    })
  }, [selectedCategory, searchQuery])

  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE)
  const paginatedTools = filteredTools.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden mb-4 ml-4 mt-4">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open categories</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-white text-gray-800">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={(category) => {
              setSelectedCategory(category)
              setCurrentPage(1)
            }}
          />
        </SheetContent>
      </Sheet>
      <div className="hidden lg:block w-64 bg-white shadow-lg">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => {
            setSelectedCategory(category)
            setCurrentPage(1)
          }}
        />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden p-4">
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-8 rounded-3xl mb-8">
          <h1 className="text-4xl font-bold mb-4">BizForge Tools</h1>
          <p className="text-xl">Discover our powerful suite of business tools designed to help you succeed.</p>
        </div>
        <SearchBar
          onSearch={(query) => {
            setSearchQuery(query)
            setCurrentPage(1)
          }}
        />
        <div className="flex-1 overflow-auto mt-8">
          <ToolGrid tools={paginatedTools} />
        </div>
        <div className="mt-8 border-t border-gray-200 pt-4">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  )
}

