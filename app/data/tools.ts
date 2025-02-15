import {
  Globe,
  Search,
  BarChart,
  Phone,
  PlaneTakeoff,
  BirdIcon as Helicopter,
  Bike,
  Zap,
  Shield,
  FileText,
  CreditCard,
  DollarSign,
  Link,
  Calendar,
  TrendingUp,
  Share2,
} from "lucide-react"
import type { ComponentType } from "react"

export type Tool = {
  id: string
  name: string
  description: string
  category: string
  icon: ComponentType
  color: string
  route: string
}

export const categories = [
  "All",
  "Domain Management",
  "IP & Brand",
  "Web & Analysis",
  "Economic Data",
  "Communication",
  "Aviation",
  "Automotive",
  "Finance",
  "Social Media Analytics",
]

const iconMap = {
  Globe,
  Search,
  BarChart,
  Phone,
  PlaneTakeoff,
  Helicopter,
  Bike,
  Zap,
  Shield,
  FileText,
  CreditCard,
  DollarSign,
  Link,
  Calendar,
  TrendingUp,
  Share2,
}

const colorPalette = [
  "#FF4A00",
  "#96BF48",
  "#E37400",
  "#FFE01B",
  "#F06A6A",
  "#FFCC22",
  "#6772E5",
  "#F22F46",
  "#2D8CFF",
  "#0061FF",
]

export const tools: Tool[] = [
  {
    id: "1",
    name: "Domain Availability Checker",
    description: "Check domain availability and retrieve basic registration information for any given domain.",
    category: "Domain Management",
    icon: iconMap.Globe,
    color: colorPalette[0],
    route: "/tools/domain-checker",
  },
  {
    id: "2",
    name: "WhoIs Lookup",
    description: "Retrieve detailed domain registration information for comprehensive domain analysis.",
    category: "Domain Management",
    icon: iconMap.Search,
    color: colorPalette[1],
    route: "/tools/whois-lookup",
  },
  {
    id: "3",
    name: "IP Lookup",
    description: "Get detailed information about an IP address, including geolocation and network details.",
    category: "IP & Brand",
    icon: iconMap.Globe,
    color: colorPalette[2],
    route: "/tools/ip-lookup",
  },
  {
    id: "4",
    name: "Web Scraper",
    description: "Retrieve HTML and plaintext data from any website URL for data extraction and analysis.",
    category: "Web & Analysis",
    icon: iconMap.FileText,
    color: colorPalette[4],
    route: "/tools/web-scraper",
  },
  {
    id: "5",
    name: "Sentiment Analyzer",
    description: "Get fast and accurate sentiment analysis results for any given text.",
    category: "Web & Analysis",
    icon: iconMap.BarChart,
    color: colorPalette[5],
    route: "/tools/sentiment-analyzer",
  },
  {
    id: "6",
    name: "GDP Data",
    description: "Access current and historical GDP data for countries around the world.",
    category: "Economic Data",
    icon: iconMap.CreditCard,
    color: colorPalette[6],
    route: "/tools/gdp-data",
  },
  {
    id: "7",
    name: "Phone Validator",
    description: "Check whether a given phone number is valid and retrieve its metadata.",
    category: "Communication",
    icon: iconMap.Phone,
    color: colorPalette[7],
    route: "/tools/phone-validator",
  },
  {
    id: "8",
    name: "Aircraft Information",
    description: "Get detailed technical specs on over 1,000 airplane models.",
    category: "Aviation",
    icon: iconMap.PlaneTakeoff,
    color: colorPalette[8],
    route: "/tools/aircraft-info",
  },
  {
    id: "9",
    name: "Airline Data",
    description: "Access general and detailed fleet information for over 1,000 airlines.",
    category: "Aviation",
    icon: iconMap.PlaneTakeoff,
    color: colorPalette[9],
    route: "/tools/airline-data",
  },
  {
    id: "10",
    name: "Helicopter Database",
    description: "Retrieve detailed technical specs on hundreds of helicopter models.",
    category: "Aviation",
    icon: iconMap.Helicopter,
    color: colorPalette[0],
    route: "/tools/helicopter-database",
  },
  {
    id: "11",
    name: "Motorcycle Specs",
    description: "Access highly-detailed technical data on tens of thousands of different motorcycle models.",
    category: "Automotive",
    icon: iconMap.Bike,
    color: colorPalette[1],
    route: "/tools/motorcycle-specs",
  },
  {
    id: "12",
    name: "Market Cap Finder",
    description: "Get real-time market capitalization data for any publicly traded company.",
    category: "Finance",
    icon: iconMap.DollarSign,
    color: colorPalette[2],
    route: "/tools/market-cap-finder",
  },
  {
    id: "13",
    name: "URL Lookup",
    description: "Get location and hosting information for any URL or domain name.",
    category: "Web & Analysis",
    icon: iconMap.Link,
    color: colorPalette[3],
    route: "/tools/url-lookup",
  },
  {
    id: "14",
    name: "Earnings Calendar",
    description: "Access earnings results and upcoming earning dates for major companies.",
    category: "Finance",
    icon: iconMap.Calendar,
    color: colorPalette[4],
    route: "/tools/earnings-calendar",
  },
  {
    id: "15",
    name: "Gold Price",
    description: "Get real-time gold futures price from the Chicago Mercantile Exchange (CME).",
    category: "Finance",
    icon: iconMap.TrendingUp,
    color: colorPalette[5],
    route: "/tools/gold-price",
  },
  {
    id: "16",
    name: "SharedCount",
    description: "Retrieve social media share counts for URLs",
    category: "Social Media Analytics",
    icon: iconMap.Share2,
    color: colorPalette[6],
    route: "/tools/shared-count",
  },
]

