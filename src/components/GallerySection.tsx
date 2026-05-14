import { destinations } from "@/data/destinations";
import SafeImage from "./SafeImage";

const galleryItems = destinations.slice(0, 8);

const GallerySection = () => (
  <section className="section-padding bg-card">
    <div className="container-custom">
      <div className="text-center mb-12">
        <p className="font-body text-primary text-sm tracking-[0.2em] uppercase mb-2">Visual Stories</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">Gallery</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {galleryItems.map((dest, i) => (
          <div
            key={dest.id}
            className={`relative group overflow-hidden rounded-xl cursor-pointer ${
              i === 0 || i === 5 ? "md:col-span-2 md:row-span-2" : ""
            }`}
          >
            <SafeImage
              src={dest.image}
              alt={dest.title}
              loading="lazy"
              className="w-full h-full min-h-[180px] object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-end p-4">
              <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="font-display text-white font-semibold text-lg">{dest.title}</h3>
                <p className="text-white/70 text-xs">{dest.state}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default GallerySection;
