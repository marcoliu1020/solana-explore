export const SuccessBadge = () => {
  return (
    <div className="inline-flex items-center rounded-md bg-green-950/50 px-2 py-1 text-xs font-medium text-green-500 ring-1 ring-green-500/20 ring-inset">
      SUCCESS
    </div>
  )
}

export const ErrorBadge = () => {
  return (
    <div className="inline-flex items-center rounded-md border border-red-500/50 bg-red-950/50 px-2 py-1 text-xs font-medium text-red-500">
      FAIL
    </div>
  )
}
