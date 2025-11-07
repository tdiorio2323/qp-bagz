import { useMemo, type CSSProperties } from "react";
import { Loader2, RefreshCcw } from "lucide-react";

import { isImageAsset } from "@/lib/designs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { useDesignAssets } from "@/hooks/useDesignAssets";

const watermarkOverlayStyle: CSSProperties = {
  pointerEvents: "none",
  position: "absolute",
  inset: 0,
  backgroundImage:
    "linear-gradient(45deg, rgba(255, 255, 255, 0.75) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.75) 75%), linear-gradient(45deg, rgba(0, 0, 0, 0.65) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.65) 75%)",
  backgroundSize: "40px 40px",
  backgroundPosition: "0 0, 20px 20px",
  opacity: 0.85,
  mixBlendMode: "overlay",
};

const logoWatermarkStyle: CSSProperties = {
  pointerEvents: "none",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  opacity: 0.85,
  zIndex: 10,
  filter: "drop-shadow(0 0 20px rgba(0, 0, 0, 0.5))",
};

const PremadeDesigns = () => {
  const { data, isPending, isError, error, refetch, isRefetching } = useDesignAssets();
  const { addItem } = useCart();

  const assets = useMemo(() => data ?? [], [data]);

  const assetCountLabel = useMemo(() => {
    if (isPending) {
      return "Loading designs…";
    }

    if (!assets.length) {
      return "No designs found";
    }

    return `${assets.length} design${assets.length === 1 ? "" : "s"} available`;
  }, [assets.length, isPending]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="px-6 pt-64 pb-12">
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
                  onClick={() => void refetch()}
                  disabled={isPending || isRefetching}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  {isPending || isRefetching ? (
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

          {isError ? (
            <Alert variant="destructive" className="mb-8">
              <AlertTitle>Unable to load designs</AlertTitle>
              <AlertDescription>
                {(error instanceof Error ? error.message : error) ??
                  "Unable to load designs. Double-check your Supabase credentials and bucket permissions."}
              </AlertDescription>
            </Alert>
          ) : null}

          {assets.length === 0 && !isPending ? (
            <div className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-md px-6 py-12 text-center text-white/70">
              No designs available yet. Upload assets to the Supabase bucket to populate this view.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {assets.map((asset) => {
                const isImage = isImageAsset(asset);

                const handleAddDesignToCart = () => {
                  addItem({
                    id: `premade-${asset.path}`,
                    name: asset.name,
                    price: 20,
                    quantity: 1,
                    image: asset.publicUrl ?? undefined,
                    metadata: {
                      Type: "Premade Design",
                    },
                  });
                };
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
                        </div>

                        {/* Preview lock - no external expansion */}
                      </div>

                      <Button
                        className="w-full bg-lightning-yellow text-white hover:bg-lightning-yellow/90 font-bold"
                        onClick={handleAddDesignToCart}
                      >
                        Add to Cart - $20
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {isPending ? (
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
