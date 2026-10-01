import React, { useEffect, useRef, useState } from "react";
import {
  C, L, Btn, IconBtn, Tag, CheckBoxBox, useClickOutside,
  fieldStyle, fieldCls,
} from "./bits";
import urlDeleteUrl from "@/assets/devhub-proto/url-delete.svg";
import urlAddUrl from "@/assets/devhub-proto/url-add.png";
import copyIcon16Url from "@/assets/devhub-proto/copyicon16px.svg";

function PanelHead({ title, count, right }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{ height: 48, padding: "0 20px", borderBottom: `1px solid ${C.border}` }}
    >
      <span style={{ ...L, fontSize: 16, lineHeight: "20px", fontWeight: 700, color: C.ink }}>
        {title}
        {count != null && ` (${count})`}
      </span>
      <div className="flex items-center" style={{ gap: 16 }}>
        {right}
      </div>
    </div>
  );
}

function ReadMore() {
  return (
    <button type="button" className="hover:underline focus:outline-none" style={{ ...L, fontSize: 14, color: C.link }}>
      Read more
    </button>
  );
}

function CopyAllBtn({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center bg-white hover:bg-[#F9FAFB] active:bg-[#EEF1F3] transition-colors select-none focus:outline-none"
      style={{
        ...L,
        minWidth: 76,
        height: 24,
        padding: "5px 8px",
        gap: 2,
        whiteSpace: "nowrap",
        border: `1px solid ${C.ink}`,
        borderRadius: 4,
        fontSize: 12,
        lineHeight: "14px",
        fontWeight: 400,
        color: C.ink,
        boxSizing: "border-box",
      }}
    >
      <img src={copyIcon16Url} alt="" width={16} height={16} style={{ flexShrink: 0, display: "block" }} />
      Copy all
    </button>
  );
}

function ScopeBullets({ items }) {
  return (
    <div className="grid" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))", columnGap: 24, rowGap: 0 }}>
      {items.map((s, i) => (
        <div key={i} className="flex items-center" style={{ height: 28, minWidth: 0, gap: 10 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.ink, flexShrink: 0 }} />
          <span className="truncate" style={{ ...L, fontSize: 14, lineHeight: "20px", color: C.ink }}>
            {s}
          </span>
        </div>
      ))}
    </div>
  );
}

function UrlBullets({ items }) {
  return (
    <div className="flex flex-col">
      {items.map((u, i) => (
        <div key={i} className="flex items-center" style={{ height: 28, gap: 10, minWidth: 0 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.ink, flexShrink: 0 }} />
          <span className="truncate" style={{ ...L, fontSize: 14, lineHeight: "20px", color: C.ink }}>
            {u}
          </span>
        </div>
      ))}
      {items.length === 0 && (
        <span style={{ ...L, fontSize: 14, color: C.muted }}>No return URLs added yet.</span>
      )}
    </div>
  );
}

function Chip({ label, onRemove }) {
  return (
    <span
      className="inline-flex items-center"
      style={{ height: 16, padding: "0 4px", gap: 2, borderRadius: 4, background: "#CFDFFF", maxWidth: "100%", boxSizing: "border-box" }}
    >
      <span className="truncate" style={{ ...L, fontSize: 10, lineHeight: "12px", fontWeight: 400, color: C.ink }}>
        {label}
      </span>
      <button
        type="button"
        aria-label={`Remove ${label}`}
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="inline-flex items-center justify-center shrink-0 focus:outline-none"
        style={{ width: 12, height: 12 }}
      >
        <svg width="8" height="8" viewBox="0 0 16 16" fill="none" stroke={C.ink} strokeWidth="1.8">
          <path d="M3 3l10 10M13 3L3 13" />
        </svg>
      </button>
    </span>
  );
}

function ScopesCombobox({ allScopes, selected, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false), open);
  const toggle = (s) => {
    const next = new Set(selected);
    next.has(s) ? next.delete(s) : next.add(s);
    onChange(next);
  };
  const list = allScopes.filter((s) => selected.has(s));
  return (
    <div className="relative" ref={ref} style={{ width: 330 }}>
      <div style={{ ...L, fontSize: 12, lineHeight: "14px", fontWeight: 700, color: C.ink, paddingBottom: 8 }}>
        Select scopes
      </div>
      <div
        role="button"
        tabIndex={0}
        data-testid="scopes-trigger"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center cursor-pointer ${fieldCls()} ${open ? "!shadow-[inset_0_0_0_2px_#21308D]" : ""}`}
        style={{ ...fieldStyle, padding: "0 8px 0 12px", gap: 8 }}
      >
        <span className="flex-1 flex flex-wrap items-center" style={{ gap: 4, minWidth: 0 }}>
          {list.length === 0 ? (
            <span style={{ ...L, fontSize: 14, lineHeight: "16px", color: C.placeholder }}>Select scopes</span>
          ) : (
            <>
              <Chip label={list[0]} onRemove={() => toggle(list[0])} />
              {list.length > 1 && (
                <Chip
                  label={`+${list.length - 1}`}
                  onRemove={() => onChange(new Set(list.slice(0, 1)))}
                />
              )}
            </>
          )}
        </span>
        {list.length > 0 && (
          <button
            type="button"
            aria-label="Clear scopes"
            onClick={(e) => {
              e.stopPropagation();
              onChange(new Set());
            }}
            className="inline-flex items-center justify-center shrink-0 focus:outline-none"
            style={{ width: 16, height: 16 }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={C.ink} strokeWidth="1.5">
              <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
            </svg>
          </button>
        )}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={C.ink}
          strokeWidth="2"
          className="shrink-0"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      {open && (
        <div
          className="absolute left-0 z-40 overflow-y-auto dropdown-scroll"
          style={{
            top: "calc(100% + 8px)",
            width: 330,
            maxHeight: 280,
            background: "#fff",
            borderRadius: 4,
            padding: 8,
            boxSizing: "border-box",
            boxShadow: "0px 3px 10px -1px rgba(0, 0, 0, 0.1), 0px 0px 8px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div className="flex flex-col" style={{ gap: 8 }}>
            {allScopes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toggle(s)}
                className="flex items-center w-full text-left bg-white transition-colors hover:bg-[#F5F7F8] rounded-[4px] focus:outline-none"
                style={{ height: 40, padding: 8, gap: 12, boxSizing: "border-box" }}
              >
                <CheckBoxBox checked={selected.has(s)} />
                <span className="truncate" style={{ ...L, fontSize: 14, lineHeight: "16px", color: C.ink }}>
                  {s}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Details({
  app,
  editing,
  allScopes,
  onBack,
  onEdit,
  onCancelEdit,
  onSave,
  onDelete,
  onToast,
}) {
  const [name, setName] = useState(app.name);
  const [scopes, setScopes] = useState(() => new Set(app.scopes));
  const [urls, setUrls] = useState([...app.urls]);
  const [secretShown, setSecretShown] = useState(false);

  useEffect(() => {
    setName(app.name);
    setScopes(new Set(app.scopes));
    setUrls(app.urls.filter((u) => u && u.trim() && u !== "https://"));
    setSecretShown(false);
  }, [app.id, editing]); // eslint-disable-line react-hooks/exhaustive-deps

  const copy = (text, msg = "Copied to clipboard.") => {
    if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
    onToast("positive", msg);
  };

  const save = () => {
    if (!name.trim()) {
      onToast("danger", "Enter an app name to save changes.");
      return;
    }
    onSave({
      name: name.trim(),
      scopes: allScopes.filter((s) => scopes.has(s)),
      urls: urls.map((u) => u.trim()).filter((u) => u && u !== "https://"),
    });
  };

  const addUrl = () => {
    if (urls.length >= 5) return;
    if (urls.length > 0 && !urls[urls.length - 1].trim()) return;
    setUrls((u) => [...u, ""]);
  };
  const setUrl = (i, v) => setUrls((u) => u.map((x, j) => (j === i ? v : x)));
  const removeUrl = (i) => setUrls((u) => u.filter((_, j) => j !== i));

  const panelStyle = { background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8 };

  return (
    <div className="h-full overflow-auto" style={{ padding: "24px 48px", ...L }}>
      {/* header */}
      <div className="flex items-center" style={{ height: 32, gap: 4 }}>
        <IconBtn alt="Back to My apps" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="1.8">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
        </IconBtn>
        {editing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldCls()}
            style={{ ...fieldStyle, width: 740 }}
            autoFocus
          />
        ) : (
          <h1
            className="truncate"
            style={{ ...L, fontSize: 20, lineHeight: "24px", fontWeight: 700, color: C.ink, margin: 0 }}
          >
            {app.name}
          </h1>
        )}
      </div>

      {/* actions */}
      <div className="flex items-center justify-end" style={{ height: 32, gap: 8 }}>
        {editing ? (
          <>
            <Btn variant="outline" style={{ padding: "0 12px" }} onClick={onCancelEdit}>
              Cancel
            </Btn>
            <Btn style={{ padding: "0 16px" }} onClick={save}>
              Save
            </Btn>
          </>
        ) : (
          <>
            <Btn variant="outline" style={{ padding: "0 12px" }} onClick={onDelete}>
              Delete
            </Btn>
            <Btn style={{ padding: "0 16px" }} onClick={onEdit}>
              Edit
            </Btn>
          </>
        )}
      </div>

      <div style={{ borderTop: `1px solid #D6D6D6`, marginTop: 12 }} />

      {/* tag */}
      <div style={{ marginTop: 20 }}>
        <Tag flow={app.flow} />
      </div>

      {/* client id / secret */}
      <div className="grid" style={{ gridTemplateColumns: "705px minmax(0, 1fr)", gap: 16, marginTop: 32 }}>
        <div>
          <div style={{ ...L, fontSize: 12, lineHeight: "14px", fontWeight: 700, color: C.ink, marginBottom: 8 }}>
            Client ID
          </div>
          <div className="flex items-center" style={{ gap: 8 }}>
            <div
              className="flex-1 flex items-center"
              style={{ height: 32, borderRadius: 4, background: C.fieldBg, padding: "0 12px", minWidth: 0 }}
            >
              <span className="truncate" style={{ ...L, fontSize: 14, color: C.ink }}>
                {app.clientId}
              </span>
            </div>
            <IconBtn size={24} alt="Copy client ID" onClick={() => copy(app.clientId, "Client ID copied.")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="1.8">
                <rect x="9" y="9" width="11" height="11" rx="2" />
                <path d="M5 15V5a2 2 0 0 1 2-2h10" />
              </svg>
            </IconBtn>
          </div>
        </div>
        <div>
          <div style={{ ...L, fontSize: 12, lineHeight: "14px", fontWeight: 700, color: C.ink, marginBottom: 8 }}>
            Client secret
          </div>
          <div className="flex items-center" style={{ gap: 8 }}>
            <div
              className="flex-1 flex items-center"
              style={{ height: 32, borderRadius: 4, background: C.fieldBg, padding: "0 12px", minWidth: 0 }}
            >
              <span className="truncate" style={{ ...L, fontSize: 14, color: C.ink }}>
                {secretShown ? app.clientSecret : "•".repeat(14)}
              </span>
            </div>
            <IconBtn size={24} alt={secretShown ? "Hide client secret" : "Show client secret"} onClick={() => setSecretShown((s) => !s)}>
              {secretShown ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="1.8">
                  <path d="M2 2l20 20" />
                  <path d="M6.7 6.7C4.6 8.1 3 10 2 12c2 4 6 7 10 7 2 0 3.8-.6 5.3-1.6" />
                  <path d="M9.9 5.2A10 10 0 0 1 12 5c4 0 8 3 10 7-.7 1.4-1.7 2.7-2.9 3.8" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="1.8">
                  <path d="M2 12c2-4 6-7 10-7s8 3 10 7c-2 4-6 7-10 7s-8-3-10-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </IconBtn>
          </div>
        </div>
      </div>

      {/* scopes panel */}
      <div style={{ ...panelStyle, marginTop: 32 }}>
        <PanelHead
          title="Required scopes"
          count={scopes.size}
          right={
            <>
              <ReadMore />
              <CopyAllBtn onClick={() => copy([...scopes].join("\n"))} />
            </>
          }
        />
        <div style={{ padding: "16px 20px" }}>
          {editing && (
            <div style={{ marginBottom: 24 }}>
              <ScopesCombobox allScopes={allScopes} selected={scopes} onChange={setScopes} />
            </div>
          )}
          <ScopeBullets items={allScopes.filter((s) => scopes.has(s))} />
        </div>
      </div>

      {/* urls panel — Authorization code flow only */}
      {app.flow === "Authorization code flow" && (
        <div style={{ ...panelStyle, marginTop: 32 }}>
          <PanelHead
            title={editing ? "Return URL (Max 5)" : "Return URLs (Max 5)"}
            right={<ReadMore />}
          />
          <div style={{ padding: "16px 20px" }}>
            {editing ? (
              <div className="flex flex-col" style={{ gap: 16 }}>
                {urls.map((u, i) => (
                  <div key={i} className="flex items-center" style={{ gap: 10 }}>
                    <input
                      value={u}
                      onChange={(e) => setUrl(i, e.target.value)}
                      placeholder="https://"
                      className={fieldCls()}
                      style={{ ...fieldStyle, width: 1034, padding: "0 8px 0 12px" }}
                    />
                    <IconBtn size={24} alt="Remove return URL" onClick={() => removeUrl(i)}>
                      <img src={urlDeleteUrl} alt="" width={24} height={24} className="block" />
                    </IconBtn>
                    {i === urls.length - 1 && urls.length < 5 && (
                      <IconBtn size={24} alt="Add return URL" onClick={addUrl}>
                        <img src={urlAddUrl} alt="" width={24} height={24} className="block" />
                      </IconBtn>
                    )}
                  </div>
                ))}
                {urls.length === 0 && (
                  <div className="flex items-center" style={{ gap: 10 }}>
                    <IconBtn size={24} alt="Add return URL" onClick={addUrl}>
                      <img src={urlAddUrl} alt="" width={24} height={24} className="block" />
                    </IconBtn>
                  </div>
                )}
              </div>
            ) : (
              <UrlBullets items={app.urls.filter((u) => u && u.trim() && u !== "https://")} />
            )}
          </div>
        </div>
      )}

      <div style={{ height: 32 }} />
    </div>
  );
}
