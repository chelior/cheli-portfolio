import React, { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import MyApps from "./MyApps";
import Details from "./Details";
import CreateModal, { SCOPES } from "./CreateModal";
import DeleteDialog from "./DeleteDialog";
import Toast from "./Toast";

export const FIXED_W = 1920;
export const FIXED_H = 1080;

const CLIENT_ID = "tipalti.thirdpartyapi.0cV0rlKnPfLvY10DuVo4yPrH6ec";

const SEED_SCOPES_1 = [
  "tipalti.api.payee.read",
  "tipalti.api.payee.write",
  "tipalti.api.report1099.write",
  "tipalti.api.glaccount.write",
  "tipalti.api.payable.read",
  "tipalti.api.payable.write",
  "tipalti.api.invoice.read",
  "tipalti.api.invoice.write",
  "tipalti.api.payment.read",
  "tipalti.api.payment.write",
  "tipalti.api.payer-entity.read",
  "tipalti.api.payer-entity.write",
  "tipalti.api.glaccount.read",
  "tipalti.api.report1099.read",
  "tipalti.api.payee.batch.read",
  "tipalti.api.payee.batch.write",
  "tipalti.api.payment.batch.read",
  "tipalti.api.balancetransfer.read",
  "tipalti.api.consolidatedpayment.read",
  "tipalti.api.message.read",
];

const SEED_APPS = [
  {
    id: "a1",
    name: "API Credential Provisioning, Rotation and Secure Access Platform",
    flow: "Authorization code flow",
    createdBy: "dan.smith@tipalti.com",
    date: "21/08/2024",
    clientId: CLIENT_ID,
    clientSecret: "8f3a1c9d4e7b2a6f0c5d8e1a4b7c9d2e",
    scopes: SEED_SCOPES_1,
    urls: [
      "https://api.company-devhub.com/oauth/authorize?client_id=client-app-payments-sync-service-94f2a7c1e3b8&response_type=code",
      "https://auth.company.io/v1/token?client_id=client-integrations-ledger-reconciliation-tool-0ab31c92df47",
    ],
  },
  {
    id: "a2",
    name: "Secure API Key and Access Management Console",
    flow: "Client credentials flow",
    createdBy: "alexander.lifshitz@tipalti.com",
    date: "03/11/2025",
    clientId: CLIENT_ID,
    clientSecret: "b7e2d5a8c1f4e9b3a6d0c2f8e5a1b4c7",
    scopes: SCOPES.slice(0, 6),
    urls: [],
  },
];

const randHex = (n) =>
  Array.from({ length: n }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");

const today = () => {
  const d = new Date();
  const p = (x) => String(x).padStart(2, "0");
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
};

export default function DevHubPrototype() {
  const outerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [apps, setApps] = useState(SEED_APPS);
  const [screen, setScreen] = useState("apps");
  const [activeId, setActiveId] = useState(null);
  const [editing, setEditing] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / FIXED_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const showToast = (kind, text) => {
    setToast({ kind, text, id: Date.now() });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4000);
  };

  const activeApp = useMemo(() => apps.find((a) => a.id === activeId), [apps, activeId]);
  const allScopes = useMemo(
    () => (activeApp ? Array.from(new Set([...SCOPES, ...activeApp.scopes])) : SCOPES),
    [activeApp]
  );

  const goApps = () => {
    setScreen("apps");
    setActiveId(null);
    setEditing(false);
  };

  const openApp = (id) => {
    setActiveId(id);
    setScreen("details");
    setEditing(false);
  };

  const createApp = (data) => {
    const app = {
      id: `a${Date.now()}`,
      ...data,
      createdBy: "Nadav.somberg@tipalti.com",
      date: today(),
      clientId: `tipalti.thirdpartyapi.${randHex(24)}`,
      clientSecret: randHex(32),
    };
    setApps((prev) => [app, ...prev]);
    setCreateOpen(false);
    showToast("positive", "App created.");
  };

  const saveApp = (patch) => {
    setApps((prev) => prev.map((a) => (a.id === activeId ? { ...a, ...patch } : a)));
    setEditing(false);
    showToast("positive", "Changes saved.");
  };

  const confirmDelete = () => {
    setApps((prev) => prev.filter((a) => a.id !== deleteTarget));
    const wasActive = deleteTarget === activeId;
    setDeleteTarget(null);
    if (wasActive) goApps();
    showToast("positive", "App deleted.");
  };

  return (
    <div
      ref={outerRef}
      className="relative w-full bg-white rounded-xl overflow-hidden border border-[#E4E4E4] shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
      style={{ fontFamily: "Lato, system-ui, sans-serif", aspectRatio: `${FIXED_W} / ${FIXED_H}` }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap');
.dropdown-scroll{scrollbar-gutter:stable;}
.dropdown-scroll::-webkit-scrollbar{width:6px; height:6px}
.dropdown-scroll::-webkit-scrollbar-track{background:transparent; border-right:none; margin-right:4px}
.dropdown-scroll::-webkit-scrollbar-thumb{background:#BAC1C5; border-radius:3px; border-right:none; margin-right:4px}`}</style>

      <div
        className="absolute top-0 left-0 flex bg-white"
        style={{ width: FIXED_W, height: FIXED_H, zoom: scale }}
      >
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} onHome={goApps} />

        <div className="flex-1 flex flex-col min-w-0 min-h-0 relative">
          <TopBar crumbs={screen === "details" && activeApp ? ["Apps", activeApp.name] : ["Apps"]} />

          <Toast toast={toast} onClose={() => setToast(null)} />

          {/* content area (1664×1016) — modals anchor here */}
          <div className="flex-1 min-h-0 relative bg-white overflow-hidden">
            {screen === "details" && activeApp ? (
              <Details
                app={activeApp}
                editing={editing}
                allScopes={allScopes}
                onBack={goApps}
                onEdit={() => setEditing(true)}
                onCancelEdit={() => setEditing(false)}
                onSave={saveApp}
                onDelete={() => setDeleteTarget(activeApp.id)}
                onToast={showToast}
              />
            ) : (
              <MyApps
                apps={apps}
                onCreate={() => setCreateOpen(true)}
                onOpen={openApp}
                onDelete={(id) => setDeleteTarget(id)}
                onToast={showToast}
              />
            )}

            {createOpen && <CreateModal onClose={() => setCreateOpen(false)} onCreate={createApp} />}

            {deleteTarget && (
              <DeleteDialog
                onCancel={() => setDeleteTarget(null)}
                onConfirm={confirmDelete}
              />
            )}
          </div>
        </div>

        {(createOpen || deleteTarget) && (
          <div className="absolute inset-0" style={{ background: "rgba(2, 29, 45, 0.2)", zIndex: 30 }} />
        )}
      </div>
    </div>
  );
}
