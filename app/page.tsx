import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Zap, Globe, Search, BarChart3, Phone, PlaneTakeoff, Bike, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] pointer-events-none" />
        <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-lg relative z-10">
          Empower Your Business with BizForge
        </h1>
        <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto relative z-10">
          Access a suite of powerful tools to supercharge your online presence and drive your business forward.
        </p>
        <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-white/90 relative z-10">
          <Link href="/tools" className="flex items-center">
            Explore Our Tools <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </section>

      <section className="py-16 bg-gradient-to-r from-yellow-100 to-pink-100 rounded-3xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-purple-800">Our Comprehensive Toolkit</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
          {[
            {
              icon: Zap,
              title: "Domain Management",
              description: "Check availability and manage domains with ease",
              color: "bg-blue-500",
            },
            {
              icon: Globe,
              title: "IP & Brand Monitoring",
              description: "Track IPs and protect your brand online",
              color: "bg-green-500",
            },
            {
              icon: Search,
              title: "Web Scraping & Analysis",
              description: "Extract data and analyze sentiments effortlessly",
              color: "bg-purple-500",
            },
            {
              icon: BarChart3,
              title: "Economic Insights",
              description: "Access GDP data for informed decision-making",
              color: "bg-yellow-500",
            },
            {
              icon: Phone,
              title: "Phone Validation",
              description: "Verify and validate phone numbers globally",
              color: "bg-red-500",
            },
            {
              icon: PlaneTakeoff,
              title: "Aviation Data",
              description: "Comprehensive info on aircraft and airlines",
              color: "bg-indigo-500",
            },
            {
              icon: Bike,
              title: "Motorcycle Specs",
              description: "Detailed data on motorcycle models",
              color: "bg-pink-500",
            },
            {
              icon: Sparkles,
              title: "And More!",
              description: "Discover our full range of powerful business tools",
              color: "bg-teal-500",
            },
          ].map((tool, index) => (
            <Card
              key={index}
              className="bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-full ${tool.color} flex items-center justify-center mb-4`}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-gray-800">{tool.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{tool.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center py-16 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-3xl overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] pointer-events-none" />
        <h2 className="text-4xl font-bold mb-6 text-white drop-shadow-lg relative z-10">Ready to Forge Ahead?</h2>
        <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto relative z-10">
          Discover how BizForge can transform your business operations and drive growth.
        </p>
        <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-white/90 relative z-10">
          <Link href="/tools" className="flex items-center">
            Get Started Now <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </section>
    </div>
  )
}

