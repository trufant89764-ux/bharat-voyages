import { Compass, Mountain, Waves, Camera, Tent, Utensils } from "lucide-react";

const experiences = [
  { icon: Compass, title: "Heritage Walks", desc: "Guided walks through ancient forts and palaces", color: "text-primary" },
  { icon: Mountain, title: "Trekking", desc: "Himalayan trails from easy walks to challenging climbs", color: "text-secondary" },
  { icon: Waves, title: "Water Sports", desc: "Scuba diving, surfing, and kayaking adventures", color: "text-primary" },
  { icon: Camera, title: "Photography Tours", desc: "Capture India's stunning landscapes with experts", color: "text-accent" },
  { icon: Tent, title: "Camping", desc: "Glamping under the stars in scenic locations", color: "text-secondary" },
  { icon: Utensils, title: "Culinary Trails", desc: "Street food tours and traditional cooking classes", color: "text-primary" },
];

const ExperiencesSection = () => (
  <section className="section-padding bg-background">
    <div className="container-custom">
      <div className="text-center mb-12">
        <p className="font-body text-primary text-sm tracking-[0.2em] uppercase mb-2">What Awaits</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
          Experiences
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp) => (
          <div
            key={exp.title}
            className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${exp.color}`}>
              <exp.icon size={24} />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">{exp.title}</h3>
            <p className="text-muted-foreground text-sm">{exp.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ExperiencesSection;
