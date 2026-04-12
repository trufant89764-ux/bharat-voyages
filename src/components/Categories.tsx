import { Link } from "react-router-dom";
import { categories } from "@/data/destinations";

const Categories = () => (
  <section className="section-padding bg-card">
    <div className="container-custom">
      <div className="text-center mb-12">
        <p className="font-body text-primary text-sm tracking-[0.2em] uppercase mb-2">Browse By</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
          Travel Categories
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/destinations?category=${cat.name}`}
            className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
              {cat.icon}
            </span>
            <span className="font-body text-sm font-medium text-foreground">{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default Categories;
