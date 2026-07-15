import { resolveBlockTitle } from "@/types";
import type { BlockComponentProps } from "../ReportRenderer";

function OrderList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h3 className="font-semibold" style={{ color: "var(--heading)", fontFamily: "var(--font-heading)" }}>
        {title}
      </h3>
      <ul className="mt-2 space-y-2 text-sm" style={{ color: "var(--body-text)" }}>
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span style={{ color: "var(--accent)" }}>—</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function OrdersBlock({ reportData, settings }: BlockComponentProps) {
  const title = resolveBlockTitle("orders", settings);

  return (
    <section>
      <h2 className="font-semibold text-xl" style={{ color: "var(--accent)", fontFamily: "var(--font-heading)" }}>
        {title}
      </h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-3">
        <OrderList title="Labs" items={reportData.orders.labs} />
        <OrderList title="Referrals" items={reportData.orders.referrals} />
        <OrderList title="Imaging" items={reportData.orders.imaging} />
      </div>
    </section>
  );
}
