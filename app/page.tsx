"use client";

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImage(file);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F8F3] text-[#28352A]">
      {/* Navbar */}
      <nav className="border-b border-[#DDE3D8] bg-white/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6B705C] text-xl text-white">
              ↻
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">LoopWise</h1>
              <p className="text-xs text-gray-500">
                Smarter decisions. Longer product lives.
              </p>
            </div>
          </div>

          <button className="rounded-lg border border-[#CBD4C7] px-4 py-2 text-sm font-medium transition hover:bg-[#F1F3EC]">
            How it works
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-20">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex rounded-full bg-[#E5E9DF] px-4 py-2 text-sm font-medium text-[#56604B]">
            ♻ Circular Resource Advisor
          </div>

          <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Before you replace it,
            <br />
            <span className="text-[#6B705C]">give it another life.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            LoopWise uses AI to help you decide whether an existing item can
            be repaired, reused, repurposed, donated, or recycled.
          </p>
        </div>

        {/* Analyzer Card */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-[#DDE3D8] bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-semibold">Analyze an item</h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload a photo and add a few optional details.
              </p>
            </div>

            {/* Upload */}
            <label className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#CBD4C7] bg-[#FAFBF8] px-6 text-center transition hover:border-[#6B705C] hover:bg-[#F5F7F1]">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E5E9DF] text-2xl">
                📷
              </div>

              {image ? (
                <>
                  <p className="font-medium text-[#28352A]">{image.name}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Image selected successfully
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium text-[#28352A]">
                    Upload an item photo
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    PNG, JPG or WEBP
                  </p>
                </>
              )}
            </label>

            {/* Details */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Item type
                </label>
                <select className="w-full rounded-lg border border-[#CBD4C7] bg-white px-4 py-3 text-sm outline-none focus:border-[#6B705C]">
                  <option>Select category</option>
                  <option>Furniture</option>
                  <option>Electronics</option>
                  <option>Clothing</option>
                  <option>Household item</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Approximate age
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5 years"
                  className="w-full rounded-lg border border-[#CBD4C7] bg-white px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-[#6B705C]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Condition
                </label>
                <select className="w-full rounded-lg border border-[#CBD4C7] bg-white px-4 py-3 text-sm outline-none focus:border-[#6B705C]">
                  <option>Select condition</option>
                  <option>Good</option>
                  <option>Minor damage</option>
                  <option>Damaged</option>
                  <option>Not working</option>
                  <option>Unknown</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Material
                </label>
                <input
                  type="text"
                  placeholder="e.g. wood, metal"
                  className="w-full rounded-lg border border-[#CBD4C7] bg-white px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-[#6B705C]"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium">
                Where is it used?
              </label>

              <input
                type="text"
                placeholder="e.g. college classroom, home, office"
                className="w-full rounded-lg border border-[#CBD4C7] bg-white px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-[#6B705C]"
              />
            </div>

            <button
              disabled={!image}
              className="mt-6 w-full rounded-lg bg-[#6B705C] px-5 py-3.5 font-medium text-white transition hover:bg-[#59604D] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Analyze with AI
            </button>
          </div>

          {/* How it works */}
          <div className="rounded-2xl border border-[#DDE3D8] bg-[#EEF1E9] p-6">
            <h3 className="text-xl font-semibold">How LoopWise works</h3>

            <div className="mt-8 space-y-7">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-semibold text-[#6B705C]">
                  1
                </div>

                <div>
                  <h4 className="font-semibold">Upload</h4>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Share a photo of the item you are considering replacing
                    or discarding.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-semibold text-[#6B705C]">
                  2
                </div>

                <div>
                  <h4 className="font-semibold">AI evaluates options</h4>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    AI considers the visible condition and your optional
                    context to identify possible second-life pathways.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-semibold text-[#6B705C]">
                  3
                </div>

                <div>
                  <h4 className="font-semibold">Get a recommendation</h4>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    See whether repair, reuse, repurpose, donation, or
                    recycling may be suitable.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-xl border border-[#D8DED1] bg-white p-4">
              <p className="text-sm font-medium">♻ Built around SDG 12</p>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Responsible Consumption and Production
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#DDE3D8] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>LoopWise • AI for circular resource decisions</p>
          <p>AI recommendations are decision support, not professional inspection.</p>
        </div>
      </footer>
    </main>
  );
}