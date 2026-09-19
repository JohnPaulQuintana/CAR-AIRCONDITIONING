import { useState } from "react";
import { Plus, Trash2, Wrench } from "lucide-react";

import type { VehicleFormApi } from "../../../features/vehicle/vehicle.form";

import { SectionDivider, SectionHeader } from "./FormComponents";
import { DeleteConfirmation } from "../confirmation/DeleteConfirmation";

type PartsSectionProps = {
  form: VehicleFormApi;
  serviceIndex: number;
  onAdd: () => void;
  onRemove: (index: number) => void;
};

export function PartsSection({
  form,
  serviceIndex,
  onAdd,
  onRemove,
}: PartsSectionProps) {
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  return (
    <>
      <section>
        <div className="flex items-center justify-between">
          <SectionHeader
            icon={<Wrench className="h-4 w-4" />}
            title="Parts Replaced"
          />

          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#002766]/20 px-3 py-1.5 text-xs font-semibold text-[#002766] transition hover:bg-[#002766]/5"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Part
          </button>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
          <div className="divide-y divide-slate-100">
            <form.Field name={`services[${serviceIndex}].parts`} mode="array">
              {(field) => (
                <>
                  {field.state.value.map((part, index) => (
                    <div key={part.id} className="space-y-4 px-3 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            Part
                          </p>

                          <p className="mt-0.5 text-xs font-medium text-slate-400">
                            PT-{part.id.slice(0, 12).toUpperCase()}
                          </p>
                        </div>

                        <button
                          type="button"
                          // onClick={() => onRemove(index)}
                          onClick={() => setDeleteIndex(index)}
                          disabled={field.state.value.length === 1}
                          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-500 transition bg-red-50 hover:bg-red-100 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
                          aria-label="Remove part"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>

                      {/* Part Description */}
                      <form.Field
                        name={`services[${serviceIndex}].parts[${index}].name`}
                      >
                        {(nameField) => (
                          <div>
                            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                              Part Description
                            </label>

                            <textarea
                              value={nameField.state.value}
                              onChange={(event) =>
                                nameField.handleChange(event.target.value)
                              }
                              onBlur={nameField.handleBlur}
                              placeholder="e.g. Cabin Filter"
                              rows={2}
                              aria-invalid={
                                nameField.state.meta.isTouched &&
                                nameField.state.meta.errors.length > 0
                              }
                              className={`w-full resize-none rounded-lg border px-2.5 py-2 text-xs outline-none focus:ring-2 ${
                                nameField.state.meta.isTouched &&
                                nameField.state.meta.errors.length > 0
                                  ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                                  : "border-slate-300 focus:border-[#002766] focus:ring-[#002766]/10"
                              }`}
                            />

                            {nameField.state.meta.isTouched &&
                              nameField.state.meta.errors[0]?.message && (
                                <p className="mt-1 text-xs text-red-600">
                                  {nameField.state.meta.errors[0].message}
                                </p>
                              )}
                          </div>
                        )}
                      </form.Field>

                      {/* Quantity / Price */}
                      <div className="grid grid-cols-2 gap-3">
                        {/* Quantity */}
                        <form.Field
                          name={`services[${serviceIndex}].parts[${index}].quantity`}
                        >
                          {(quantityField) => (
                            <div>
                              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                Quantity
                              </label>

                              <input
                                type="number"
                                min="1"
                                value={quantityField.state.value}
                                onChange={(event) =>
                                  quantityField.handleChange(
                                    Number(event.target.value),
                                  )
                                }
                                onBlur={quantityField.handleBlur}
                                aria-invalid={
                                  quantityField.state.meta.isTouched &&
                                  quantityField.state.meta.errors.length > 0
                                }
                                className={`w-full rounded-lg border px-2.5 py-2 text-xs outline-none focus:ring-2 ${
                                  quantityField.state.meta.isTouched &&
                                  quantityField.state.meta.errors.length > 0
                                    ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                                    : "border-slate-300 focus:border-[#002766] focus:ring-[#002766]/10"
                                }`}
                              />

                              {quantityField.state.meta.isTouched &&
                                quantityField.state.meta.errors[0]?.message && (
                                  <p className="mt-1 text-xs text-red-600">
                                    {quantityField.state.meta.errors[0].message}
                                  </p>
                                )}
                            </div>
                          )}
                        </form.Field>

                        {/* Unit Price */}
                        <form.Field
                          name={`services[${serviceIndex}].parts[${index}].price`}
                        >
                          {(priceField) => (
                            <div>
                              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                Unit Price{" "}
                                <span className="font-normal text-slate-400">
                                  (optional)
                                </span>
                              </label>

                              <input
                                type="number"
                                min="0"
                                step="1"
                                value={priceField.state.value ?? ""}
                                onChange={(event) =>
                                  priceField.handleChange(
                                    event.target.value === ""
                                      ? undefined
                                      : Number(event.target.value),
                                  )
                                }
                                onBlur={priceField.handleBlur}
                                aria-invalid={
                                  priceField.state.meta.isTouched &&
                                  priceField.state.meta.errors.length > 0
                                }
                                className={`w-full rounded-lg border px-2.5 py-2 text-xs outline-none focus:ring-2 ${
                                  priceField.state.meta.isTouched &&
                                  priceField.state.meta.errors.length > 0
                                    ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                                    : "border-slate-300 focus:border-[#002766] focus:ring-[#002766]/10"
                                }`}
                              />

                              {priceField.state.meta.isTouched &&
                                priceField.state.meta.errors[0]?.message && (
                                  <p className="mt-1 text-xs text-red-600">
                                    {priceField.state.meta.errors[0].message}
                                  </p>
                                )}
                            </div>
                          )}
                        </form.Field>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </form.Field>
          </div>
        </div>
      </section>

      <SectionDivider />

      <DeleteConfirmation
        open={deleteIndex !== null}
        onCancel={() => setDeleteIndex(null)}
        onConfirm={() => {
          if (deleteIndex !== null) {
            onRemove(deleteIndex);
            setDeleteIndex(null);
          }
        }}
      />
    </>
  );
}
