import SiteImage from './SiteImage';

export default function Services({ servicesSection, services }) {

  return (
    <section className="services" id="services">
      <div className="section-eyebrow">{servicesSection.eyebrow}</div>
      <div className="section-title">{servicesSection.title} <span>{servicesSection.titleAccent}</span></div>
      <p className="section-intro">{servicesSection.intro}</p>

      <div className="service-grid">
        {services.map((service) => (
          <div className="service-card" key={service.title}>
            <SiteImage src={service.image} alt={service.alt} className="service-img" fallback={service.fallback} />
            <div className="service-body">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <a href={servicesSection.linkHref} className="service-link">{servicesSection.linkLabel}</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
