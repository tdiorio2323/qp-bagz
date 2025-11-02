export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-[hsl(60,100%,50%)] mb-4"></div>
        <p className="text-white/70 text-lg">Loading...</p>
      </div>
    </div>
  );
}
