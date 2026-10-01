import React, { useRef, useState } from "react";
import {
  C, L, Btn, IconBtn, Radio, Checkbox, CheckBoxBox, useClickOutside, plusUrl,
  fieldStyle, fieldCls, ddMenuStyle, ddRowCls, ddRowStyle,
} from "./bits";

export const SCOPES = [
  "tipalti.api.payee.read",
  "tipalti.api.payee.write",
  "tipalti.api.payer-entity.read",
  "tipalti.api.payer-entity.write",
  "tipalti.api.glaccount.read",
  "tipalti.api.glaccount.write",
  "tipalti.api.report1099.write",
  "tipalti.api.payable.read",
  "tipalti.api.payable.write",
  "tipalti.api.invoice.read",
  "tipalti.api.invoice.write",
  "tipalti.api.payment.read",
];

function ModalLabel({ children, link }) {
  return (
    <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
      <span style={{ ...L, fontSize: 12, lineHeight: "14px", fontWeight: 700, color: C.ink }}>{children}</span>
      {link && (
        <button
          type="button"
          className="inline-flex items-center gap-1 hover:underline focus:outline-none"
          style={{ ...L, fontSize: 12, lineHeight: "14px", color: C.link }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <path d="M15 3h6v6" />
            <path d="M10 14 21 3" />
          </svg>
          More info
        </button>
      )}
    </div>
  );
}

function FieldError({ msg }) {
  return (
    <div style={{ ...L, fontSize: 10, lineHeight: "12px", color: "#FD2D46", paddingTop: 4 }}>{msg}</div>
  );
}

function ScopeSelect({ selected, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false), open);

  const toggle = (s) => {
    const next = new Set(selected);
    if (next.has(s)) next.delete(s);
    else next.add(s);
    onChange(next);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between text-left ${fieldCls()} ${open ? "!shadow-[inset_0_0_0_2px_#21308D]" : ""}`}
        style={{ ...fieldStyle, padding: "0 12px" }}
      >
        <span style={{ color: selected.size ? C.ink : C.muted }}>
          {selected.size ? `${selected.size} items selected` : "Select scopes"}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={C.ink}
          strokeWidth="2"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div
          className="absolute left-0 right-0 z-50 overflow-y-auto"
          style={{ top: "calc(100% + 4px)", maxHeight: 240, ...ddMenuStyle }}
        >
          {SCOPES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggle(s)}
              className={`w-full flex items-center text-left focus:outline-none ${ddRowCls(selected.has(s))}`}
              style={ddRowStyle}
            >
              <CheckBoxBox checked={selected.has(s)} />
              <span style={{ ...L, fontSize: 14, lineHeight: "17px", color: C.ink }}>{s}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CreateModal({ onClose, onCreate }) {
  const [flow, setFlow] = useState("Client credentials flow");
  const [name, setName] = useState("");
  const [scopes, setScopes] = useState(new Set());
  const [urls, setUrls] = useState([""]);
  const [agreed, setAgreed] = useState(false);
  const [err, setErr] = useState(null); // { field: "name" | "terms", msg }

  const submit = () => {
    if (!name.trim()) {
      setErr({ field: "name", msg: "Enter an app name to continue." });
      return;
    }
    if (!agreed) {
      setErr({ field: "terms", msg: "You must accept the developer terms to create an app." });
      return;
    }
    onCreate({
      name: name.trim(),
      flow,
      scopes: SCOPES.filter((s) => scopes.has(s)),
      urls:
        flow === "Authorization code flow"
          ? urls.map((u) => u.trim()).filter((u) => u && u !== "https://")
          : [],
    });
  };

  const setUrl = (i, v) => setUrls((prev) => prev.map((u, j) => (j === i ? v : u)));
  const addUrl = () =>
    setUrls((prev) =>
      prev.length >= 5 || (prev.length > 0 && !prev[prev.length - 1].trim()) ? prev : [...prev, ""]
    );
  const removeUrl = (i) => setUrls((prev) => prev.filter((_, j) => j !== i));

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div
        className="flex flex-col"
        style={{
          width: 500,
          height: 690,
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0px 8px 32px rgba(2, 29, 45, 0.24)",
          ...L,
        }}
      >
        {/* header */}
        <div
          className="flex items-center justify-between shrink-0"
          style={{ height: 68, padding: "0 24px", borderBottom: `1px solid ${C.border}` }}
        >
          <span style={{ fontSize: 16, lineHeight: "20px", fontWeight: 700, color: C.ink }}>Create new app</span>
          <IconBtn alt="Close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="1.8">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </IconBtn>
        </div>

        {/* body */}
        <div className="flex-1 min-h-0 overflow-y-auto" style={{ padding: "16px 24px 0" }}>
          <div>
            <div style={{ fontSize: 14, lineHeight: "17px", fontWeight: 700, color: C.ink }}>Flow type</div>
            <div style={{ fontSize: 14, lineHeight: "17px", fontWeight: 700, color: C.ink, marginTop: 6 }}>
              Set up the API permissions your app needs
            </div>
          </div>
          <div className="flex flex-col" style={{ gap: 14, marginTop: 13 }}>
            <Radio checked={flow === "Client credentials flow"} onChange={() => setFlow("Client credentials flow")}>
              Client credentials flow
            </Radio>
            <Radio checked={flow === "Authorization code flow"} onChange={() => setFlow("Authorization code flow")}>
              Authorization code flow
            </Radio>
          </div>

          <div style={{ marginTop: 24 }}>
            <ModalLabel>App name</ModalLabel>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (err?.field === "name") setErr(null);
              }}
              placeholder="Add your app's name"
              className={`w-full ${fieldCls(err?.field === "name")}`}
              style={fieldStyle}
            />
            {err?.field === "name" && <FieldError msg={err.msg} />}
          </div>

          <div style={{ marginTop: 24 }}>
            <ModalLabel link>Required scopes</ModalLabel>
            <ScopeSelect selected={scopes} onChange={setScopes} />
          </div>

          {flow === "Authorization code flow" && (
            <div style={{ marginTop: 24 }}>
              <ModalLabel link>Return URLs (Max 5)</ModalLabel>
              <div className="flex items-center" style={{ gap: 12 }}>
                <div className="flex-1 flex flex-col" style={{ gap: 12 }}>
                  {urls.map((u, i) => (
                    <div key={i} className="flex items-center" style={{ gap: 12 }}>
                      <input
                        value={u}
                        onChange={(e) => setUrl(i, e.target.value)}
                        placeholder="https://"
                        className={`w-full ${fieldCls()}`}
                        style={fieldStyle}
                      />
                      {i > 0 && (
                        <IconBtn alt="Remove URL" onClick={() => removeUrl(i)}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.8">
                            <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          </svg>
                        </IconBtn>
                      )}
                    </div>
                  ))}
                </div>
                <IconBtn
                  alt="Add return URL"
                  onClick={addUrl}
                  disabled={urls.length >= 5}
                  className={urls.length >= 5 ? "opacity-40" : ""}
                >
                  <img src={plusUrl} alt="" width={20} height={20} />
                </IconBtn>
              </div>
            </div>
          )}
        </div>

        {/* terms — pinned 28px above footer */}
        <div className="shrink-0" style={{ padding: "24px 24px 0", marginBottom: 28 }}>
          <Checkbox checked={agreed} onChange={(v) => { setAgreed(v); if (err?.field === "terms") setErr(null); }}>
            By checking this box, I confirm that I am authorized, and agree to accept the{" "}
            <span style={{ color: C.link }}>Tipalti Developer Terms</span> and the{" "}
            <span style={{ color: C.link }}>Tipalti Privacy Policy</span>
          </Checkbox>
          {err?.field === "terms" && <FieldError msg={err.msg} />}
        </div>

        {/* footer */}
        <div className="flex items-center justify-end shrink-0" style={{ padding: "16px 24px 24px", gap: 12, marginTop: "auto" }}>
          <Btn variant="outline" style={{ padding: "0 12px" }} onClick={onClose}>
            Cancel
          </Btn>
          <Btn style={{ padding: "0 12px" }} onClick={submit}>
            Create
          </Btn>
        </div>
      </div>
    </div>
  );
}
