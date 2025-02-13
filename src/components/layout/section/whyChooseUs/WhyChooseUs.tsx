// Định nghĩa kiểu cho từng feature
interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

// Định nghĩa kiểu cho props của WhyChooseUs
interface WhyChooseUsProps {
  title: string;
  subtitle: string;
  features: Feature[];
}

function WhyChooseUs({ title, subtitle, features }: WhyChooseUsProps) {
  return (
    <div className="container text-center my-5 whychooseus" style={{ height: "80vh" }}>
      <h2 className="fw-bold">
        {title} <span className="text-warning">Smart Kids</span>
      </h2>
      <p className="text-muted">{subtitle}</p>
      <div className="row g-4 mt-4">
        {features.map((feature) => (
          <div key={feature.id} className="col-12 col-md-6 mb-3 col-lg-4">
            <div className="card border-0 shadow h-100">
              <div className="card-body">
                <div className="icon mb-3" style={{ fontSize: "40px", color: "#0044cc" }}>
                  {feature.icon}
                </div>
                <h3 className="text-warning">{feature.description}</h3>
                <h5 className="card-title">{feature.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhyChooseUs;