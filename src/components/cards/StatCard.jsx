export function StatCard({ icon, label, value, isLoading }) {
  return (
    <div className="bg-white rounded-2xl card card-border bg-base shadow-sm p-5">
      <div className="flex items-start gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-400">
          {icon}
        </span>

        <div className="min-w-0">
          <p className="text-sm text-gray-400">{label}</p>

          {isLoading ? (
            <Skeleton className="mt-2 h-4 w-36" />
          ) : (
            <p className="mt-1 font-medium text-gray-500">{value ?? "—"}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Skeleton({ className = "" }) {
  return (
    <span
      className={`block animate-pulse rounded bg-gray-800 ${className}`}
      aria-hidden="true"
    />
  );
}
