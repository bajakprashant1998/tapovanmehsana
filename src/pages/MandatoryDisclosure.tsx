import { AnimatedSection } from "@/components/AnimatedSection";

const disclosureData = [
  {
    category: "General Information",
    items: [
      { label: "Name of School", value: "Tapovan International School" },
      { label: "Affiliation No.", value: "430XXX (CBSE)" },
      { label: "School Code", value: "XXXXX" },
      { label: "Year of Establishment", value: "2001" },
      { label: "Address", value: "Ahmedabad–Mehsana Highway, Gujarat, India" },
      { label: "Phone", value: "+91 98765 43210" },
      { label: "Email", value: "info@tapovanschool.net" },
      { label: "Website", value: "www.tapovanschool.net" },
    ],
  },
  {
    category: "School Infrastructure",
    items: [
      { label: "Total Area of School (in sq. mtrs.)", value: "50,000 sq. mtrs." },
      { label: "Total Built-Up Area", value: "25,000 sq. mtrs." },
      { label: "No. of Classrooms", value: "60+" },
      { label: "Size of Classrooms", value: "600 sq. ft. (approx.)" },
      { label: "Science Labs", value: "Physics, Chemistry, Biology — 3 labs" },
      { label: "Computer Labs", value: "2 (50 computers each)" },
      { label: "Library", value: "15,000+ books, digital resources" },
      { label: "Auditorium", value: "1 (capacity 1,000)" },
      { label: "Sports Facilities", value: "Cricket, Football, Basketball, Badminton, Swimming Pool" },
    ],
  },
  {
    category: "Staff Details",
    items: [
      { label: "Principal", value: "Qualified as per CBSE norms" },
      { label: "Total Teaching Staff", value: "80+" },
      { label: "PGT (Post Graduate Teachers)", value: "25" },
      { label: "TGT (Trained Graduate Teachers)", value: "30" },
      { label: "PRT (Primary Teachers)", value: "25" },
      { label: "Non-Teaching Staff", value: "40+" },
      { label: "Counselor", value: "1 (Full-time)" },
    ],
  },
  {
    category: "Academic Details",
    items: [
      { label: "Board of Affiliation", value: "CBSE, New Delhi" },
      { label: "Medium of Instruction", value: "English" },
      { label: "Classes", value: "Pre-Primary to Class XII" },
      { label: "Streams (Sr. Secondary)", value: "Science, Commerce, Humanities" },
      { label: "School Timings", value: "8:00 AM – 3:30 PM" },
      { label: "Student-Teacher Ratio", value: "25:1" },
    ],
  },
  {
    category: "Fee Structure (Annual)",
    items: [
      { label: "Pre-Primary (Nursery – KG)", value: "As per school norms" },
      { label: "Primary (Class I – V)", value: "As per school norms" },
      { label: "Middle (Class VI – VIII)", value: "As per school norms" },
      { label: "Secondary (Class IX – X)", value: "As per school norms" },
      { label: "Senior Secondary (Class XI – XII)", value: "As per school norms" },
      { label: "Hostel Fee", value: "As per school norms" },
    ],
  },
  {
    category: "Safety & Compliance",
    items: [
      { label: "Fire Safety Certificate", value: "Valid" },
      { label: "Building Safety Certificate", value: "Valid" },
      { label: "Water & Sanitation Certificate", value: "Valid" },
      { label: "CCTV Surveillance", value: "Entire campus covered" },
      { label: "Medical Facility", value: "Full-time nurse, tie-up with nearby hospital" },
      { label: "Transport", value: "GPS-enabled fleet covering major routes" },
    ],
  },
];

const MandatoryDisclosure = () => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-navy text-white section-padding">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-4">
              Mandatory Disclosure
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              As per CBSE guidelines, the following information is disclosed for public reference.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Disclosure Tables */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          {disclosureData.map((section, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="mb-10">
                <h2 className="font-display text-2xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {i + 1}
                  </span>
                  {section.category}
                </h2>
                <div className="rounded-xl border border-border overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {section.items.map((item, j) => (
                        <tr
                          key={j}
                          className={j % 2 === 0 ? "bg-card" : "bg-muted/50"}
                        >
                          <td className="px-5 py-3.5 text-sm font-medium text-foreground w-1/2 border-r border-border">
                            {item.label}
                          </td>
                          <td className="px-5 py-3.5 text-sm text-muted-foreground">
                            {item.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </AnimatedSection>
          ))}

          <AnimatedSection>
            <div className="bg-muted rounded-xl p-6 text-center">
              <p className="text-sm text-muted-foreground">
                This information is updated annually as per CBSE norms. For any queries, please{" "}
                <a href="/contact" className="text-primary hover:underline font-medium">
                  contact the school office
                </a>.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default MandatoryDisclosure;
