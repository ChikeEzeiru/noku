"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NokuLogo() {
  return (
    <Image src="/Images/Noku Full logo.svg" alt="Noku" width={69} height={20} />
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke={active ? "#5B5B4B" : "#ABAB9C"}
      strokeWidth={active ? "1.6" : "1.39"}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.66667 14.1663H13.3333M9.18141 2.30297L3.52949 6.6989C3.15168 6.99276 2.96278 7.13968 2.82669 7.32368C2.70614 7.48667 2.61633 7.67029 2.56169 7.86551C2.5 8.0859 2.5 8.32521 2.5 8.80384V14.833C2.5 15.7664 2.5 16.2331 2.68166 16.5896C2.84144 16.9032 3.09641 17.1582 3.41002 17.318C3.76654 17.4996 4.23325 17.4996 5.16667 17.4996H14.8333C15.7668 17.4996 16.2335 17.4996 16.59 17.318C16.9036 17.1582 17.1586 16.9032 17.3183 16.5896C17.5 16.2331 17.5 15.7664 17.5 14.833V8.80384C17.5 8.32521 17.5 8.0859 17.4383 7.86551C17.3837 7.67029 17.2939 7.48667 17.1733 7.32368C17.0372 7.13968 16.8483 6.99276 16.4705 6.69891L10.8186 2.30297C10.5258 2.07526 10.3794 1.9614 10.2178 1.91763C10.0752 1.87902 9.92484 1.87902 9.78221 1.91763C9.62057 1.9614 9.47418 2.07526 9.18141 2.30297Z" />
    </svg>
  );
}

function CreditCardIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke={active ? "#5B5B4B" : "#ABAB9C"}
      strokeWidth={active ? "1.6" : "1.39"}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18.3333 8.33366H1.66667M9.16667 11.667H5.00001M1.66667 6.83366L1.66667 13.167C1.66667 14.1004 1.66667 14.5671 1.84833 14.9236C2.00812 15.2372 2.26308 15.4922 2.57669 15.652C2.93321 15.8337 3.39992 15.8337 4.33334 15.8337L15.6667 15.8337C16.6001 15.8337 17.0668 15.8337 17.4233 15.652C17.7369 15.4922 17.9919 15.2372 18.1517 14.9236C18.3333 14.5671 18.3333 14.1004 18.3333 13.167V6.83366C18.3333 5.90024 18.3333 5.43353 18.1517 5.07701C17.9919 4.76341 17.7369 4.50844 17.4233 4.34865C17.0668 4.16699 16.6001 4.16699 15.6667 4.16699L4.33334 4.16699C3.39992 4.16699 2.93321 4.16699 2.57669 4.34865C2.26308 4.50844 2.00812 4.7634 1.84833 5.07701C1.66667 5.43353 1.66667 5.90024 1.66667 6.83366Z" />
    </svg>
  );
}

function FuelIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke={active ? "#5B5B4B" : "#ABAB9C"}
      strokeWidth={active ? "1.6" : "1.39"}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.3958 8.39583L15.407 8.08611C15.4487 6.92977 15.4695 6.3516 15.2575 5.90808C15.071 5.51815 14.7633 5.19911 14.3803 4.99874C13.9447 4.77083 13.3662 4.77083 12.2091 4.77083H9.77083L9.67781 4.81011C9.39406 4.92991 9.25219 4.98982 9.10619 5.03462C8.9186 5.0922 8.72581 5.13123 8.5306 5.15116C8.37868 5.16667 8.22467 5.16667 7.91667 5.16667H7M15.3958 8.39583C15.9802 8.77244 16.3333 9.42008 16.3333 10.1153V13.5C16.3333 14.9001 16.3333 15.6002 16.0608 16.135C15.8212 16.6054 15.4387 16.9878 14.9683 17.2275C14.4335 17.5 13.7335 17.5 12.3333 17.5H7C5.59987 17.5 4.8998 17.5 4.36502 17.2275C3.89462 16.9878 3.51217 16.6054 3.27248 16.135C3 15.6002 3 14.9001 3 13.5V8.16667C3 6.76653 3 7.06647 3.27248 6.53169C3.33802 6.40306 3.41423 6.28101 3.5 6.16666C3.72789 5.86281 4.02324 5.61329 4.36502 5.43915C4.52929 5.35545 4.70915 5.29746 4.92011 5.25729C5.11299 5.22055 5.33186 5.19871 5.58857 5.18572C5.80591 5.17472 6.05037 5.17007 6.32914 5.16811C6.5334 5.16667 6.75608 5.16667 7 5.16667M7 5.16667V3L3.5 3V6.16666M15.3958 8.39583L14.4583 7.79167L13.5208 7.1875L12.5833 6.58333L11.6458 5.97917L10.7083 5.375L9.77083 4.77083" />
    </svg>
  );
}

function UsersIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke={active ? "#5B5B4B" : "#ABAB9C"}
      strokeWidth={active ? "1.6" : "1.39"}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13.3333 2.8898C14.5681 3.50343 15.4167 4.77762 15.4167 6.25C15.4167 7.72238 14.5681 8.99657 13.3333 9.6102M15 13.972C16.2596 14.5419 17.3938 15.4708 18.3333 16.6667M1.66667 16.6667C3.28875 14.6021 5.49099 13.3333 7.91667 13.3333C10.3424 13.3333 12.5446 14.6021 14.1667 16.6667M11.6667 6.25C11.6667 8.32107 9.98774 10 7.91667 10C5.8456 10 4.16667 8.32107 4.16667 6.25C4.16667 4.17893 5.8456 2.5 7.91667 2.5C9.98774 2.5 11.6667 4.17893 11.6667 6.25Z" />
    </svg>
  );
}

function AnnouncementIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke={active ? "#5B5B4B" : "#ABAB9C"}
      strokeWidth={active ? "1.6" : "1.39"}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18.3333 6.66635V9.99968M8.54167 4.58302H5.66667C4.26654 4.58302 3.56647 4.58302 3.03169 4.8555C2.56129 5.09518 2.17884 5.47763 1.93915 5.94804C1.66667 6.48282 1.66667 7.18289 1.66667 8.58302L1.66667 9.58302C1.66667 10.3596 1.66667 10.7479 1.79354 11.0542C1.9627 11.4625 2.28715 11.787 2.69553 11.9561C3.00182 12.083 3.3901 12.083 4.16667 12.083V15.6247C4.16667 15.8182 4.16667 15.9149 4.1747 15.9964C4.25264 16.7877 4.87868 17.4137 5.66998 17.4917C5.75146 17.4997 5.8482 17.4997 6.04167 17.4997C6.23515 17.4997 6.33189 17.4997 6.41337 17.4917C7.20466 17.4137 7.83071 16.7877 7.90865 15.9964C7.91667 15.9149 7.91667 15.8182 7.91667 15.6247V12.083H8.54167C10.0137 12.083 11.8144 12.8721 13.2036 13.6294C14.014 14.0712 14.4192 14.2921 14.6846 14.2596C14.9308 14.2294 15.1168 14.1189 15.2611 13.9173C15.4167 13.6998 15.4167 13.2647 15.4167 12.3944V4.27159C15.4167 3.40135 15.4167 2.96622 15.2611 2.74876C15.1168 2.5471 14.9308 2.4366 14.6846 2.40646C14.4192 2.37395 14.014 2.59485 13.2036 3.03664C11.8144 3.79394 10.0137 4.58302 8.54167 4.58302Z" />
    </svg>
  );
}

function CommitteeIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke={active ? "#5B5B4B" : "#ABAB9C"}
      strokeWidth={active ? "1.6" : "1.39"}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10" cy="6.667" r="3.333" />
      <path d="M3.333 17.5c0-3.682 2.985-6.667 6.667-6.667s6.667 2.985 6.667 6.667" />
    </svg>
  );
}

function SettingsIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke={active ? "#5B5B4B" : "#ABAB9C"}
      strokeWidth={active ? "1.6" : "1.39"}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 12.5003C11.3807 12.5003 12.5 11.381 12.5 10.0003C12.5 8.61961 11.3807 7.50033 10 7.50033C8.61929 7.50033 7.5 8.61961 7.5 10.0003C7.5 11.381 8.61929 12.5003 10 12.5003Z" />
      <path d="M15.6061 12.2731C15.5052 12.5015 15.4751 12.755 15.5197 13.0008C15.5643 13.2465 15.6814 13.4733 15.8561 13.6518L15.9015 13.6973C16.0424 13.838 16.1541 14.0051 16.2304 14.1891C16.3066 14.373 16.3459 14.5702 16.3459 14.7693C16.3459 14.9684 16.3066 15.1655 16.2304 15.3495C16.1541 15.5334 16.0424 15.7005 15.9015 15.8412C15.7608 15.9821 15.5937 16.0939 15.4098 16.1701C15.2258 16.2464 15.0287 16.2856 14.8296 16.2856C14.6304 16.2856 14.4333 16.2464 14.2493 16.1701C14.0654 16.0939 13.8983 15.9821 13.7576 15.8412L13.7121 15.7958C13.5336 15.6211 13.3068 15.504 13.0611 15.4594C12.8153 15.4149 12.5618 15.4449 12.3333 15.5458C12.1093 15.6418 11.9182 15.8013 11.7836 16.0045C11.649 16.2078 11.5767 16.4459 11.5758 16.6897V16.8185C11.5758 17.2204 11.4161 17.6057 11.132 17.8899C10.8478 18.174 10.4625 18.3337 10.0606 18.3337C9.65877 18.3337 9.27338 18.174 8.98924 17.8899C8.70509 17.6057 8.54546 17.2204 8.54546 16.8185V16.7503C8.53959 16.4996 8.45843 16.2564 8.31251 16.0524C8.1666 15.8484 7.96268 15.693 7.72728 15.6064C7.49878 15.5055 7.24531 15.4755 6.99956 15.52C6.75381 15.5646 6.52703 15.6817 6.34849 15.8564L6.30304 15.9018C6.16232 16.0427 5.99521 16.1545 5.81128 16.2307C5.62734 16.307 5.43018 16.3462 5.23107 16.3462C5.03195 16.3462 4.83479 16.307 4.65085 16.2307C4.46692 16.1545 4.29981 16.0427 4.1591 15.9018C4.01822 15.7611 3.90647 15.594 3.83022 15.4101C3.75397 15.2261 3.71472 15.029 3.71472 14.8299C3.71472 14.6308 3.75397 14.4336 3.83022 14.2497C3.90647 14.0657 4.01822 13.8986 4.1591 13.7579L4.20455 13.7124C4.3792 13.5339 4.49636 13.3071 4.54092 13.0614C4.58548 12.8156 4.5554 12.5622 4.45455 12.3337C4.35852 12.1096 4.19906 11.9185 3.99581 11.7839C3.79256 11.6493 3.55439 11.5771 3.31061 11.5761H3.18182C2.77998 11.5761 2.3946 11.4165 2.11045 11.1323C1.8263 10.8482 1.66667 10.4628 1.66667 10.0609C1.66667 9.65909 1.8263 9.2737 2.11045 8.98956C2.3946 8.70541 2.77998 8.54578 3.18182 8.54578H3.25001C3.50076 8.53991 3.74395 8.45875 3.94796 8.31283C4.15197 8.16692 4.30737 7.963 4.39394 7.7276C4.49479 7.4991 4.52487 7.24563 4.48031 6.99988C4.43575 6.75413 4.31859 6.52735 4.14394 6.34881L4.09849 6.30336C3.95762 6.16264 3.84586 5.99554 3.76961 5.8116C3.69336 5.62766 3.65412 5.4305 3.65412 5.23139C3.65412 5.03227 3.69336 4.83511 3.76961 4.65117C3.84586 4.46724 3.95762 4.30013 4.09849 4.15942C4.23921 4.01854 4.40631 3.90679 4.59025 3.83054C4.77418 3.75429 4.97135 3.71504 5.17046 3.71504C5.36957 3.71504 5.56674 3.75429 5.75067 3.83054C5.93461 3.90679 6.10171 4.01854 6.24243 4.15942L6.28788 4.20487C6.46643 4.37952 6.6932 4.49668 6.93895 4.54124C7.18471 4.5858 7.43817 4.55572 7.66667 4.45487H7.72728C7.95135 4.35884 8.14244 4.19938 8.27705 3.99613C8.41165 3.79288 8.48388 3.55471 8.48485 3.31093V3.18214C8.48485 2.7803 8.64449 2.39492 8.92863 2.11077C9.21278 1.82662 9.59816 1.66699 10 1.66699C10.4018 1.66699 10.7872 1.82662 11.0714 2.11077C11.3555 2.39492 11.5152 2.7803 11.5152 3.18214V3.25033C11.5161 3.4941 11.5884 3.73228 11.723 3.93553C11.8576 4.13878 12.0487 4.29823 12.2727 4.39426C12.5012 4.49511 12.7547 4.52519 13.0005 4.48063C13.2462 4.43607 13.473 4.31891 13.6515 4.14426L13.697 4.09881C13.8377 3.95794 14.0048 3.84618 14.1887 3.76993C14.3727 3.69368 14.5698 3.65444 14.7689 3.65444C14.9681 3.65444 15.1652 3.69368 15.3492 3.76993C15.5331 3.84618 15.7002 3.95794 15.8409 4.09881C15.9818 4.23953 16.0935 4.40663 16.1698 4.59057C16.246 4.7745 16.2853 4.97167 16.2853 5.17078C16.2853 5.36989 16.246 5.56706 16.1698 5.75099C16.0935 5.93493 15.9818 6.10203 15.8409 6.24275L15.7955 6.2882C15.6208 6.46675 15.5037 6.69352 15.4591 6.93927C15.4145 7.18503 15.4446 7.4385 15.5455 7.66699V7.7276C15.6415 7.95167 15.8009 8.14276 16.0042 8.27737C16.2074 8.41197 16.4456 8.4842 16.6894 8.48517H16.8182C17.22 8.48517 17.6054 8.64481 17.8896 8.92895C18.1737 9.2131 18.3333 9.59848 18.3333 10.0003C18.3333 10.4022 18.1737 10.7876 17.8896 11.0717C17.6054 11.3558 17.22 11.5155 16.8182 11.5155H16.75C16.5062 11.5164 16.2681 11.5887 16.0648 11.7233C15.8616 11.8579 15.7021 12.049 15.6061 12.2731Z" />
    </svg>
  );
}

const generalNavItems = [
  { label: "Home", href: "/admin", icon: HomeIcon },
  { label: "Payments", href: "/admin/payments", icon: CreditCardIcon },
  { label: "Fuel & Budget", href: "/admin/fuel", icon: FuelIcon },
  { label: "Residents", href: "/admin/residents", icon: UsersIcon },
  {
    label: "Announcements",
    href: "/admin/announcements",
    icon: AnnouncementIcon,
  },
  { label: "Committee", href: "/admin/committee", icon: CommitteeIcon },
];

const settingsNavItems = [
  { label: "App Settings", href: "/admin/settings", icon: SettingsIcon },
];

function NavItems({
  items,
  getClass,
  isActive,
  onClick,
}: {
  items: typeof generalNavItems;
  getClass: (href: string) => string;
  isActive: (href: string) => boolean;
  onClick?: () => void;
}) {
  return (
    <>
      {items.map(({ label, href, icon: Icon }) => (
        <Link key={href} href={href} onClick={onClick} className={getClass(href)}>
          <span className="shrink-0">
            <Icon active={isActive(href)} />
          </span>
          {label}
        </Link>
      ))}
    </>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || (href !== "/admin" && pathname.startsWith(href));

  const navItemClasses = (href: string) =>
    `flex items-center gap-2.5 px-2 py-2 rounded-[6px] text-sm max-h-9 transition-colors ${
      isActive(href)
        ? "bg-[#fbfbf9] border border-noku-rule font-semibold text-noku-heading"
        : "font-medium text-[#404040] hover:bg-[#fbfbf9]"
    }`;

  const sectionLabel =
    "text-[10px] font-semibold text-[#7c7c67] uppercase tracking-wider px-5 pb-1";

  return (
    <div className="min-h-screen bg-noku-card flex">
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex flex-col w-69 min-h-screen fixed p-1 pl-1 pr-0">
        <div className="bg-noku-surface border border-noku-rule rounded-card flex flex-col justify-between flex-1 overflow-clip pb-8">
          <div className="flex flex-col gap-2">
            <div className="p-5 pb-4">
              <NokuLogo />
            </div>
            <div className="flex flex-col gap-2">
              <p className={sectionLabel}>GENERAL</p>
              <nav className="flex flex-col px-4">
                <NavItems items={generalNavItems} getClass={navItemClasses} isActive={isActive} />
              </nav>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className={sectionLabel}>SETTINGS</p>
            <nav className="flex flex-col px-4">
              <NavItems items={settingsNavItems} getClass={navItemClasses} isActive={isActive} />
            </nav>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-noku-surface border-b border-noku-rule z-50">
        <div className="flex items-center justify-between px-5 py-4">
          <NokuLogo />
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-noku-heading p-2"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M3 5h14M3 10h14M3 15h14" />
            </svg>
          </button>
        </div>
        {sidebarOpen && (
          <div className="px-4 pb-4 bg-noku-surface border-b border-noku-rule">
            <p className={`${sectionLabel} pt-2`}>GENERAL</p>
            <nav className="flex flex-col mt-1">
              <NavItems
                items={generalNavItems}
                getClass={navItemClasses}
                isActive={isActive}
                onClick={() => setSidebarOpen(false)}
              />
            </nav>
            <p className={`${sectionLabel} pt-4`}>SETTINGS</p>
            <nav className="flex flex-col mt-1">
              <NavItems
                items={settingsNavItems}
                getClass={navItemClasses}
                isActive={isActive}
                onClick={() => setSidebarOpen(false)}
              />
            </nav>
          </div>
        )}
      </div>

      {/* Main content */}
      <main className="flex-1 lg:ml-69 min-h-screen bg-noku-card lg:pt-1 lg:pl-1">
        <div className="bg-white min-h-screen lg:rounded-tl-[12px] lg:border lg:border-noku-rule mt-14 lg:mt-0 p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
