import React from "react";
import { C, L, Btn, plusUrl } from "./bits";
import AppCard from "./AppCard";
import emptyIllustrationUrl from "@/assets/devhub-proto/empty-illustration.svg";

export default function MyApps({ apps, onCreate, onOpen, onDelete, onToast }) {
  const empty = apps.length === 0;
  return (
    <div className="h-full overflow-auto" style={{ padding: "24px 48px", ...L }}>
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 style={{ ...L, fontSize: 26, lineHeight: "32px", fontWeight: 700, color: C.ink, margin: 0 }}>
            My apps
          </h1>
          <p style={{ ...L, fontSize: 14, lineHeight: "20px", color: C.muted, margin: "4px 0 0" }}>
            Use API apps to build custom integrations with Tipalti.
            <br />
            Apps help sync your financial data and simplify account reconciliation.{" "}
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: C.link }}>
              Learn more
            </a>
          </p>
        </div>
        <Btn
          onClick={onCreate}
          icon={<img src={plusUrl} alt="" width={20} height={20} />}
          style={{ marginTop: 4 }}
        >
          Create app
        </Btn>
      </div>

      {empty ? (
        <EmptyState onCreate={onCreate} />
      ) : (
        <div className="flex flex-wrap" style={{ gap: 32, marginTop: 30 }}>
          {apps.map((a) => (
            <AppCard key={a.id} app={a} onOpen={onOpen} onDelete={onDelete} onToast={onToast} />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState({ onCreate }) {
  return (
    <div className="flex flex-col items-center" style={{ paddingTop: 140 }}>
      <img src={emptyIllustrationUrl} alt="" width={356} height={128} className="block" />
      <p
        style={{
          ...L,
          fontSize: 16,
          lineHeight: "22px",
          color: C.ink,
          textAlign: "center",
          margin: "16px 0 0",
          maxWidth: 280,
        }}
      >
        Create an app to start building custom integrations.
      </p>
      <div style={{ marginTop: 20 }}>
        <Btn onClick={onCreate} icon={<img src={plusUrl} alt="" width={20} height={20} />}>
          Create app
        </Btn>
      </div>
    </div>
  );
}
