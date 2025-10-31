import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { ExternalLink, Loader2, RefreshCcw } from "lucide-react";

import { fetchDesignAssets, isImageAsset, formatFileSize, type DesignAsset } from "@/lib/designs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const watermarkOverlayStyle: CSSProperties = {
  pointerEvents: "none",
  position: "absolute",
  inset: 0,
  backgroundImage:
    "linear-gradient(45deg, rgba(255, 255, 255, 0.6) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.6) 75%), linear-gradient(45deg, rgba(0, 0, 0, 0.4) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.4) 75%)",
  backgroundSize: "40px 40px",
  backgroundPosition: "0 0, 20px 20px",
  opacity: 0.7,
  mixBlendMode: "overlay",
};

const logoWatermarkStyle: CSSProperties = {
  pointerEvents: "none",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  opacity: 0.5,
  zIndex: 10,
  filter: "drop-shadow(0 0 20px rgba(0, 0, 0, 0.5))",
};

const PremadeDesigns = () => {
  const [assets, setAssets] = useState<DesignAsset[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadAssets = useCallback(async () => {
    console.log("loadAssets called");
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchDesignAssets();
      console.log("Received data:", data);

      const sorted = data.sort((a, b) => {
        const left = a.updatedAt ?? a.createdAt ?? "";
        const right = b.updatedAt ?? b.createdAt ?? "";

        if (!left && !right) {
          return a.name.localeCompare(b.name);
        }

        return new Date(right).getTime() - new Date(left).getTime();
      });

      setAssets(sorted);
    } catch (err) {
      console.error("Failed to load designs", err);
      const errorMsg = err instanceof Error ? err.message : "Unable to load designs from Supabase.";
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAssets();
  }, [loadAssets]);

  const assetCountLabel = useMemo(() => {
    if (isLoading) {
      return "Loading designs…";
    }

    if (!assets.length) {
      return "No designs found";
    }

    return `${assets.length} design${assets.length === 1 ? "" : "s"} available`;
  }, [assets.length, isLoading]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="px-6 pt-36 pb-12">
        <div className="max-w-7xl mx-auto">
          <header className="mb-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Premade Designs</h1>
                <p className="text-lg text-white/70">
                  Browse our collection of professional 4x5 cannabis label designs
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-white/60">{assetCountLabel}</span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => void loadAssets()}
                  disabled={isLoading}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Refreshing
                    </>
                  ) : (
                    <>
                      <RefreshCcw className="mr-2 h-4 w-4" />
                      Refresh
                    </>
                  )}
                </Button>
              </div>
            </div>
          </header>

          {error ? (
            <Alert variant="destructive" className="mb-8">
              <AlertTitle>Unable to load designs</AlertTitle>
              <AlertDescription>
                {error} — double-check your Supabase credentials and bucket permissions.
              </AlertDescription>
            </Alert>
          ) : null}

          {assets.length === 0 && !isLoading ? (
            <div className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-md px-6 py-12 text-center text-white/70">
              No designs available yet. Upload assets to the Supabase bucket to populate this view.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {assets.map((asset) => {
                const isImage = isImageAsset(asset);
                return (
                  <article
                    key={asset.path}
                    className="group overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md shadow-glow transition-all duration-300 hover:border-white/20 hover:shadow-premium"
                  >
                    <div className="relative bg-white/5">
                      {isImage && asset.publicUrl ? (
                        <div className="relative aspect-[4/5]">
                          <img
                            src={asset.publicUrl}
                            alt={asset.name}
                            className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.02]"
                            loading="lazy"
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                          />
                          <div style={watermarkOverlayStyle} aria-hidden="true" />
                          <img
                            src="/quickprintz_assets/quickprintz-512.png"
                            alt="Quick Printz Watermark"
                            style={logoWatermarkStyle}
                            aria-hidden="true"
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                          />
                        </div>
                      ) : (
                        <div className="flex h-48 w-full items-center justify-center text-sm text-white/50">
                          Preview unavailable
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col gap-3 border-t border-white/10 p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h2 className="text-base font-semibold text-white leading-tight truncate">
                            {asset.name}
                          </h2>
                          <p className="text-xs text-white/50 mt-1">
                            {formatFileSize(asset.size)}
                          </p>
                        </div>

                        {asset.publicUrl ? (
                          <Button
                            size="sm"
                            asChild
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white/10 flex-shrink-0"
                          >
                            <a href={asset.publicUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        ) : null}
                      </div>

                      <Button
                        className="w-full bg-lightning-yellow text-black hover:bg-lightning-yellow/90 font-bold"
                      >
                        Purchase Design - $25
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {isLoading ? (
            <div className="mt-12 flex items-center justify-center gap-3 text-white/60">
              <Loader2 className="h-5 w-5 animate-spin" />
              Fetching latest designs…
            </div>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PremadeDesigns;
