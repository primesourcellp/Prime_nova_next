/**
 * Company portfolio content.
 * Pages render from this list. Add a project here to show it on /portfolio.
 */

export const portfolioCategories = [
  "All",
  "Web Applications",
  "Website",
  "Mobile Applications",
  "CRM & ERP",
  "SaaS Products",
  "E-Commerce",
  "Business Solutions",
  "UI/UX",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];
export type ProjectCategory = Exclude<PortfolioCategory, "All">;
export type ProjectStatus = "Completed" | "Ongoing";
export type ProjectTone = "teal" | "mint" | "sand" | "slate";
export type ProjectVisualKind =
  | "crm"
  | "mobile"
  | "dashboard"
  | "commerce"
  | "workflow"
  | "design";

export type FeatureIcon =
  | "users"
  | "chart"
  | "shield"
  | "flow"
  | "layers"
  | "search";

export type StackGroupName =
  | "Frontend"
  | "Backend"
  | "Database"
  | "APIs / Integrations"
  | "Cloud / Deployment"
  | "Other Tools";

export type PortfolioProject = {
  id: string;
  projectName: string;
  slug: string;
  category: ProjectCategory;
  /** Extra filters. Stayeasy appears under both mobile and web. */
  categories?: ProjectCategory[];
  industry: string;
  clientName: string;
  year: string;
  duration: string;
  status: ProjectStatus;
  shortDescription: string;
  description: string;
  /** Who the product is for. Omitted on the page when empty. */
  audience?: string;
  /** Stated aims of the work. Omitted on the page when empty. */
  objectives?: string[];
  challenge: string;
  solution: string;
  features: { title: string; description: string; icon: FeatureIcon }[];
  technologies: string[];
  /** Known groups only. Empty groups stay off the page. */
  stack?: { group: StackGroupName; items: string[] }[];
  /** Public image paths. Empty until real screenshots are added under /public. */
  images: string[];
  /** Phone screen recording. Shown in a mobile frame on the card and case study. */
  video?: string;
  projectUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  visual: ProjectVisualKind;
  tone: ProjectTone;
  results: string[];
};

export const portfolioStats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "20+", label: "Happy Clients" },
  { value: "10+", label: "Industries Served" },
  { value: "5+", label: "Years of Experience" },
];

export const portfolioTechnologies = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Django",
  "FastAPI",
  "Spring Boot",
  "Node.js",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "AWS",
  "Azure",
];

export const portfolioIndustries = [
  "Healthcare",
  "Finance",
  "Education",
  "Recruitment",
  "Retail",
  "Manufacturing",
  "Logistics",
  "Real Estate",
  "Technology",
];

export const portfolioHero = {
  kicker: "Portfolio",
  heading: "Our Portfolio",
  subtitle:
    "Explore the digital solutions and innovative products we've built for businesses across different industries.",
  primary: { label: "View Projects", href: "#projects" },
  secondary: { label: "Contact Us", href: "#contact" },
};

export const portfolioCta = {
  title: "Have a project in mind?",
  body: "Let's turn your idea into a powerful digital solution.",
  primary: { label: "Start a Project", href: "/#demo" },
  secondary: { label: "Contact Us", href: "#contact" },
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "salesflow-crm",
    projectName: "SalesFlow CRM",
    slug: "salesflow-crm",
    category: "CRM & ERP",
    industry: "Business / Sales",
    clientName: "",
    year: "",
    duration: "",
    status: "Completed",
    shortDescription:
      "Multi-tenant CRM platform designed to manage customers, leads, sales activities, users, and business operations.",
    description:
      "SalesFlow CRM is a multi-tenant CRM for customers, leads, sales activities, users, and day-to-day business operations. Each tenant keeps its own pipeline and its own people.",
    audience:
      "Sales teams that manage customers, leads, users, and operations, with a separate workspace for each company.",
    objectives: [
      "Keep customers and leads on one record.",
      "Keep sales activities with the customer they belong to.",
      "Give each tenant its own users and pipeline.",
    ],
    challenge:
      "Leads, customers, and sales activity were split across inboxes and spreadsheets, so the team could not see one picture of the business.",
    solution:
      "SalesFlow CRM puts customers, leads, sales activities, users, and operations in one multi-tenant CRM. Each company works in its own workspace.",
    features: [
      {
        title: "Customers and leads",
        description: "Accounts and leads live on one record the sales team can open.",
        icon: "users",
      },
      {
        title: "Sales activities",
        description: "Calls, notes, and follow-ups stay on the customer they belong to.",
        icon: "flow",
      },
      {
        title: "Users and access",
        description: "People in the business see the CRM according to their role.",
        icon: "shield",
      },
      {
        title: "Multi-tenant operations",
        description: "Each tenant runs its own customers, users, and pipeline.",
        icon: "layers",
      },
    ],
    technologies: ["React", "TypeScript", "FastAPI", "PostgreSQL"],
    stack: [
      { group: "Frontend", items: ["React", "TypeScript"] },
      { group: "Backend", items: ["FastAPI"] },
      { group: "Database", items: ["PostgreSQL"] },
    ],
    images: [],
    featured: true,
    visual: "crm",
    tone: "sand",
    results: [
      "Customers, leads, and sales activity sit in one CRM.",
      "Users work inside their own tenant.",
      "Business operations are tracked in SalesFlow rather than side spreadsheets.",
    ],
  },
  {
    id: "talentprime",
    projectName: "TalentPrime",
    slug: "talentprime",
    category: "SaaS Products",
    industry: "Recruitment",
    clientName: "",
    year: "",
    duration: "",
    status: "Completed",
    shortDescription:
      "Applicant tracking system for roles, candidates, and every stage of a hire.",
    description:
      "TalentPrime is an ATS. Recruiting teams use it to track applicants against open roles, from the first application through the hiring decision.",
    audience: "Recruiting teams tracking applicants against open roles.",
    objectives: [
      "Track applicants on the role they applied for.",
      "Show the stage of each candidate.",
      "Keep the hiring decision on the record.",
    ],
    challenge:
      "Applicants, roles, and decisions get split across inboxes and spreadsheets, so nobody can see where a hire actually stands.",
    solution:
      "TalentPrime is the applicant tracking system for that work. Roles, candidates, and stages live in one product the hiring team can run.",
    features: [
      {
        title: "Open roles",
        description: "Each job has a place to track who has applied and where they are.",
        icon: "layers",
      },
      {
        title: "Applicant records",
        description: "Candidates stay attached to the role they applied for.",
        icon: "users",
      },
      {
        title: "Hiring stages",
        description: "The ATS shows the stage of each applicant.",
        icon: "flow",
      },
      {
        title: "Hiring decisions",
        description: "The outcome of a candidate stays on the record.",
        icon: "chart",
      },
    ],
    technologies: [],
    images: [],
    featured: true,
    visual: "crm",
    tone: "teal",
    results: [
      "Applicants are tracked on the role, not in a private inbox.",
      "The hiring team can see the stage of each candidate.",
      "TalentPrime is the ATS for structured hiring.",
    ],
  },
  {
    id: "trackprime",
    projectName: "TrackPrime",
    slug: "trackprime",
    category: "SaaS Products",
    industry: "Timesheets",
    clientName: "",
    year: "",
    duration: "",
    status: "Completed",
    shortDescription:
      "Timesheet software for recording time against the work it belongs to.",
    description:
      "TrackPrime is a timesheet product. People enter the time they spend, and that time stays on a sheet the team can use.",
    audience: "Teams that record time against the work it belongs to.",
    objectives: [
      "Record hours where the work happened.",
      "Keep a period of work on one sheet.",
      "Look up hours in one place.",
    ],
    challenge:
      "Time gets written down later, in different places, so a week of work is hard to reconstruct.",
    solution:
      "TrackPrime is the timesheet. Time is recorded against the work, and the sheet is the record.",
    features: [
      {
        title: "Time entry",
        description: "Hours are entered where the work happened.",
        icon: "flow",
      },
      {
        title: "Timesheets",
        description: "A period of work is one sheet, not a pile of notes.",
        icon: "layers",
      },
      {
        title: "Work records",
        description: "Time stays attached to the job it was spent on.",
        icon: "chart",
      },
    ],
    technologies: [],
    images: [],
    featured: true,
    visual: "workflow",
    tone: "mint",
    results: [
      "Time is recorded in a timesheet instead of a side document.",
      "Each entry stays with the work it belongs to.",
      "The team has one place to look up hours.",
    ],
  },
  {
    id: "billing",
    projectName: "Billing",
    slug: "billing",
    category: "Business Solutions",
    industry: "Billing",
    clientName: "",
    year: "",
    duration: "",
    status: "Completed",
    shortDescription:
      "Billing software for charges, invoices, and what has already been billed.",
    description:
      "Billing is billing software. It is the system for charges and invoices, so billing is not assembled in a separate spreadsheet.",
    audience: "Teams that keep charges and invoices in one billing system.",
    objectives: [
      "Record what is owed as a charge.",
      "Produce invoices from the billing record.",
      "Keep a visible history of what has been billed.",
    ],
    challenge:
      "Charges and invoices drift when billing is rebuilt by hand outside a system made for it.",
    solution:
      "Billing keeps charges and invoices in one billing product, so the record of what was billed is the same record the team works from.",
    features: [
      {
        title: "Charges",
        description: "What is owed is recorded as a charge, not a note.",
        icon: "chart",
      },
      {
        title: "Invoices",
        description: "Invoices are produced from the billing record.",
        icon: "layers",
      },
      {
        title: "Billing history",
        description: "What has been billed stays visible on the account.",
        icon: "search",
      },
    ],
    technologies: [],
    images: [],
    featured: true,
    visual: "dashboard",
    tone: "slate",
    results: [
      "Charges and invoices live in the billing software.",
      "The team can see what has been billed.",
      "Billing is no longer a spreadsheet rebuilt by hand.",
    ],
  },
  {
    id: "stayeasy",
    projectName: "Stayeasy",
    slug: "stayeasy",
    category: "Mobile Applications",
    categories: ["Mobile Applications", "Web Applications"],
    industry: "Mobile and web",
    clientName: "",
    year: "",
    duration: "",
    status: "Completed",
    shortDescription:
      "A mobile application and a web application for the same Stayeasy product.",
    description:
      "Stayeasy is both a mobile application and a web application. People can use it on a phone and in the browser.",
    audience: "People who use Stayeasy on a phone and in the browser.",
    objectives: [
      "Offer Stayeasy as a mobile application.",
      "Offer the same product as a web application.",
      "Keep mobile and web as one product.",
    ],
    challenge:
      "The product needed to work in the hand and in the browser, not as two unrelated tools.",
    solution:
      "Stayeasy ships as a mobile application and a web application, so the same product is available on both.",
    features: [
      {
        title: "Mobile application",
        description: "Stayeasy on the phone, for use away from a desk.",
        icon: "layers",
      },
      {
        title: "Web application",
        description: "The same product in the browser.",
        icon: "search",
      },
      {
        title: "One product",
        description: "Mobile and web are two ways into Stayeasy, not two separate systems.",
        icon: "flow",
      },
    ],
    technologies: [],
    images: [],
    featured: true,
    visual: "mobile",
    tone: "sand",
    results: [
      "Stayeasy is available as a mobile app.",
      "Stayeasy is available as a web application.",
      "Phone and browser are two fronts of the same product.",
    ],
  },
  {
    id: "voxelhaus",
    projectName: "Voxelhaus",
    slug: "voxelhaus",
    category: "Website",
    industry: "Real Estate",
    clientName: "",
    year: "",
    duration: "",
    status: "Completed",
    shortDescription:
      "Floor plans, virtual staging, and photo editing for real estate professionals.",
    description:
      "Voxelhaus consultancy turns spaces into stunning experiences. The site covers floor plans, virtual staging, and photo editing, with confidential, professional visuals for real estate agents, homeowners, and designers.",
    audience:
      "Real estate agents, homeowners, and designers who need property visuals.",
    objectives: [
      "Present floor plans, virtual staging, and photo editing.",
      "Give visitors a way to request a quote.",
      "Publish the consultancy services on one site.",
    ],
    challenge:
      "Real estate listings need clear floor plans, staged rooms, and edited photos so a property can stand out.",
    solution:
      "www.voxelhausconsultancy.com presents those services in one place: 2D and 3D floor plans, virtual staging, Photoshop work, and real estate marketing, with a quote and contact path for the Tenkasi office.",
    features: [
      {
        title: "Floor plans",
        description:
          "2D floor plans, 3D floor plans, and floor plan redraws for property marketing.",
        icon: "layers",
      },
      {
        title: "Virtual staging",
        description:
          "Empty rooms staged as living rooms, bedrooms, and kitchens.",
        icon: "search",
      },
      {
        title: "Photoshop works",
        description:
          "Photo enhancement, object removal, and sky replacement.",
        icon: "flow",
      },
      {
        title: "Real estate marketing",
        description:
          "3D visualization, video editing, and marketing materials.",
        icon: "chart",
      },
    ],
    technologies: [],
    images: [],
    projectUrl: "https://www.voxelhausconsultancy.com/",
    featured: false,
    visual: "design",
    tone: "teal",
    results: [
      "The public site is live at www.voxelhausconsultancy.com.",
      "The site states 500+ projects completed and 100+ clients.",
      "Visitors can request a quote or reach the Tenkasi office.",
    ],
  },
  {
    id: "intellects",
    projectName: "Intellects",
    slug: "intellects",
    category: "Website",
    industry: "Website",
    clientName: "",
    year: "",
    duration: "",
    status: "Completed",
    shortDescription: "The Intellects website.",
    description:
      "Intellects is a website. It is the public site for Intellects, built to present the brand on the web.",
    audience: "People looking for Intellects on the web.",
    objectives: [
      "Give Intellects a public website.",
      "Carry the brand name on the site.",
      "Read clearly on a phone and on a desk.",
    ],
    challenge:
      "Intellects needed a website of its own, a place people can find the company online.",
    solution:
      "We designed and built the Intellects website as the public face of the brand.",
    features: [
      {
        title: "Public website",
        description: "A site people can open to learn about Intellects.",
        icon: "search",
      },
      {
        title: "Brand pages",
        description: "The site carries the Intellects name and story.",
        icon: "layers",
      },
      {
        title: "Responsive layout",
        description: "The website is built to read on a phone and on a desk.",
        icon: "flow",
      },
    ],
    technologies: [],
    images: [],
    featured: false,
    visual: "design",
    tone: "mint",
    results: [
      "Intellects has a website of its own.",
      "Visitors can find the brand on the web.",
      "The site is the public presentation of Intellects.",
    ],
  },
  {
    id: "primesource",
    projectName: "Primesource",
    slug: "primesource",
    category: "Website",
    industry: "Software",
    clientName: "",
    year: "",
    duration: "",
    status: "Completed",
    shortDescription:
      "Software delivery through technology, agile methods, and industry expertise, with digital marketing on the same site.",
    description:
      "primesourcellp.com is the Primesource website. It describes a development process that combines cutting-edge technology, agile methodologies, and deep industry expertise to deliver software that enhances efficiency, improves performance, and drives growth. The site also presents digital marketing.",
    audience:
      "Visitors learning how Primesource builds software and how digital marketing fits that work.",
    objectives: [
      "Explain the development process on the public site.",
      "State what the software work is meant to improve.",
      "Present digital marketing on the same site.",
    ],
    challenge:
      "The site has to explain how Primesource builds software, and it has to present digital marketing as part of that work.",
    solution:
      "The public site at primesourcellp.com walks through the development process: cutting-edge technology, agile methodologies, and deep industry expertise, aimed at software that enhances efficiency, improves performance, and drives growth. Digital marketing sits on the same site.",
    features: [
      {
        title: "Development process",
        description:
          "Cutting-edge technology, agile methodologies, and deep industry expertise, used together to deliver software.",
        icon: "flow",
      },
      {
        title: "Software outcomes",
        description:
          "The site states the aim: software that enhances efficiency, improves performance, and drives growth.",
        icon: "chart",
      },
      {
        title: "Digital marketing",
        description:
          "Digital marketing is a section of the Primesource website, shown alongside the development work.",
        icon: "search",
      },
    ],
    technologies: [],
    images: [],
    video: "/images/portfolio-hero.mp4",
    projectUrl: "https://primesourcellp.com",
    featured: false,
    visual: "design",
    tone: "slate",
    results: [
      "The public site is live at primesourcellp.com.",
      "Visitors can read how Primesource builds software.",
      "Digital marketing is part of the same website.",
    ],
  },
];

export function getFeaturedProjects() {
  return portfolioProjects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}

export function getPortfolioStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export function projectPath(project: PortfolioProject) {
  return project.caseStudyUrl ?? `/portfolio/${project.slug}`;
}
