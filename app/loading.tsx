// header height is 70px
export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-70px)] items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    </div>
  )
}
