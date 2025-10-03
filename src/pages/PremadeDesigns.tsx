import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { listBagDesignObjects, buildBagDesignThumbnailPath, readableSize, bagDesignPrefix } from "@/lib/bagDesigns";

const ACCEPTED_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
const DESIGN_PRICE = 25;
const PAYMENT_URL = "https://cash.app/$reservetank/25";

const PremadeDesigns = () => {
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ["bag-designs"],
    queryFn: () => listBagDesignObjects(),
  });

  const designs = useMemo(() => {
    if (!data) return [];
    return data
      .filter((item) => item && item.name && !item.name.endsWith("/"))
      .filter((item) => {
        const extension = item.name.split(".").pop()?.toLowerCase();
        return extension ? ACCEPTED_EXTENSIONS.includes(extension) : false;
      })
      .map((item, index) => {
        const relativePath = item.name.replace(/^public\//, "");
        const size = item.metadata?.size ?? item.metadata?.contentLength;
        return {
          id: item.id ?? `${index}-${relativePath}`,
          title: `Design #${index + 1}`,
          path: item.name,
          thumbnailUrl: buildBagDesignThumbnailPath(item.name),
          sizeLabel: readableSize(size),
        };
      });
  }, [data]);

  const isEmpty = !isLoading && designs.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="px-6 pt-36 pb-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-white mb-2">Premade Designs</h1>
          <p className="text-lg text-center text-white/70 mb-10">4x5 Cannabis Label Designs</p>

          {isError && (
            <Alert variant="destructive" className="mb-8">
              <AlertTitle>Unable to load designs</AlertTitle>
              <AlertDescription>
                {error instanceof Error ? error.message : "An unexpected error occurred. Please try again."}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end mb-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => refetch()}
              disabled={isLoading || isRefetching}
              className="border-white/20 text-white hover:bg-white/10"
            >
              {isRefetching ? "Refreshing…" : "Refresh Gallery"}
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, index) => (
                <Card key={index} className="bg-black/40 border-white/10 backdrop-blur-md">
                  <Skeleton className="aspect-square w-full" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {designs.map((design) => (
                <Card
                  key={design.id}
                  className="group bg-black/40 backdrop-blur-md border-white/10 shadow-glow transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <CardHeader className="relative p-0">
                    <div className="aspect-square bg-white/5 flex items-center justify-center select-none">
                      <img
                        src={design.thumbnailUrl}
                        alt={design.title}
                        loading="lazy"
                        draggable={false}
                        onContextMenu={(event) => event.preventDefault()}
                        className="h-full w-full object-contain pointer-events-none select-none"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-xs uppercase tracking-wide text-white/80">
                      Preview Only
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow space-y-2">
                    <CardTitle className="text-lg font-semibold text-white">{design.title}</CardTitle>
                    <p className="text-xs text-white/60">Preview size: {design.sizeLabel}</p>
                  </CardContent>
                  <CardFooter className="p-4 flex flex-col gap-3">
                    <div className="flex w-full items-center justify-between">
                      <p className="text-xl font-bold text-lightning-yellow">${DESIGN_PRICE.toFixed(2)}</p>
                      <Button asChild className="!bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)] font-bold">
                        <a href={PAYMENT_URL} target="_blank" rel="noopener noreferrer">
                          Buy Now
                        </a>
                      </Button>
                    </div>
                    {import.meta.env.DEV && (
                      <Button asChild size="sm" variant="outline" className="w-full text-xs">
                        <a href={design.thumbnailUrl} target="_blank" rel="noopener noreferrer">
                          Debug preview link
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {isEmpty && (
            <Alert className="mt-10 border-white/20 bg-white/10 text-white">
              <AlertTitle>No designs available yet</AlertTitle>
              <AlertDescription>
                Upload artwork to the <code className="px-1 bg-black/30 rounded">bag-designs/{bagDesignPrefix || '(root)'}</code> folder and refresh.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PremadeDesigns;
