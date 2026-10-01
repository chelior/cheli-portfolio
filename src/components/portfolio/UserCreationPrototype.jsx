import React, { useState, useRef, useEffect } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import {
  ChevronDown,
  X,
  Info,
  Search,
  Home,
  ShoppingCart,
  Receipt,
  CreditCard,
  Wallet,
  FileText,
  Users,
  ScanSearch,
  FolderOpen,
  Plug2,
  BarChart3,
  Settings2,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Sparkles,
  Headphones,
  HelpCircle,
  FolderSync,
  User,
} from "lucide-react";
import tipaltiAiUrl from "@/assets/top-bar/tipalti-ai.svg";
import helpDeskUrl from "@/assets/top-bar/help-desk.svg";
import helpUrl from "@/assets/top-bar/help.svg";
import fileManagerUrl from "@/assets/top-bar/file-manager.svg";
import ddUserPlusUrl from "@/assets/dd-menu/user-round-plus.svg";
import ddTableUrl from "@/assets/dd-menu/table.svg";
import tableCheckboxUrl from "@/assets/table/checkbox.svg";
import tableSortUrl from "@/assets/table/sort.svg";
import chevronSmallDownUrl from "@/assets/top-bar/chevron-small-down.svg";
import avatarUrl from "@/assets/top-bar/avatar.svg";
import logoArrowUrl from "@/assets/nav/logo+arrow.svg";
import tipaltiLogoUrl from "@/assets/nav/tipalti-logo.svg";
import filterIconUrl from "@/assets/filter/filter.svg";
import checkedIconUrl from "@/assets/checkbox/checked.svg";
import notificationToasterUrl from "@/assets/notification/notification-toaster.svg";
import homeUrl from "@/assets/nav/home.svg";
import procurementUrl from "@/assets/nav/procurement.svg";
import billsUrl from "@/assets/nav/bills.svg";
import paymentsUrl from "@/assets/nav/payments.svg";
import cardsUrl from "@/assets/nav/cards.svg";
import expensesUrl from "@/assets/nav/expenses.svg";
import payeesUrl from "@/assets/nav/payees.svg";
import detectUrl from "@/assets/nav/detect.svg";
import documentsUrl from "@/assets/nav/documents.svg";
import integrationsUrl from "@/assets/nav/integrations.svg";
import administrationUrl from "@/assets/nav/administration.svg";

const ROLES_OPTIONS = [
  { id: "admin", title: "Admin", description: "Full access to all settings and user management" },
  { id: "bill_approver", title: "Bill approver", description: "Can approve or reject bill payment requests" },
  { id: "po_approver", title: "PO approver", description: "Can approve or reject purchase orders" },
  { id: "payer", title: "Payer", description: "Can initiate and submit payments" },
  { id: "viewer", title: "Viewer", description: "Read-only access to reports and transactions" },
  { id: "controller", title: "Controller", description: "Manages budgets and financial controls" },
  { id: "auditor", title: "Auditor", description: "Access to audit logs and compliance reports" },
];

const ENTITIES_OPTIONS = [
  { id: "us", title: "Acme Corp – US", description: "United States entity, USD operations" },
  { id: "eu", title: "Acme Corp – EU", description: "European entity, EUR operations" },
  { id: "uk", title: "Acme Corp – UK", description: "United Kingdom entity, GBP operations" },
  { id: "apac", title: "Acme Corp – APAC", description: "Asia-Pacific entity, multi-currency" },
  { id: "ca", title: "Acme Corp – Canada", description: "Canadian entity, CAD operations" },
];

const MANAGER_OPTIONS = ["Sarah Johnson", "Michael Chen", "Emily Rodriguez", "David Kim", "Laura Martinez", "James Wilson"];
const JOB_TITLE_OPTIONS = ["Senior Accountant", "Finance Manager", "Treasury Analyst", "Accounts Payable Specialist", "Controller", "CFO", "Financial Analyst"];
const DEPARTMENT_OPTIONS = ["Finance", "Accounting", "Treasury", "Operations", "Legal", "Human Resources", "Technology"];
const LOCATION_OPTIONS = ["New York, NY", "San Francisco, CA", "London, UK", "Austin, TX", "Chicago, IL", "Remote"];

const SEED_USERS = [
  { id: 1, name: "Olivia Jensen", email: "olivia.jensen@tipalti.com", role: "Bill approver. AP manager", entity: "Tipalti UK, Tipalti NY, Tipalti TX, Tipalti LA, Tipalti AU", status: "Active" },
  { id: 2, name: "Michael Smith", email: "michael.smith@tipalti.com", role: "Finance Director", entity: "Tipalti LA, Tipalti NY", status: "Active" },
  { id: 3, name: "Sarah Connor", email: "sarah.connor@tipalti.com", role: "Senior Accountant", entity: "Tipalti UK", status: "Limited access" },
  { id: 4, name: "James Brown", email: "james.brown@tipalti.com", role: "Compliance Officer", entity: "Tipalti UK", status: "Invite expired" },
  { id: 5, name: "Emily Davis", email: "emily.davis@tipalti.com", role: "Payroll Specialist", entity: "Tipalti UK", status: "Limited access" },
  { id: 6, name: "Daniel Wilson", email: "daniel.wilson@tipalti.com", role: "Treasury Analyst", entity: "Tipalti NY, Tipalti UK", status: "Active" },
  { id: 7, name: "Sophia Martinez", email: "sophia.martinez@tipalti.com", role: "Viewer", entity: "Tipalti AU, Tipalti LA", status: "Active" },
  { id: 8, name: "Alex Thompson", email: "alex.thompson@tipalti.com", role: "Admin", entity: "Tipalti NY", status: "Active" },
  { id: 9, name: "Rachel Green", email: "rachel.green@tipalti.com", role: "Bill approver", entity: "Tipalti TX, Tipalti UK", status: "Invite expired" },
  { id: 10, name: "Thomas Lee", email: "thomas.lee@tipalti.com", role: "Payer", entity: "Tipalti LA", status: "Limited access" },
  { id: 11, name: "Jennifer Adams", email: "jennifer.adams@tipalti.com", role: "Controller", entity: "Tipalti UK, Tipalti NY, Tipalti AU", status: "Active" },
  { id: 12, name: "Robert Chen", email: "robert.chen@tipalti.com", role: "Auditor", entity: "Tipalti NY, Tipalti TX", status: "Active" },
];

function borderColor(state) {
  if (state === "active") return "#21308D";
  if (state === "hover") return "#4D62D3";
  return "#BAC1C5";
}

function CheckboxSquare({ checked }) {
  return checked ? (
    <img src={checkedIconUrl} alt="" width={16} height={16} className="block shrink-0" style={{ width: 16, height: 16 }} />
  ) : (
    <span className="inline-flex w-4 h-4 rounded-[2px] border-[1.5px] border-[#808D95] bg-transparent" />
  );
}

function ModalInput({ placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const state = focused ? "active" : hovered ? "hover" : "default";
  return (
    <div
      className="bg-white w-full rounded-[4px] flex items-center transition-colors"
      style={{ minHeight: 32, boxShadow: `inset 0 0 0 ${state === "active" ? 2 : 1}px ${borderColor(state)}` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1 bg-transparent outline-none px-3 text-[14px] leading-[17px] placeholder:text-[#808D95] text-[#021D2D]"
        style={{ fontFamily: "Lato, system-ui, sans-serif" }}
      />
    </div>
  );
}

function MultiSelectDropdown({ placeholder, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const hasSelection = value.size > 0;
  const selectedOptions = options.filter((o) => value.has(o.id));
  const isActive = open;

  useEffect(() => {
    if (!open) return;
    const h = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const toggle = (id) => {
    const next = new Set(value);
    next.has(id) ? next.delete(id) : next.add(id);
    onChange(next);
  };
  const clear = (e) => { e.stopPropagation(); onChange(new Set()); };
  const removeChip = (id, e) => { e.stopPropagation(); const n = new Set(value); n.delete(id); onChange(n); };

  return (
    <div ref={ref} className="relative w-full">
      <div
        className="bg-white w-full rounded-[4px] flex items-center cursor-pointer select-none"
        style={{ minHeight: 32, boxShadow: `inset 0 0 0 ${isActive ? 2 : 1}px ${borderColor(isActive ? "active" : hovered ? "hover" : "default")}`, paddingRight: 8, paddingLeft: hasSelection ? 8 : 0, paddingTop: hasSelection ? 4 : 0, paddingBottom: hasSelection ? 4 : 0 }}
        onMouseEnter={() => !open && setHovered(true)}
        onMouseLeave={() => !open && setHovered(false)}
        onClick={() => setOpen((o) => !o)}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpen((o) => !o)}
      >
        {hasSelection ? (
          <div className="flex flex-wrap gap-1 flex-1 min-w-0">
            {selectedOptions.map((opt) => (
              <span key={opt.id} className="inline-flex items-center gap-1 px-2 rounded-[4px] text-[12px] leading-[1] bg-[#CFDFFF] text-[#021D2D]" style={{ height: 20, fontFamily: "Lato, system-ui, sans-serif" }}>
                {opt.title}
                <button onClick={(e) => removeChip(opt.id, e)} className="ml-1 hover:opacity-60"><X size={10} /></button>
              </span>
            ))}
          </div>
        ) : (
          <p className="flex-1 text-[14px] pl-3 text-[#808D95]" style={{ fontFamily: "Lato, system-ui, sans-serif" }}>{placeholder}</p>
        )}
        {hasSelection && <button onClick={clear} className="shrink-0 p-1 hover:opacity-60"><X size={14} className="text-[#021D2D]" /></button>}
        <span className={`shrink-0 ml-1 transition-transform ${open ? "rotate-180" : ""}`}><ChevronDown size={14} className="text-[#021D2D]" /></span>
      </div>
      {open && (
        <div className="absolute left-0 right-0 bg-white z-50 overflow-y-auto dropdown-scroll pr-2 rounded-[4px] border border-[#BAC1C5] border-l-0 shadow-[0_4px_12px_rgba(2,29,45,0.12)]" style={{ top: "calc(100% + 4px)", maxHeight: 240, paddingRight: 8 }}>
          {options.map((opt) => {
            const checked = value.has(opt.id);
            return (
              <div key={opt.id} className="flex items-start gap-2.5 px-3 py-2.5 cursor-pointer hover:bg-[#F8F9FD]" style={{ background: checked ? "#F4F5FB" : "white" }} onClick={() => toggle(opt.id)}>
                <span className="mt-0.5 shrink-0"><CheckboxSquare checked={checked} /></span>
                <div className="min-w-0">
                  <p className="text-[14px] leading-[17px] font-bold" style={{ fontFamily: "Lato, system-ui, sans-serif", color: "#021D2D" }}>{opt.title}</p>
                  <p className="text-[12px] leading-[15px]" style={{ fontFamily: "Lato, system-ui, sans-serif", color: checked ? "#21308D" : "#6D7275" }}>{opt.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SelectDropdown({ placeholder, options, value, onChange, dropUp }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const isActive = open;
  return (
    <div ref={ref} className="relative w-full">
      <div
        className="bg-white w-full rounded-[4px] flex items-center cursor-pointer select-none px-3"
        style={{ minHeight: 32, boxShadow: `inset 0 0 0 ${isActive ? 2 : 1}px ${borderColor(isActive ? "active" : hovered ? "hover" : "default")}` }}
        onMouseEnter={() => !open && setHovered(true)}
        onMouseLeave={() => !open && setHovered(false)}
        onClick={() => setOpen((o) => !o)}
        tabIndex={0}
      >
        <p className="flex-1 text-[14px] truncate" style={{ fontFamily: "Lato, system-ui, sans-serif", color: value ? "#021D2D" : "#808D95" }}>{value ?? placeholder}</p>
        <ChevronDown size={14} className={`shrink-0 text-[#021D2D] transition-transform ${open ? "rotate-180" : ""}`} />
      </div>
      {open && (
        <div className="absolute left-0 right-0 bg-white rounded-[4px] z-50 overflow-hidden border border-[#D6D6D6] shadow-[0_4px_12px_rgba(2,29,45,0.10)]" style={dropUp ? { bottom: "calc(100% + 4px)" } : { top: "calc(100% + 4px)" }}>
          <div className="overflow-y-auto dropdown-scroll pr-2" style={{ maxHeight: 160, paddingRight: 8 }}>
            {options.map((opt) => (
              <div key={opt} className="px-3 py-2 cursor-pointer text-[14px] hover:bg-[#F5F6FA]" style={{ background: value === opt ? "#EEF1FD" : "white", fontWeight: value === opt ? 600 : 400, color: value === opt ? "#21308D" : "#021D2D", fontFamily: "Lato, system-ui, sans-serif" }} onClick={() => { onChange(opt); setOpen(false); }}>{opt}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoTooltip() {
  const [v, setV] = useState(false);
  return (
    <div className="relative flex items-center">
      <button className="w-4 h-4 flex items-center justify-center text-[#231D27] hover:opacity-70" onMouseEnter={() => setV(true)} onMouseLeave={() => setV(false)} aria-label="Info">
        <Info size={13} />
      </button>
      {v && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 z-50 pointer-events-none">
          <div className="relative rounded-[6px] px-3 py-2.5 text-white text-[12px] leading-[16px] w-[272px] bg-[#021D2D] shadow-[0_4px_16px_rgba(2,29,45,0.22)]" style={{ fontFamily: "Lato, system-ui, sans-serif" }}>
            Users you invite get an email with a link to access Tipalti Hub and set up their login credentials.
            <span className="absolute left-1/2 top-full -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#021D2D]" />
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    Active: { bg: "#E2F8F0", color: "#009C63" },
    "Limited access": { bg: "#EFEFEF", color: "#7A7A7A" },
    "Invite expired": { bg: "#FFEBEF", color: "#FD2D46" },
    Invited: { bg: "#E8EDFF", color: "#6780FF" },
  };
  const c = map[status] || map.Invited;
  return (
    <span className="inline-flex items-center justify-center px-3 rounded-full text-[10px] font-bold whitespace-nowrap" style={{ background: c.bg, color: c.color, height: 24, fontFamily: "Lato, system-ui, sans-serif" }}>
      {status}
    </span>
  );
}

function AddNewUserModal({ onClose, onAdd }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState(new Set());
  const [entities, setEntities] = useState(new Set());
  const [manager, setManager] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  const [dept, setDept] = useState(null);
  const [location, setLocation] = useState(null);
  const [sendInvite, setSendInvite] = useState(false);

  const showOrg = Array.from(roles).some((id) => {
    const r = ROLES_OPTIONS.find((x) => x.id === id);
    return r?.title.toLowerCase().includes("approv");
  });

  const handleAdd = () => {
    const roleNames = ROLES_OPTIONS.filter((r) => roles.has(r.id)).map((r) => r.title).join(", ") || "—";
    onAdd({ firstName: firstName.trim() || "New", lastName: lastName.trim() || "User", email: email.trim() || "—", role: roleNames });
    onClose();
  };

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-4 overflow-visible" style={{ background: "rgba(2,29,45,0.15)" }} onClick={onClose}>
      <style>{`.modal-scroll::-webkit-scrollbar{border-left:none !important} .modal-scroll::-webkit-scrollbar-track{border-left:none !important; background:transparent !important} .modal-scroll::-webkit-scrollbar-thumb{border-left:none !important}`}</style>
      <div className="flex flex-col rounded-[8px] bg-white shadow-[0_0_8px_rgba(2,29,45,0.15)] w-full max-w-[560px] max-h-[90%] overflow-visible border-l-0" style={{ borderLeft: "none", overflow: "visible" }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-3 border-b border-[#E4E4E4] shrink-0">
          <p className="font-bold text-[14px] text-[#021D2D] ml-0" style={{ fontFamily: "Lato, system-ui, sans-serif", marginLeft: 0, paddingLeft: 0 }}>Add new user</p>
          <button onClick={onClose} className="w-5 h-5 flex items-center justify-center hover:opacity-60 ml-auto mr-0 shrink-0" style={{ marginLeft: "auto", marginRight: 0 }}><X size={12} className="text-[#1F1F1F]" /></button>
        </div>
        <div className="flex-1 overflow-visible p-6 space-y-4 modal-scroll border-l-0" style={{ scrollbarWidth: "thin", scrollbarColor: "#BAC1C5 transparent", borderLeft: "none", overflow: "visible" }}>
          <div className="space-y-4">
            <p className="font-bold text-[16px] text-[#021D2D]" style={{ fontFamily: "Lato, system-ui, sans-serif" }}>Profile</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="pb-2 font-bold text-[12px] text-[#021D2D]" style={{ fontFamily: "Lato, system-ui, sans-serif" }}>First name</p>
                <ModalInput placeholder="Enter first name" value={firstName} onChange={setFirstName} />
              </div>
              <div>
                <p className="pb-2 font-bold text-[12px] text-[#021D2D]" style={{ fontFamily: "Lato, system-ui, sans-serif" }}>Last name</p>
                <ModalInput placeholder="Enter last name" value={lastName} onChange={setLastName} />
              </div>
              <div>
                <p className="pb-2 font-bold text-[12px] text-[#021D2D]" style={{ fontFamily: "Lato, system-ui, sans-serif" }}>Email</p>
                <ModalInput placeholder="Enter email" value={email} onChange={setEmail} />
              </div>
            </div>
            <div className="border-t border-[#D6D6D6] pt-4 space-y-4">
              <p className="font-bold text-[16px] text-[#021D2D]" style={{ fontFamily: "Lato, system-ui, sans-serif" }}>Roles & entities</p>
              <div>
                <p className="pb-2 font-bold text-[12px] text-[#021D2D]" style={{ fontFamily: "Lato, system-ui, sans-serif" }}>Assign one or more roles</p>
                <MultiSelectDropdown placeholder="Search and select roles" options={ROLES_OPTIONS} value={roles} onChange={setRoles} />
              </div>
              <div>
                <p className="pb-2 font-bold text-[12px] text-[#021D2D]" style={{ fontFamily: "Lato, system-ui, sans-serif" }}>Add entities to access Bills and Treasury</p>
                <MultiSelectDropdown placeholder="Search and select entities" options={ENTITIES_OPTIONS} value={entities} onChange={setEntities} />
              </div>
            </div>
            {showOrg && (
              <div className="border-t border-[#D6D6D6] pt-4 space-y-4">
                <div className="flex items-baseline gap-2">
                  <p className="font-bold text-[16px] text-[#021D2D]" style={{ fontFamily: "Lato, system-ui, sans-serif" }}>Organization</p>
                  <p className="text-[12px] text-[#808D95]" style={{ fontFamily: "Lato, system-ui, sans-serif" }}>Only for approver roles</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="pb-2 font-bold text-[12px] text-[#021D2D]" style={{ fontFamily: "Lato, system-ui, sans-serif" }}>Direct Manager</p>
                    <SelectDropdown placeholder="Select manager" options={MANAGER_OPTIONS} value={manager} onChange={setManager} />
                  </div>
                  <div>
                    <p className="pb-2 font-bold text-[12px] text-[#021D2D]" style={{ fontFamily: "Lato, system-ui, sans-serif" }}>Job title</p>
                    <SelectDropdown placeholder="Select Job title" options={JOB_TITLE_OPTIONS} value={jobTitle} onChange={setJobTitle} />
                  </div>
                  <div>
                    <p className="pb-2 font-bold text-[12px] text-[#021D2D]" style={{ fontFamily: "Lato, system-ui, sans-serif" }}>Department</p>
                    <SelectDropdown placeholder="Select department" options={DEPARTMENT_OPTIONS} value={dept} onChange={setDept} dropUp />
                  </div>
                  <div>
                    <p className="pb-2 font-bold text-[12px] text-[#021D2D]" style={{ fontFamily: "Lato, system-ui, sans-serif" }}>Location</p>
                    <SelectDropdown placeholder="Select location" options={LOCATION_OPTIONS} value={location} onChange={setLocation} dropUp />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="shrink-0 h-[72px] flex items-center justify-between px-6 bg-white shadow-[0_-2px_16px_rgba(2,29,45,0.10)] flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <button onClick={() => setSendInvite((v) => !v)} className="shrink-0"><CheckboxSquare checked={sendInvite} /></button>
            <p className="text-[13px] text-[#021D2D] cursor-pointer select-none" style={{ fontFamily: "Lato, system-ui, sans-serif" }} onClick={() => setSendInvite((v) => !v)}>Send email invitation to access Tipalti Hub</p>
            <InfoTooltip />
          </div>
          <div className="flex gap-3 items-center">
            <button onClick={onClose} className="h-8 px-4 rounded-[4px] border border-[#021D2D] text-[14px] text-[#021D2D] hover:bg-gray-50 inline-flex items-center justify-center leading-none" style={{ fontFamily: "Lato, system-ui, sans-serif", lineHeight: "1" }}>Cancel</button>
            <button onClick={handleAdd} className="h-8 px-4 rounded-[4px] bg-[#FFBC00] hover:bg-[#F0B000] active:bg-[#E08E00] text-[14px] text-[#021D2D] inline-flex items-center justify-center leading-none" style={{ fontFamily: "Lato, system-ui, sans-serif", lineHeight: "1" }}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnterpriseSidebar({ collapsed, onToggle }) {
  // Refined per request: compact enterprise — no bold, no scrollbar, 13px 400, gap 2.5, h-6 logo, 16px icons stroke 1.25-1.5, active pill #DCE7FA rounded-md
  if (collapsed) {
    return (
      <aside className="bg-[#1C2547] flex flex-col shrink-0 overflow-hidden" style={{ width: 56, transition: "width 200ms ease", height: "100%" }}>
        <div className="flex items-center justify-center shrink-0" style={{ height: 56, padding: 12, background: "#1C2547" }}>
          <button onClick={onToggle} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center">
            <ChevronsRight size={13} className="text-[#D7D6E5]" />
          </button>
        </div>
        <div className="flex flex-col items-center gap-1 pt-1 overflow-hidden" style={{ padding: "0 8px", background: "#1C2547" }}>
          {[
            homeUrl, procurementUrl, billsUrl, paymentsUrl, cardsUrl, expensesUrl, payeesUrl, detectUrl, documentsUrl, integrationsUrl, administrationUrl,
          ].map((u, i) => (
            <div key={i} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 cursor-pointer shrink-0">
              <img src={u} alt="" width={16} height={16} className="block opacity-90" style={{ width: 16, height: 16 }} />
            </div>
          ))}
        </div>
      </aside>
    );
  }

  const Row = ({ iconUrl, label, chevronVisible }) => (
    <div className="flex flex-row items-center shrink-0 rounded hover:bg-white/[0.06] cursor-pointer self-stretch w-full justify-between" style={{ height: 30, padding: "6px 0", gap: 8, flex: "none" }}>
      <div className="flex flex-row items-center gap-2.5 shrink-0 flex-1 min-w-0">
        <span className="shrink-0 flex items-center justify-center" style={{ width: 16, height: 16, flex: "none" }}>
          <img src={iconUrl} alt="" width={16} height={16} className="block" style={{ width: 16, height: 16, opacity: 0.9 }} />
        </span>
        <span className="truncate font-light" style={{ fontFamily: "Lato, system-ui, sans-serif", fontWeight: 300, fontSize: 12.5, lineHeight: "15px", color: "rgba(215,214,229,0.75)", display: "flex", alignItems: "center", flex: "1 1 0" }}>{label}</span>
      </div>
      <span className="shrink-0 flex items-center justify-center ml-auto mr-0" style={{ width: 16, height: 16, flex: "none", marginLeft: "auto", marginRight: 0, visibility: chevronVisible ? "visible" : "hidden" }}>
        {chevronVisible && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3.5L10 8L6 12.5" stroke="#D7D6E5" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" /></svg>
        )}
      </span>
    </div>
  );

  return (
    <aside className="flex flex-col shrink-0 overflow-hidden min-h-full" style={{ width: 224, maxWidth: 224, height: "100%", minHeight: "100%", padding: 0, isolation: "isolate", background: "#1C2547", flex: "none" }}>
      {/* header — single horizontal flex row w-full px-4 justify-between items-center, Tipalti logo h-7 (28px) w-auto, collapse « w-4 h-4 compact far right */}
      <div className="flex flex-row justify-between items-center shrink-0 self-stretch w-full" style={{ width: 224, background: "#1C2547", padding: "16px 16px 16px 16px", gap: 8, flex: "none", zIndex: 0, marginBottom: 16 }}>
        <img src={tipaltiLogoUrl} alt="Tipalti" className="block object-contain shrink-0" style={{ height: 34, width: "auto", flex: "none" }} />
        <button onClick={onToggle} className="shrink-0 flex items-center justify-center rounded-full hover:bg-white/10 ml-auto" style={{ width: 16, height: 16, flex: "none", marginLeft: "auto" }} aria-label="Collapse">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M9.47 3.22a.75.75 0 0 1 0 1.06L6.06 7.69l3.41 3.41a.75.75 0 1 1-1.06 1.06L4.44 8.19a.75.75 0 0 1 0-1.06l3.97-3.97a.75.75 0 0 1 1.06 0ZM13.47 3.22a.75.75 0 0 1 0 1.06L10.06 7.69l3.41 3.41a.75.75 0 1 1-1.06 1.06L8.44 8.19a.75.75 0 0 1 0-1.06l3.97-3.97a.75.75 0 0 1 1.06 0Z" fill="#D7D6E5"/></svg>
        </button>
      </div>
      {/* tabs — icons start at middle of first "t" in Tipalti logo, logo stays at px-4 */}
      <div className="flex flex-col items-start shrink-0 self-stretch overflow-hidden flex-1 min-h-0" style={{ width: 224, background: "#1C2547", padding: "0 16px 16px 20px", gap: 10, zIndex: 1 }}>
        <Row iconUrl={homeUrl} label="Home" chevronVisible={false} />
        <div className="flex flex-col items-start self-stretch shrink-0" style={{ width: 188, flex: "none" }}>
          <Row iconUrl={procurementUrl} label="Procurement" chevronVisible={true} />
        </div>
        <Row iconUrl={billsUrl} label="Bills" chevronVisible={false} />
        <div className="flex flex-col items-start self-stretch shrink-0" style={{ width: 188, flex: "none" }}>
          <Row iconUrl={paymentsUrl} label="Payments" chevronVisible={true} />
        </div>
        <Row iconUrl={cardsUrl} label="Cards" chevronVisible={false} />
        <Row iconUrl={expensesUrl} label="Expenses" chevronVisible={false} />
        <div className="flex flex-col items-start self-stretch shrink-0" style={{ width: 188, flex: "none" }}>
          <Row iconUrl={payeesUrl} label="Payees" chevronVisible={true} />
        </div>
        <Row iconUrl={detectUrl} label="Detect" chevronVisible={false} />
        <Row iconUrl={documentsUrl} label="Documents" chevronVisible={false} />
        <div className="flex flex-col items-start self-stretch shrink-0" style={{ width: 188, flex: "none" }}>
          <Row iconUrl={integrationsUrl} label="Integration" chevronVisible={true} />
        </div>
        <Row iconUrl={expensesUrl} label="Reports" chevronVisible={false} />
        {/* Administration compact — gap 2.5, active pill #DCE7FA rounded-md h-6, chevron aligned to same px-4 column */}
        <div className="flex flex-col items-start self-stretch shrink-0 gap-1 w-full" style={{ flex: "none" }}>
          <div className="flex flex-row items-center shrink-0 rounded hover:bg-white/[0.06] cursor-pointer self-stretch w-full justify-between" style={{ height: 30, padding: "6px 0", gap: 8, flex: "none" }}>
            <div className="flex flex-row items-center gap-2.5 shrink-0 flex-1 min-w-0">
              <span className="shrink-0 flex items-center justify-center" style={{ width: 16, height: 16, flex: "none" }}><img src={administrationUrl} alt="" width={16} height={16} className="block opacity-90" style={{ width: 16, height: 16 }} /></span>
              <span className="truncate font-light" style={{ fontFamily: "Lato, system-ui, sans-serif", fontWeight: 300, fontSize: 12.5, lineHeight: "15px", color: "rgba(215,214,229,0.75)", display: "flex", alignItems: "center", flex: "1 1 0" }}>Administration</span>
            </div>
            <span className="shrink-0 flex items-center justify-center ml-auto mr-0" style={{ width: 16, height: 16, flex: "none", marginLeft: "auto", marginRight: 0 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3.5L10 8L6 12.5" stroke="#D7D6E5" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </div>
          <div className="flex flex-col items-start self-stretch shrink-0 overflow-hidden gap-0.5 w-full" style={{ background: "#1C2547", borderRadius: 5, flex: "none", paddingLeft: 24 }}>
            {[
              { label: "General", active: false },
              { label: "Team management", active: true },
              { label: "Communication", active: false },
              { label: "Payments settings", active: false },
              { label: "Cards settings", active: false },
              { label: "Bill settings", active: false },
              { label: "API integration", active: false },
              { label: "File integration", active: false },
            ].map((it) => (
              <div key={it.label} className="flex flex-row items-center shrink-0 self-stretch rounded cursor-pointer hover:bg-white/[0.04] font-light" style={{ width: "100%", height: 26, padding: "4px 8px", background: it.active ? "#DCE7FA" : "transparent", flex: "none" }}>
                <span className="font-light" style={{ fontFamily: "Lato, system-ui, sans-serif", fontWeight: 300, fontSize: 12.5, lineHeight: "15px", color: it.active ? "#1C2547" : "rgba(215,214,229,0.75)", display: "flex", alignItems: "center", flex: "1 1 0" }}>{it.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Scroll hidden per spec display:none */}
      </div>
    </aside>
  );
}

function EnterpriseTopBar({ showToast, onCloseToast }) {
  // Compact enterprise h-11 (44px) py-0 px-8, gap-3, icons w-4 (16px), avatar w-7, 11px leading-tight — header left guide pl-8 matches main content
  return (
    <header
      className="bg-white border-b border-[#E4E4E4] flex flex-row justify-between items-center shrink-0 w-full overflow-visible relative"
      style={{ height: 44, minHeight: 44, maxHeight: 44, padding: "0 32px", gap: 12, boxSizing: "border-box", alignSelf: "stretch", flex: "none" }}
    >
      {/* Breadcrumbs-group — aligned to same pl-4 (16px) left guide as Team management title below */}
      <div className="flex flex-row items-center shrink-0" style={{ height: 14, flex: "none" }}>
        <span
          className="shrink-0 text-[11px] font-normal leading-tight"
          style={{ fontFamily: "Lato, system-ui, sans-serif", fontWeight: 400, fontSize: 11, lineHeight: "13px", color: "#6D7275", flex: "none" }}
        >
          Administration
        </span>
      </div>

      {/* Toast — centered in top bar, appears when new user added */}
      {showToast && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center animate-[fadeIn_0.2s_ease]">
          <button type="button" onClick={onCloseToast} className="block p-0 m-0 bg-transparent border-0 cursor-pointer">
            <img src={notificationToasterUrl} alt="New user added" width={179} height={40} className="block" style={{ width: 179, height: 40 }} />
          </button>
        </div>
      )}

      {/* Right utility container — exact uploaded assets, 22px icons, tight gap-1 */}
      <div className="flex items-center gap-1 ml-auto">
        {/* AI Sparkle Icon — official asset */}
        <button type="button" className="p-1 text-slate-500 hover:text-slate-800 transition-colors">
          <img src={tipaltiAiUrl} alt="" className="w-[22px] h-[22px] min-w-[22px] min-h-[22px] block" style={{ width: 22, height: 22 }} />
        </button>

        {/* Headset / Support Icon — official asset */}
        <button type="button" className="p-1 text-slate-500 hover:text-slate-800 transition-colors">
          <img src={helpDeskUrl} alt="" className="w-[22px] h-[22px] min-w-[22px] min-h-[22px] block" style={{ width: 22, height: 22 }} />
        </button>

        {/* Help Circle Icon — official asset */}
        <button type="button" className="p-1 text-slate-500 hover:text-slate-800 transition-colors">
          <img src={helpUrl} alt="" className="w-[22px] h-[22px] min-w-[22px] min-h-[22px] block" style={{ width: 22, height: 22 }} />
        </button>

        {/* Folder with exchange arrows — official multi-entity switch asset */}
        <button type="button" className="p-1 text-slate-500 hover:text-slate-800 transition-colors">
          <img src={fileManagerUrl} alt="" className="w-[22px] h-[22px] min-w-[22px] min-h-[22px] block" style={{ width: 22, height: 22 }} />
        </button>

        {/* Payer Context — 11px same as Administration, with chevron */}
        <span className="inline-flex items-center gap-1 text-[11px] font-normal text-slate-700 ml-1 select-none">
          Payer Name
          <img src={chevronSmallDownUrl} alt="" className="w-3 h-3 block shrink-0" style={{ width: 12, height: 12 }} />
        </span>

        {/* User Avatar Circle — exact uploaded asset */}
        <img src={avatarUrl} alt="" className="w-7 h-7 min-w-[28px] min-h-[28px] rounded-full block ml-1" style={{ width: 28, height: 28 }} />
      </div>
    </header>
  );
}

const FIXED_W = 1440;
const FIXED_H = 900;

export default function UserCreationPrototype() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState(SEED_USERS);
  const [tab, setTab] = useState("Users");
  const [checked, setChecked] = useState(new Set());
  const [q, setQ] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef(null);
  const outerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        setScale(w / FIXED_W);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const filtered = users.filter((u) => !q || u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()));
  const allChecked = filtered.length > 0 && filtered.every((u) => checked.has(u.id));

  return (
    <div
      ref={outerRef}
      className="relative w-full bg-white rounded-xl overflow-hidden border border-[#E4E4E4] isolate shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden"
      style={{ fontFamily: "Lato, system-ui, sans-serif", aspectRatio: `${FIXED_W} / ${FIXED_H}` }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap');`}</style>
      <style>{`.dropdown-scroll{scrollbar-gutter:stable;} .dropdown-scroll::-webkit-scrollbar{width:6px; height:6px} .dropdown-scroll::-webkit-scrollbar-track{background:transparent; border-right:none; margin-right:4px} .dropdown-scroll::-webkit-scrollbar-thumb{background:#BAC1C5; border-radius:3px; border-right:none; margin-right:4px}`}</style>

      {/* Fixed desktop canvas 1440×900 scaled via zoom for crisp text */}
      <div
        className="absolute top-0 left-0 flex flex-col bg-white"
        style={{ width: FIXED_W, height: FIXED_H, zoom: scale }}
      >
        {/* Enterprise shell: sidebar + main — fixed, no media queries */}
        <div className="flex flex-1 min-h-0 min-w-0 overflow-hidden" style={{ width: FIXED_W, height: FIXED_H }}>
        {/* Left Sidebar — narrowed to w-56 (~224px) for proper enterprise proportion, full-height */}
        <EnterpriseSidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />

        {/* Main canvas — relative anchor for modal centering within Main Content Area only (sidebar stays outside) — unified pure white #FFFFFF */}
        <div className="flex-1 flex flex-col min-w-0 bg-white min-h-0 relative" style={{ backgroundColor: "#FFFFFF" }}>
          {/* Top Header Bar */}
          <EnterpriseTopBar showToast={showToast} onCloseToast={() => setShowToast(false)} />

          {/* Main Content — SINGLE px-8 wrapper INSIDE white container — SimpleBar only for prototype */}
          <SimpleBar className="flex-1 min-h-0 bg-white px-8 py-0" style={{ backgroundColor: "#FFFFFF", flex: 1, minHeight: 0 }} autoHide={false}>
            <div className="flex flex-col flex-1 min-h-0 w-full">
              {/* Title + actions — pt-6 breathing room above title, mb-5 between subtitle and tabs */}
              <div className="bg-white pt-6 pb-3 shrink-0 border-b border-[#E4E4E4]">
                <div className="flex flex-row items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black text-[20px] leading-none text-[#021D2D]" style={{ fontFamily: "Lato, system-ui, sans-serif" }}>Team management</h3>
                    <p className="text-[12px] mt-1.5 text-[#6D7275]" style={{ fontFamily: "Lato, system-ui, sans-serif" }}>Add or import users and assign them different roles. <span className="text-[#6780FF] cursor-pointer">Learn more</span></p>
                  </div>
                  <div className="flex gap-2 shrink-0 self-start">
                    <button className="h-7 px-3 rounded-[4px] border border-[#021D2D] text-[13px] text-[#021D2D] bg-white hover:bg-gray-50 whitespace-nowrap inline-flex items-center justify-center leading-none" style={{ fontFamily: "Lato, system-ui, sans-serif", lineHeight: "1" }}>Add role</button>
                    <div className="relative">
                      <button
                        onClick={() => setDropdownOpen((o) => !o)}
                        className="h-7 px-3 rounded-[4px] bg-[#FFBC00] hover:bg-[#F0B000] active:bg-[#E08E00] text-[13px] text-[#021D2D] inline-flex items-center justify-center gap-1 leading-none"
                        style={{ fontFamily: "Lato, system-ui, sans-serif", lineHeight: "1" }}
                      >
                        Add user <ChevronDown size={13} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                      </button>
                      {dropdownOpen && (
                        <div className="absolute right-0 top-[calc(100%+6px)] bg-white border border-[#E1E7EA] shadow-[0px_1px_6px_rgba(0,0,0,0.1),0px_1px_2px_rgba(0,0,0,0.06)] rounded-[4px] w-[195px] z-30 overflow-hidden" style={{ width: 195, height: 89, boxSizing: "border-box" }}>
                          <div className="flex flex-col items-start" style={{ padding: "8px 0", width: 195, height: 88, boxSizing: "border-box" }}>
                            <div className="flex flex-col items-start w-full" style={{ padding: 0, gap: 8, width: 195, height: 72 }}>
                              {/* menu-item Add users manually — 195×32, content 179×32, hover/selected bg #F5F7F8 (default transparent) */}
                              <div className="flex flex-row items-center w-full" style={{ width: 195, height: 32, minHeight: 32, maxHeight: 32, padding: "0 8px", borderRadius: 4, boxSizing: "border-box" }}>
                                <button onClick={() => { setDropdownOpen(false); setModalOpen(true); }} className="flex flex-row justify-between items-start w-full h-8 rounded-[4px] text-left bg-transparent hover:bg-[#F5F7F8] focus:bg-[#F5F7F8] active:bg-[#F5F7F8] transition-colors" style={{ width: 179, height: 32, padding: 8, gap: 0, boxSizing: "border-box" }}>
                                  <span className="grid items-center flex-1 shrink-0" style={{ gridTemplateColumns: "16px 1fr", gap: 8, width: 163, height: 16, display: "grid" }}>
                                    <span className="flex items-center justify-center shrink-0" style={{ width: 16, height: 16, flex: "none" }}>
                                      <img src={ddUserPlusUrl} alt="" width={16} height={16} className="block" style={{ width: 16, height: 16, flex: "none" }} />
                                    </span>
                                    <span style={{ fontFamily: "Lato, sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "16px", color: "#021D2D", textAlign: "left", display: "block" }}>Add users manually</span>
                                  </span>
                                </button>
                              </div>
                              {/* menu-item Import CSV file — 195×32 — text left edge exactly at 40px from menu left */}
                              <div className="flex flex-row items-center w-full" style={{ width: 195, height: 32, minHeight: 32, maxHeight: 32, padding: "0 8px", borderRadius: 4, boxSizing: "border-box" }}>
                                <button onClick={() => setDropdownOpen(false)} className="flex flex-row justify-between items-start w-full h-8 rounded-[4px] bg-transparent hover:bg-[#F5F7F8] transition-colors" style={{ width: 179, height: 32, padding: 8, borderRadius: 4, boxSizing: "border-box" }}>
                                  <span className="grid items-center flex-1 shrink-0" style={{ gridTemplateColumns: "16px 1fr", gap: 8, width: 163, height: 16, display: "grid" }}>
                                    <span className="flex items-center justify-center shrink-0" style={{ width: 16, height: 16, flex: "none" }}>
                                      <img src={ddTableUrl} alt="" width={16} height={16} className="block" style={{ width: 16, height: 16, flex: "none" }} />
                                    </span>
                                    <span style={{ fontFamily: "Lato, sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "16px", color: "#021D2D", textAlign: "left", display: "block" }}>Import CSV file</span>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 mt-5 border-b border-[#E4E4E4] -mb-3">
                  {["Users", "Roles"].map((t) => (
                    <button key={t} onClick={() => setTab(t)} className={`pb-2 text-[13px] border-b-[1.5px] transition-colors ${tab === t ? "border-[#6780FF] text-[#6780FF] font-semibold" : "border-transparent text-[#808D95] hover:text-[#021D2D]"}`} style={{ fontFamily: "Lato, system-ui, sans-serif" }}>{t}</button>
                  ))}
                </div>
              </div>

              {/* Filter + search — breathing room mt-4 above, mb-4 below — no divider line */}
              <div className="bg-white py-2.5 mt-4 mb-4 flex items-center justify-between gap-3 shrink-0">
                <button className="h-7 px-3 inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#ECF2F5] text-[13px] text-[#021D2D] shrink-0 leading-none" style={{ fontFamily: "Lato, system-ui, sans-serif", lineHeight: "1" }}>
                  <img src={filterIconUrl} alt="" width={14} height={14} className="block shrink-0" style={{ width: 14, height: 14 }} /> Add filter
                </button>
                <div className="relative w-[220px]">
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search"
                    className="w-full h-7 pl-3 pr-9 rounded-[4px] border border-[#BAC1C5] text-[13px] placeholder:text-[#808D95] text-[#021D2D] outline-none focus:border-[#21308D]"
                    style={{ fontFamily: "Lato, system-ui, sans-serif" }}
                  />
                  <Search size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#808D95] pointer-events-none" />
                </div>
              </div>

              {/* Table — w-full to far-right border, no side borders */}
              <div className="flex-1 bg-white min-h-[180px] flex flex-col">
                <div className="w-full border-y border-[#E4E4E4] overflow-hidden flex flex-col">
                  {/* table-header — w-full distributed, no overflow */}
                  <div className="flex flex-row items-start p-0 w-full h-8 shrink-0 sticky top-0 z-10" style={{ height: 32 }}>
                    {/* header-cell checkbox 40×32 — no border between checkbox and Name */}
                    <div className="flex flex-row items-center justify-center shrink-0 bg-[#F6F6F6] border-b border-[#E4E4E4]" style={{ flex: "0 0 40px", width: 40, height: 32, padding: "0 8px", gap: 4 }}>
                      <button onClick={() => setChecked(allChecked ? new Set() : new Set(filtered.map((u) => u.id)))} className="flex items-center justify-center shrink-0" style={{ width: 12, height: 12 }}>
                        <img src={tableCheckboxUrl} alt="" width={12} height={12} className="block" style={{ width: 12, height: 12, opacity: allChecked ? 1 : 0.9 }} />
                      </button>
                    </div>
                    {/* header-cell Name — flex-1 ~180 basis */}
                    <div className="flex flex-row items-center shrink-0 bg-[#F6F6F6] border-b border-[#E4E4E4] flex-1 min-w-0" style={{ flex: "1 1 180px", minWidth: 0, height: 32, padding: "0 8px", gap: 4 }}>
                      <span style={{ fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 14, lineHeight: "17px", color: "#021D2D", textAlign: "left", whiteSpace: "nowrap" }}>Name</span>
                      <img src={tableSortUrl} alt="" width={14} height={14} className="block shrink-0" style={{ width: 14, height: 14 }} />
                    </div>
                    {/* header-cell Email — flex-1 ~220 basis */}
                    <div className="flex flex-row items-center shrink-0 bg-[#F6F6F6] border-b border-[#E4E4E4] flex-1 min-w-0" style={{ flex: "1.2 1 220px", minWidth: 0, height: 32, padding: "0 8px", gap: 4 }}>
                      <span style={{ fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 14, lineHeight: "17px", color: "#021D2D", textAlign: "left", whiteSpace: "nowrap" }}>Email</span>
                      <img src={tableSortUrl} alt="" width={14} height={14} className="block shrink-0" style={{ width: 14, height: 14 }} />
                    </div>
                    {/* header-cell Role — flex-1 ~200 basis */}
                    <div className="flex flex-row items-center shrink-0 bg-[#F6F6F6] border-b border-[#E4E4E4] flex-1 min-w-0" style={{ flex: "1 1 200px", minWidth: 0, height: 32, padding: "0 8px", gap: 4 }}>
                      <span style={{ fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 14, lineHeight: "17px", color: "#021D2D", textAlign: "left", whiteSpace: "nowrap" }}>Role</span>
                      <img src={tableSortUrl} alt="" width={14} height={14} className="block shrink-0" style={{ width: 14, height: 14 }} />
                    </div>
                    {/* header-cell Entity — flex-1 ~240 basis */}
                    <div className="flex flex-row items-center shrink-0 bg-[#F6F6F6] border-b border-[#E4E4E4] flex-1 min-w-0" style={{ flex: "1.3 1 240px", minWidth: 0, height: 32, padding: "0 8px", gap: 4 }}>
                      <span style={{ fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 14, lineHeight: "17px", color: "#021D2D", textAlign: "left", whiteSpace: "nowrap" }}>Entity</span>
                      <img src={tableSortUrl} alt="" width={14} height={14} className="block shrink-0" style={{ width: 14, height: 14 }} />
                    </div>
                    {/* header-cell Status — flex-1 ~120 basis */}
                    <div className="flex flex-row items-center shrink-0 bg-[#F6F6F6] border-b border-[#E4E4E4] flex-1 min-w-0" style={{ flex: "0.8 1 120px", minWidth: 0, height: 32, padding: "0 8px", gap: 4 }}>
                      <span style={{ fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 14, lineHeight: "17px", color: "#021D2D", textAlign: "left", whiteSpace: "nowrap" }}>Status</span>
                      <img src={tableSortUrl} alt="" width={14} height={14} className="block shrink-0" style={{ width: 14, height: 14 }} />
                    </div>
                    {/* header-cell actions 40×32 — download icon, at far-right border */}
                    <div className="flex flex-row items-center justify-center shrink-0 bg-[#F6F6F6] border-b border-[#E4E4E4]" style={{ flex: "0 0 40px", width: 40, height: 32, padding: "0 8px", gap: 4 }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 10L8 3M8 10L5 7M8 10L11 7" stroke="#1F1F1F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 11V12.5C3 12.77 3.22 13 3.5 13H12.5C12.77 13 13 12.77 13 12.5V11" stroke="#1F1F1F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                  {filtered.map((u) => {
                    const isChecked = checked.has(u.id);
                    return (
                      <div key={u.id} className="flex flex-row items-center w-full bg-white border-b border-[#E4E4E4] hover:bg-[#F8F9FD] text-[12px] text-[#021D2D] shrink-0" style={{ height: 44 }}>
                        <div className="flex items-center justify-center shrink-0" style={{ flex: "0 0 40px", width: 40, height: 44, padding: "0 8px" }}>
                          <button onClick={() => setChecked((prev) => { const n = new Set(prev); n.has(u.id) ? n.delete(u.id) : n.add(u.id); return n; })} className="w-3 h-3 flex items-center justify-center">
                            <span className={`w-3 h-3 rounded-[2px] border flex items-center justify-center ${isChecked ? "bg-[#6780FF] border-[#6780FF]" : "border-[#231D27] bg-white"}`}>
                              {isChecked && <svg width="7" height="7" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                            </span>
                          </button>
                        </div>
                        <div className="flex items-center shrink-0 truncate flex-1 min-w-0" style={{ flex: "1 1 180px", minWidth: 0, height: 44, padding: "0 8px", fontFamily: "Lato, system-ui, sans-serif" }}>{u.name}</div>
                        <div className="flex items-center shrink-0 truncate flex-1 min-w-0" style={{ flex: "1.2 1 220px", minWidth: 0, height: 44, padding: "0 8px", fontFamily: "Lato, system-ui, sans-serif" }}>{u.email}</div>
                        <div className="flex items-center shrink-0 truncate flex-1 min-w-0" style={{ flex: "1 1 200px", minWidth: 0, height: 44, padding: "0 8px" }}>{u.role}</div>
                        <div className="flex items-center shrink-0 truncate flex-1 min-w-0" style={{ flex: "1.3 1 240px", minWidth: 0, height: 44, padding: "0 8px", fontSize: 11 }}>{u.entity}</div>
                        <div className="flex items-center shrink-0 flex-1 min-w-0" style={{ flex: "0.8 1 120px", minWidth: 0, height: 44, padding: "0 8px" }}><StatusBadge status={u.status} /></div>
                        <div className="flex items-center justify-center shrink-0" style={{ flex: "0 0 40px", width: 40, height: 44, padding: "0 8px" }}><span className="text-[#808D95] text-[12px]">⋯</span></div>
                      </div>
                    );
                  })}
                  {filtered.length === 0 && <div className="p-6 text-center text-sm text-[#808D95] w-full" style={{ fontFamily: "Lato, system-ui, sans-serif" }}>No users found</div>}
                </div>
              </div>

            </div>
          </SimpleBar>
          {/* Pagination — pinned to bottom of Main Content Area, outside scroll — gap to table matches filter gap (mt-4 = 16px) */}
          <div className="bg-white px-8 py-3 flex flex-col gap-1 shrink-0" style={{ fontFamily: "Lato, system-ui, sans-serif" }}>
            <div className="hidden" style={{ width: 6, height: 6, borderRadius: 60, background: "#BAC1C5" }} />
            <div className="flex flex-row items-center justify-between w-full" style={{ minHeight: 32, gap: 10 }}>
              {/* LEFT — First |<, Previous <, Pages 1-5, Next >, Last >| — aligned to table left border */}
              <div className="flex flex-row items-center shrink-0" style={{ gap: 16 }}>
                <div className="flex flex-row items-center gap-1" style={{ gap: 4 }}>
                  <button className="w-5 h-5 flex items-center justify-center shrink-0" aria-label="First page" title="First page">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="4" y="4" width="1.5" height="12" rx="0.5" fill="#021D2D"/><path d="M10 6L6 10L10 14" stroke="#021D2D" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <button className="w-5 h-5 flex items-center justify-center shrink-0" aria-label="Previous">
                    <ChevronLeft size={14} className="text-[#021D2D]" strokeWidth={1.8} />
                  </button>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <span className="flex flex-col justify-center items-center" style={{ minWidth: 9 }}><span style={{ fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 14, lineHeight: "18px", color: "#021D2D", textAlign: "center" }}>1</span></span>
                  <span className="flex flex-col justify-center items-center" style={{ minWidth: 9 }}><span style={{ fontFamily: "Lato, sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "18px", color: "#808D95", textAlign: "center" }}>2</span></span>
                  <span className="flex flex-col justify-center items-center" style={{ minWidth: 9 }}><span style={{ fontFamily: "Lato, sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "18px", color: "#808D95", textAlign: "center" }}>3</span></span>
                  <span className="flex flex-col justify-center items-center" style={{ minWidth: 9 }}><span style={{ fontFamily: "Lato, sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "18px", color: "#808D95", textAlign: "center" }}>4</span></span>
                  <span className="flex flex-col justify-center items-center" style={{ minWidth: 9 }}><span style={{ fontFamily: "Lato, sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "18px", color: "#808D95", textAlign: "center" }}>5</span></span>
                </div>
                <div className="flex flex-row items-center gap-1" style={{ gap: 4 }}>
                  <button className="w-5 h-5 flex items-center justify-center shrink-0" aria-label="Next">
                    <ChevronRight size={14} className="text-[#021D2D]" strokeWidth={1.8} />
                  </button>
                  <button className="w-5 h-5 flex items-center justify-center shrink-0" aria-label="Last page" title="Last page">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 6L14 10L10 14" stroke="#021D2D" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><rect x="15" y="4" width="1.5" height="12" rx="0.5" fill="#021D2D"/></svg>
                  </button>
                </div>
              </div>
              {/* RIGHT — 360 items | 24 pages + rows-per-page 15 — aligned to table right border */}
              <div className="flex flex-row items-center shrink-0 ml-auto" style={{ gap: 17 }}>
                <span className="text-[12px] font-normal leading-tight" style={{ fontFamily: "Lato, sans-serif", fontWeight: 400, fontSize: 12, lineHeight: "14px", color: "#64748B", whiteSpace: "nowrap" }}>360 items | 24 pages</span>
                <div className="flex flex-row justify-center items-center shrink-0 bg-white" style={{ width: 66, height: 32, gap: 8, padding: "0 12px", border: "1px solid #CCCCCC", borderRadius: 3, boxSizing: "border-box" }}>
                  <span style={{ fontFamily: "Lato, sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "14px", color: "#021D2D", flex: "none" }}>1</span>
                  <ChevronDown size={12} className="text-[#021D2D] shrink-0" strokeWidth={1.8} />
                </div>
              </div>
            </div>
          </div>
          {modalOpen && (
            <AddNewUserModal
              onClose={() => setModalOpen(false)}
              onAdd={(nu) => {
                const newUser = { id: Date.now(), name: `${nu.firstName} ${nu.lastName}`, email: nu.email, role: nu.role, entity: "—", status: "Invited" };
                setUsers((prev) => [newUser, ...prev]);
                setShowToast(true);
                if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
                toastTimeoutRef.current = setTimeout(() => setShowToast(false), 3000);
              }}
            />
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
