"use client";

import type { ItemCondition, ItemDetailsInput, ItemType } from "@/lib/analysis";

const ITEM_TYPES: ItemType[] = [
  "Furniture",
  "Electronics",
  "Clothing",
  "Household",
  "Other",
];

const CONDITIONS: ItemCondition[] = [
  "Good",
  "Minor damage",
  "Damaged",
  "Unsure",
];

interface ItemDetailsProps {
  details: ItemDetailsInput;
  onChange: (details: ItemDetailsInput) => void;
}

function OptionPills<T extends string>({
  options,
  selected,
  onSelect,
  name,
}: {
  options: T[];
  selected: T | "";
  onSelect: (value: T) => void;
  name: string;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={name}>
      {options.map((option) => {
        const isSelected = selected === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(option)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              isSelected
                ? "border-loop-dark bg-loop-dark text-white"
                : "border-loop-border bg-loop-card text-loop-text hover:border-loop-secondary"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default function ItemDetails({ details, onChange }: ItemDetailsProps) {
  const update = (patch: Partial<ItemDetailsInput>) =>
    onChange({ ...details, ...patch });

  return (
    <div className="rounded-2xl border border-loop-border bg-loop-card p-6 sm:p-8">
      <h2 className="font-display text-xl text-loop-text">
        Tell us a little more
      </h2>
      <p className="mt-1 text-sm text-loop-muted">
        Optional — but the more context you give, the more useful the
        recommendation.
      </p>

      <div className="mt-6 space-y-6">
        <div>
          <span className="mb-2 block text-sm font-medium text-loop-text">
            Item type
          </span>
          <OptionPills
            name="Item type"
            options={ITEM_TYPES}
            selected={details.itemType}
            onSelect={(value) => update({ itemType: value })}
          />
        </div>

        <div>
          <span className="mb-2 block text-sm font-medium text-loop-text">
            Condition
          </span>
          <OptionPills
            name="Condition"
            options={CONDITIONS}
            selected={details.condition}
            onSelect={(value) => update({ condition: value })}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="item-age"
              className="mb-2 block text-sm font-medium text-loop-text"
            >
              Age <span className="font-normal text-loop-muted">(optional)</span>
            </label>
            <input
              id="item-age"
              type="text"
              inputMode="numeric"
              placeholder="e.g. 3 years"
              value={details.age}
              onChange={(event) => update({ age: event.target.value })}
              className="w-full rounded-xl border border-loop-border bg-loop-bg px-4 py-2.5 text-sm text-loop-text placeholder:text-loop-muted focus:border-loop-primary focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="item-material"
              className="mb-2 block text-sm font-medium text-loop-text"
            >
              Material{" "}
              <span className="font-normal text-loop-muted">(optional)</span>
            </label>
            <input
              id="item-material"
              type="text"
              placeholder="e.g. solid oak"
              value={details.material}
              onChange={(event) => update({ material: event.target.value })}
              className="w-full rounded-xl border border-loop-border bg-loop-bg px-4 py-2.5 text-sm text-loop-text placeholder:text-loop-muted focus:border-loop-primary focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="item-context"
            className="mb-2 block text-sm font-medium text-loop-text"
          >
            Context / intended use{" "}
            <span className="font-normal text-loop-muted">(optional)</span>
          </label>
          <textarea
            id="item-context"
            rows={3}
            placeholder="What is it, and what would you like to do with it?"
            value={details.context}
            onChange={(event) => update({ context: event.target.value })}
            className="w-full resize-none rounded-xl border border-loop-border bg-loop-bg px-4 py-2.5 text-sm text-loop-text placeholder:text-loop-muted focus:border-loop-primary focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
