import Link from "next/link"
import type { Tool } from "../../data/tools"
import { Card, CardContent } from "@/components/ui/card"

type ToolCardProps = {
  tool: Tool
}

export default function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon

  return (
    <Link href={tool.route}>
      <Card className="h-full hover:shadow-md transition-shadow bg-muted">
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex flex-col items-center text-center space-y-2 mb-2">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: tool.color }}
            >
              <Icon className="w-6 h-6 text-background" />
            </div>
            <h3 className="font-semibold text-primary">{tool.name}</h3>
          </div>
          <p className="text-xs text-muted-foreground flex-grow overflow-hidden">
            {tool.description.length > 150 ? `${tool.description.substring(0, 150)}...` : tool.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

