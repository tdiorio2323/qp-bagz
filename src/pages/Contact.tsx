import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Page(){
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="mx-auto max-w-5xl p-8 pt-64 space-y-12">
        <h1 className="text-4xl font-bold">Contact</h1>
        <section className="prose prose-invert">Replace with real copy.</section>
      </div>
      <Footer />
    </div>
  );
}