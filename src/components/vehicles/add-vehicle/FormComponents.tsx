import type { ReactNode } from "react";

type FieldProps = {
  label: ReactNode;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  type?: string;
  className?: string;
};

export function Field({
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  type = "text",
  className = "",
}: FieldProps) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-md border px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
            : "border-slate-300 focus:border-[#002766] focus:ring-2 focus:ring-[#002766]/10"
        }`}
      />

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

type SectionHeaderProps = {
  icon: ReactNode;
  title: string;
};

export function SectionHeader({ icon, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#002766]/10 text-[#002766]">
        {icon}
      </div>

      <h3 className="text-md font-bold text-primary">{title}</h3>
    </div>
  );
}

export function SectionDivider() {
  return <div className="my-6 border-t border-dashed border-primary" />;
}
