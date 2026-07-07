"use client";

import BottomNav, { NavTab } from "@/components/shared/BottomNav";
import type { UpdateItem } from "@/types/update";

const newsCards: UpdateItem[] = [
  {
    img: "https://www.figma.com/api/mcp/asset/3779446e-cbbc-4fe0-9059-03bb6b5b587b",
    title: "Exciting Update: New Renewable Energy System Launched for Mini Estate",
    excerpt: "The mini estate has successfully implemented a new power generation system using solar panels and wind turbines, promising lower bills and a greener environment for all residents.",
    body: [
      "In recent developments, the mini estate has successfully implemented a new power generation system that promises to enhance energy efficiency and sustainability. This initiative is a significant step towards reducing our carbon footprint and ensuring a reliable energy supply for all residents.",
      "The new system utilises solar panels and wind turbines, harnessing renewable energy sources to power common areas and amenities. This dual approach not only lowers electricity costs but also contributes to a greener environment, aligning with our commitment to sustainability.",
      "Residents can expect to see a noticeable decrease in their energy bills as the estate transitions to this innovative power generation model. The project is expected to be fully operational by the end of the month, with ongoing monitoring to ensure optimal performance.",
      "In addition to cost savings, the estate's management is excited about the potential for increased property values. Homes powered by renewable energy sources are becoming increasingly desirable, and this upgrade positions our community as a leader in eco-friendly living.",
      "To celebrate this milestone, we will be hosting an informational session next week where residents can learn more about the new system and ask questions. We encourage everyone to attend and participate in discussions about our energy future.",
      "Thank you for your continued support as we work towards a more sustainable and efficient living environment for all residents of the mini estate.",
    ],
    isNew: true,
    categoryColor: "purple",
    label: "Announcements",
    urgency: "Normal",
    time: "1 day ago",
  },
  {
    img: "https://www.figma.com/api/mcp/asset/8616f471-1407-447c-a450-dc0ef5d4fd64",
    title: "Electricity Committee Update: New Solar Initiative Announced",
    excerpt: "The estate's electricity committee has approved a new solar panel programme. Subsidised installations will be available to all residents starting next quarter.",
    body: [
      "At its latest meeting, the estate's electricity committee voted unanimously to approve a new solar energy initiative aimed at reducing dependence on the national grid and lowering communal running costs.",
      "Under the programme, residents will be able to access subsidised rooftop solar panel installations at significantly reduced rates. The committee has partnered with two certified vendors to ensure competitive pricing and quality assurance across all units.",
      "Priority access will be given to residents in blocks with the highest energy consumption. Applications will open at the end of this month, and slots are limited — residents are encouraged to register their interest early via the estate office.",
      "The committee also confirmed that proceeds from communal solar generation will be reinvested into the estate's generator maintenance fund, which is expected to reduce monthly levies over time.",
      "Further details, including a breakdown of costs and installation timelines, will be shared at the next residents' association meeting. We look forward to your participation and continued engagement on this important initiative.",
    ],
    isNew: false,
    categoryColor: "purple",
    label: "Announcements",
    urgency: "Normal",
    time: "2 days ago",
  },
  {
    img: "https://www.figma.com/api/mcp/asset/bf231e2a-9de2-43b1-9486-f57c7d6168d2",
    title: "Power Supply Enhancement: Upcoming Maintenance Schedule",
    excerpt: "Maintenance work on the estate's power distribution units is scheduled for this weekend. Expect brief outages between 8am–12pm on Saturday.",
    body: [
      "As part of our ongoing commitment to reliable power delivery, the estate's facilities team has scheduled routine maintenance work on the main power distribution units this weekend.",
      "Work will take place on Saturday between 8:00am and 12:00pm. During this window, power to all blocks will be temporarily suspended to allow engineers safe access to the distribution board and feeder panels.",
      "Residents are advised to charge essential devices — including phones, laptops, and medical equipment — before the maintenance window begins. The generator will not be available during this period.",
      "Our engineering team expects to complete all work within the four-hour window. However, if additional time is required due to unforeseen complications, we will provide an update via the estate notice board and WhatsApp group by 10:00am on Saturday.",
      "We apologise for any inconvenience and appreciate your understanding as we work to keep our power infrastructure in peak condition. Please contact the estate office if you have specific concerns ahead of the scheduled work.",
    ],
    isNew: false,
    categoryColor: "pink",
    label: "Alerts",
    urgency: "Urgent",
    time: "3 days ago",
  },
  {
    img: "https://www.figma.com/api/mcp/asset/eb7bf5f7-dbb3-424e-83e7-4e326829bb9f",
    title: "Community Alert: Voltage Stabilization Project Underway",
    excerpt: "Engineers are actively addressing voltage irregularities reported across several units. Stabilizers are being fitted at the main junction box — work is expected to last 3–5 days.",
    body: [
      "Following reports of flickering lights and voltage fluctuations in several units across Blocks A, B, and C, the estate has engaged a licensed electrical engineering firm to carry out a full voltage stabilisation project.",
      "The root cause has been identified as an overloaded junction box at the main entry point, which is causing inconsistent voltage delivery during peak usage hours. Engineers began fitting industrial-grade stabilisers yesterday and expect the project to take 3–5 working days to complete.",
      "Residents experiencing appliance damage as a result of the voltage irregularities should document the damage and submit a report to the estate office. The management committee is reviewing the situation and will communicate next steps regarding any compensation process.",
      "During the stabilisation work, brief interruptions of 10–15 minutes may occur at unpredictable intervals as engineers switch and test components. These disruptions will be kept to a minimum.",
      "We take the safety of residents and their appliances seriously. Thank you for your patience as we resolve this matter urgently.",
    ],
    isNew: false,
    categoryColor: "pink",
    label: "Alerts",
    urgency: "Urgent",
    time: "4 days ago",
  },
  {
    img: "https://www.figma.com/api/mcp/asset/f81365f9-9dde-4131-b208-b11c008a2422",
    title: "Important Notice: Temporary Power Outage for Critical Upgrades",
    excerpt: "A planned outage is scheduled for next Thursday, 10am–4pm, to complete critical infrastructure upgrades. Residents are advised to charge devices and plan accordingly.",
    body: [
      "The estate management hereby gives notice of a planned power outage on Thursday, 3rd July 2026, from 10:00am to 4:00pm. This outage is necessary to carry out critical upgrades to the estate's primary feeder cable and transformer unit.",
      "The upgrades are essential for supporting the estate's growing power demands and will significantly reduce the frequency of unplanned outages going forward. The work has been approved by the electricity committee and scheduled during midday hours to minimise disruption.",
      "During the outage, neither PHCN supply nor the estate generator will be available. Residents are strongly advised to charge all essential devices before 10:00am and make alternative arrangements for any time-sensitive work.",
      "The estate's emergency contact line will remain active throughout the outage. If power is not restored by 4:30pm, residents will be notified immediately via the estate WhatsApp group with an updated timeline.",
      "We appreciate your cooperation and understanding. This is a one-time disruption that will deliver long-term improvements to the quality and consistency of power supply across the entire estate.",
    ],
    isNew: false,
    categoryColor: "pink",
    label: "Alerts",
    urgency: "Urgent",
    time: "5 days ago",
  },
  {
    img: "https://www.figma.com/api/mcp/asset/eee3e3c0-3bc4-4f0c-bbc6-68312756010c",
    title: "Announcement: New Energy Efficiency Programs Now Available",
    excerpt: "Residents can now sign up for free energy audits, subsidised LED lighting, and smart plug kits — all part of the estate's new efficiency drive to cut communal power costs.",
    body: [
      "The estate is pleased to announce the launch of three new energy efficiency programmes available to all residents, effective immediately. These initiatives are part of a broader strategy to reduce communal power consumption and lower monthly levy contributions over time.",
      "The first programme offers free in-unit energy audits conducted by certified assessors. Auditors will review your appliance usage, identify energy-wasting habits, and provide a personalised report with recommendations. Bookings can be made through the estate office.",
      "The second programme provides subsidised LED lighting kits for all bedrooms and common areas within your unit. Switching to LED lighting can reduce lighting-related electricity consumption by up to 75%. Kits are available for collection at the facilities office from Monday.",
      "The third programme offers smart plug kits at a reduced cost, allowing residents to monitor and schedule the power usage of individual appliances from their smartphones. This is particularly useful for managing high-consumption devices such as air conditioners and water heaters.",
      "All programmes are available on a first-come, first-served basis. We encourage every resident to take advantage of these opportunities to reduce both their energy footprint and monthly bills. Contact the estate office for more information.",
    ],
    isNew: false,
    categoryColor: "purple",
    label: "Announcements",
    urgency: "Normal",
    time: "1 week ago",
  },
  {
    img: "https://www.figma.com/api/mcp/asset/f81365f9-9dde-4131-b208-b11c008a2422",
    title: "Update: Smart Meter Installation Begins Next Week",
    excerpt: "The estate-wide smart meter rollout begins Monday. Technicians will visit units floor-by-floor — expect a 20–30 minute appointment per apartment. Check your notice board for your slot.",
    body: [
      "The estate is rolling out smart electricity meters across all residential units beginning Monday, 7th July 2026. This is part of a broader infrastructure upgrade that will enable more accurate billing, real-time usage monitoring, and faster fault detection.",
      "Technicians from the approved installation partner will visit units floor-by-floor over a two-week period. Each installation is expected to take approximately 20–30 minutes. Your allocated appointment slot has been posted on your block's notice board.",
      "During the installation, power to your unit will be briefly disconnected for no more than 10 minutes. Please ensure that someone is present at your unit during your assigned time slot. If you are unable to make your appointment, contact the estate office at least 24 hours in advance to reschedule.",
      "Once installed, residents will be able to view their real-time energy consumption through the Noku app. Usage data will be updated every 30 minutes, giving you detailed insights into your electricity patterns and helping you identify opportunities to save.",
      "Smart meters will also allow the estate to identify and respond to power faults more quickly, reducing the time between a fault occurring and an engineer being dispatched. We believe this upgrade will meaningfully improve the day-to-day power experience for every resident.",
    ],
    isNew: false,
    categoryColor: "orange",
    label: "Notices",
    urgency: "Normal",
    time: "1 week ago",
  },
];

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9.167" cy="9.167" r="6.667"/>
      <path d="m17.5 17.5-3.621-3.621"/>
    </svg>
  );
}

const categoryStyles: Record<string, { bg: string; border: string; text: string }> = {
  purple: { bg: "#f9f5ff", border: "#e9d7fe", text: "#6941c6" },
  pink: { bg: "#fdf2f8", border: "#fbcfe8", text: "#be185d" },
  orange: { bg: "#fff7ed", border: "#fed7aa", text: "#c2410c" },
};

type UpdatesScreenProps = {
  onNavigate: (tab: NavTab) => void;
  onSelectCard: (update: UpdateItem) => void;
};

export default function UpdatesScreen({ onNavigate, onSelectCard }: UpdatesScreenProps) {
  return (
    <div className="bg-noku-bg min-h-screen pb-28 relative">
      {/* Header */}
      <div className="px-6 pt-6 flex items-center justify-between">
        <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
          Announcements &amp; Updates
        </p>
        <button className="p-1.5 text-noku-text-dim">
          <SearchIcon />
        </button>
      </div>

      {/* News cards */}
      <div className="px-6 mt-6 flex flex-col gap-2">
        {newsCards.map((card, i) => {
          const catStyle = categoryStyles[card.categoryColor];
          const isFirstCard = i === 0;
          return (
            <button
              key={i}
              onClick={() => onSelectCard(card)}
              className="rounded-xl overflow-hidden flex border w-full text-left"
              style={{
                borderColor: isFirstCard ? "#4bdd7e" : "#e8e8e3",
                backgroundColor: isFirstCard ? "#f0fdf4" : "white",
              }}
            >
              {/* Thumbnail */}
              <div className="w-[120px] shrink-0 self-stretch relative">
                <img
                  src={card.img}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              {/* Content */}
              <div className="flex-1 p-3 flex flex-col gap-2 min-w-0">
                <div className="flex gap-2 items-start">
                  <p
                    className="flex-1 text-sm font-medium text-noku-text-mid leading-5 overflow-hidden"
                    style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                  >
                    {card.title}
                  </p>
                  {card.isNew && (
                    <span className="text-[10px] font-semibold text-noku-green shrink-0">NEW*</span>
                  )}
                </div>
                <p
                  className="text-xs text-noku-text-mid leading-[18px] overflow-hidden"
                  style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                >
                  {card.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 items-center">
                    <span
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full border"
                      style={{ backgroundColor: catStyle.bg, borderColor: catStyle.border, color: catStyle.text }}
                    >
                      {card.label}
                    </span>
                    <span
                      className="text-[10px] font-medium px-1.5 py-0.5 rounded-md border border-noku-border-primary bg-white flex items-center gap-1"
                      style={{ color: card.urgency === "Urgent" ? "#ca8a04" : "#404040" }}
                    >
                      <span
                        className="w-2 h-2 rounded-full inline-block shrink-0"
                        style={{ backgroundColor: card.urgency === "Urgent" ? "#ca8a04" : "#d4d4d4" }}
                      />
                      {card.urgency}
                    </span>
                  </div>
                  <p className="text-[10px] text-black">{card.time}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <BottomNav activeTab="updates" onNavigate={onNavigate} />
    </div>
  );
}
