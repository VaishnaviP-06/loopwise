export default function Footer() {
  return (
    <footer className="border-t border-loop-border bg-loop-bg px-6 py-10 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs text-loop-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-loop-text">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-loop-dark text-[13px] leading-none text-white">
            ↻
          </span>
          <span className="font-medium">LoopWise</span>
          <span className="text-loop-muted">· AI-powered circular resource advisor</span>
        </div>

        <p>SDG 12 · Responsible Consumption and Production</p>
      </div>
    </footer>
  );
}
