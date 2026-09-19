type CostSummaryProps = {
  partsTotal: number;
};

export function CostSummary({ partsTotal }: CostSummaryProps) {
  const formattedTotal = partsTotal.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
  });

  return (
    <section className="rounded-xl bg-slate-50 p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">Parts Total</span>

        <span className="font-semibold text-slate-800">₱{formattedTotal}</span>
      </div>

      {/* <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-slate-500">Labor / Service Fee</span>

        <span className="font-semibold text-slate-800">₱0.00</span>
      </div> */}

      <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
        <span className="font-semibold text-slate-900">Total</span>

        <span className="text-lg font-bold text-[#002766]">
          ₱{formattedTotal}
        </span>
      </div>
    </section>
  );
}
