import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Domain color mapping based on actual domains from startups data
const domainColors: { [key: string]: string } = {
  // Current domains from startups data
  "AgriTech": "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:text-emerald-700",
  "HealthTech": "bg-green-100 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-700",
  "FinTech": "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100 hover:text-blue-700",
  "Enterprise SaaS": "bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-100 hover:text-indigo-700",
  "AI Agents": "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100 hover:text-purple-700",
  "InsurTech": "bg-cyan-100 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:text-cyan-700",
  "Enterprise Tech": "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-700",
  "FoodTech": "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100 hover:text-orange-700",
  "HR Tech": "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100 hover:text-yellow-700",
  "EdTech": "bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-100 hover:text-indigo-700",
  "LogiTech": "bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-100 hover:text-stone-700",
  "Adtech": "bg-pink-100 text-pink-700 border-pink-200 hover:bg-pink-100 hover:text-pink-700",
  "GovTech/CivicTech": "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-700",
  
  // Additional common domains for future use
  "AI": "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100 hover:text-purple-700",
  "AI/ML": "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100 hover:text-purple-700",
  "Sustainability": "bg-teal-100 text-teal-700 border-teal-200 hover:bg-teal-100 hover:text-teal-700",
  "Mobility": "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100 hover:text-orange-700",
  "Media": "bg-pink-100 text-pink-700 border-pink-200 hover:bg-pink-100 hover:text-pink-700",
  "TravelTech": "bg-cyan-100 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:text-cyan-700",
  "HRTech": "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100 hover:text-yellow-700",
  "GreenTech": "bg-lime-100 text-lime-700 border-lime-200 hover:bg-lime-100 hover:text-lime-700",
  "CleanTech": "bg-sky-100 text-sky-700 border-sky-200 hover:bg-sky-100 hover:text-sky-700",
  "PropTech": "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100 hover:text-amber-700",
  "SportsTech": "bg-red-100 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-700",
  "GovTech": "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-700",
  "LegalTech": "bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-100 hover:text-violet-700",
  "E-Commerce": "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-100 hover:text-rose-700",
  "Logistics": "bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-100 hover:text-stone-700",
  "SaaS": "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-gray-700",
  "Employment": "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100 hover:text-blue-700",
}

// Color palette for fallback domains (when a new domain is encountered)
const fallbackColors = [
  "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:text-emerald-700",
  "bg-green-100 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-700", 
  "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100 hover:text-blue-700",
  "bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-100 hover:text-indigo-700",
  "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100 hover:text-purple-700",
  "bg-cyan-100 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:text-cyan-700",
  "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-700",
  "bg-teal-100 text-teal-700 border-teal-200 hover:bg-teal-100 hover:text-teal-700",
  "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100 hover:text-orange-700",
  "bg-pink-100 text-pink-700 border-pink-200 hover:bg-pink-100 hover:text-pink-700",
  "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100 hover:text-yellow-700",
  "bg-lime-100 text-lime-700 border-lime-200 hover:bg-lime-100 hover:text-lime-700",
  "bg-sky-100 text-sky-700 border-sky-200 hover:bg-sky-100 hover:text-sky-700",
  "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100 hover:text-amber-700",
  "bg-red-100 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-700",
  "bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-100 hover:text-violet-700",
  "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-100 hover:text-rose-700",
  "bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-100 hover:text-stone-700",
]

/**
 * Get color classes for a domain badge
 * Automatically handles all domains from startups data and provides fallbacks for new domains
 */
export function getDomainColor(domain: string): string {
  // Check if we have a predefined color for this domain
  if (domainColors[domain]) {
    return domainColors[domain]
  }
  
  // For new domains, generate a consistent color based on the domain name
  const hash = domain.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)
  
  const index = Math.abs(hash) % fallbackColors.length
  return fallbackColors[index]
}
