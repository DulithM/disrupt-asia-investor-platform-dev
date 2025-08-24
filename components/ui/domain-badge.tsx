import * as React from "react"

interface DomainBadgeProps {
  domain: string
  className?: string
}

// Domain color mapping with inline styles
const getDomainStyles = (domain: string) => {
  const domainColors: { [key: string]: { backgroundColor: string; color: string; borderColor: string } } = {
    // Current domains from the data
    "AgriTech": { backgroundColor: "#d1fae5", color: "#047857", borderColor: "#a7f3d0" },
    "HealthTech": { backgroundColor: "#dcfce7", color: "#15803d", borderColor: "#bbf7d0" },
    "FinTech": { backgroundColor: "#dbeafe", color: "#1d4ed8", borderColor: "#bfdbfe" },
    "Enterprise SaaS": { backgroundColor: "#e0e7ff", color: "#3730a3", borderColor: "#c7d2fe" },
    "AI Agents": { backgroundColor: "#f3e8ff", color: "#7c3aed", borderColor: "#ddd6fe" },
    "InsurTech": { backgroundColor: "#cffafe", color: "#0e7490", borderColor: "#a5f3fc" },
    "Enterprise Tech": { backgroundColor: "#f1f5f9", color: "#334155", borderColor: "#cbd5e1" },
    "FoodTech": { backgroundColor: "#fed7aa", color: "#ea580c", borderColor: "#fdba74" },
    "HR Tech": { backgroundColor: "#fef3c7", color: "#a16207", borderColor: "#fde68a" },
    "EdTech": { backgroundColor: "#e0e7ff", color: "#3730a3", borderColor: "#c7d2fe" },
    "LogiTech": { backgroundColor: "#f5f5f4", color: "#57534e", borderColor: "#d6d3d1" },
    "Adtech": { backgroundColor: "#fce7f3", color: "#be185d", borderColor: "#fbcfe8" },
    "GovTech/CivicTech": { backgroundColor: "#f1f5f9", color: "#334155", borderColor: "#cbd5e1" },
    
    // Additional common domains for future use
    "AI": { backgroundColor: "#f3e8ff", color: "#7c3aed", borderColor: "#ddd6fe" },
    "AI/ML": { backgroundColor: "#f3e8ff", color: "#7c3aed", borderColor: "#ddd6fe" },
    "Sustainability": { backgroundColor: "#ccfbf1", color: "#0f766e", borderColor: "#99f6e4" },
    "Mobility": { backgroundColor: "#fed7aa", color: "#ea580c", borderColor: "#fdba74" },
    "Media": { backgroundColor: "#fce7f3", color: "#be185d", borderColor: "#fbcfe8" },
    "TravelTech": { backgroundColor: "#cffafe", color: "#0e7490", borderColor: "#a5f3fc" },
    "HRTech": { backgroundColor: "#fef3c7", color: "#a16207", borderColor: "#fde68a" },
    "GreenTech": { backgroundColor: "#ecfccb", color: "#65a30d", borderColor: "#d9f99d" },
    "CleanTech": { backgroundColor: "#e0f2fe", color: "#0369a1", borderColor: "#bae6fd" },
    "PropTech": { backgroundColor: "#fef3c7", color: "#d97706", borderColor: "#fde68a" },
    "SportsTech": { backgroundColor: "#fee2e2", color: "#dc2626", borderColor: "#fecaca" },
    "GovTech": { backgroundColor: "#f1f5f9", color: "#334155", borderColor: "#cbd5e1" },
    "LegalTech": { backgroundColor: "#f3e8ff", color: "#7c3aed", borderColor: "#ddd6fe" },
    "E-Commerce": { backgroundColor: "#ffe4e6", color: "#e11d48", borderColor: "#fecdd3" },
    "Logistics": { backgroundColor: "#f5f5f4", color: "#57534e", borderColor: "#d6d3d1" },
    "SaaS": { backgroundColor: "#f3f4f6", color: "#374151", borderColor: "#d1d5db" },
    "Employment": { backgroundColor: "#dbeafe", color: "#1d4ed8", borderColor: "#bfdbfe" },
  }

  return domainColors[domain] || domainColors["SaaS"] // Default to SaaS colors for unknown domains
}

export function DomainBadge({ domain, className = "" }: DomainBadgeProps) {
  const styles = getDomainStyles(domain)
  
  return (
    <span 
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
      style={{
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        borderColor: styles.borderColor,
        borderWidth: "1px",
        borderStyle: "solid"
      }}
    >
      {domain}
    </span>
  )
}
