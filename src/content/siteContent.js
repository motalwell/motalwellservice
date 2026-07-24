export const siteContent = {
  contentVersion: 1,

  company: {
    name: 'Motal Well Services',
    logoPrimary: 'Motal',
    logoSecondary: 'Well Services',
    logoIcon: '⛏',
    phoneDisplay: '(512) 350-8061',
    phoneLink: '5123508061',
    email: 'info@motalwellservices.com',
    serviceAreaShort: 'Central Texas',
    serviceAreaFull: 'Central Texas & Surrounding Counties',
    licenseBadge: 'Licensed & Insured · Central Texas',
  },

  navigation: [
    { id: 'nav-services', label: 'Services', href: '#services' },
    { id: 'nav-about', label: 'About', href: '#about' },
    { id: 'nav-process', label: 'Process', href: '#process' },
    { id: 'nav-faq', label: 'FAQ', href: '#faq' },
    { id: 'nav-contact', label: 'Contact', href: '#contact' },
    { id: 'nav-quote', label: 'Quote', href: '#quoteForm2', isCta: true },
  ],

  hero: {
    tag: 'Residential · Agricultural · Commercial',
    titleLines: [
      { id: 'hero-title-professional', text: 'Professional.' },
      { id: 'hero-title-experienced', text: 'Experienced.' },
    ],
    emphasizedTitle: 'Knowledgeable.',
    description:
      'Motal Well Services is a locally owned company serving Central Texas. We are committed to providing professional water well drilling, pump installation, and well services for every customer.',
    image: {
      key: 'hero-image',
      url: '/assets/img/hero-rig.jpg',
      alt: 'Motal Well Services drilling rig',
    },
    primaryButton: { label: 'Our Drilling Services', href: '#services' },
    secondaryButton: { label: 'Get a Free Quote', href: '#contact' },
  },

  stats: [
    { id: 'stat-years-experience', target: 25, label: 'Years of Experience' },
    { id: 'stat-wells-drilled', target: 1200, label: 'Wells Drilled' },
    { id: 'stat-success-rate', target: 98, label: '% Success Rate' },
    { id: 'stat-emergency-response', target: 24, label: 'Hr Emergency Response' },
  ],

  servicesSection: {
    eyebrow: 'What We Do',
    title: 'Your Trusted Central Texas',
    titleAccent: 'Well Drilling Partner',
    intro:
      'We provide complete water well solutions for homeowners, farmers, and commercial operations across Central Texas. Every job is handled with the experience and care your property deserves.',
    linkLabel: 'Request a Quote →',
    linkHref: '#contact',
  },

  services: [
    {
      id: 'service-residential',
      title: 'Domestic & Residential Water Wells',
      description:
        'Clean, reliable water for your home. We site, drill, and case residential water wells to deliver consistent water pressure and quality for your household.',
      image: {
        key: 'service-residential-image',
        url: '/assets/img/rig-desert.jpg',
        alt: 'Residential water well drilling',
        fallback: '🏡',
      },
      features: [
        { id: 'service-residential-new-well', label: 'New Well Drilling' },
        { id: 'service-residential-deepening', label: 'Well Deepening' },
        { id: 'service-residential-rehabilitation', label: 'Well Rehabilitation' },
        { id: 'service-residential-decommissioning', label: 'Decommissioning' },
      ],
    },
    {
      id: 'service-agricultural',
      title: 'Agricultural & Irrigation Wells',
      description:
        'High-yield irrigation wells engineered for livestock operations, row crops, and large-scale Texas farming. We understand the water demands of working land.',
      image: {
        key: 'service-agricultural-image',
        url: '/assets/img/rig-field.jpg',
        alt: 'Agricultural water well drilling',
        fallback: '🌾',
      },
      features: [
        { id: 'service-agricultural-new-well', label: 'New High-Capacity Wells' },
        { id: 'service-agricultural-deepening', label: 'Well Deepening & Cleanouts' },
        { id: 'service-agricultural-pump-upgrades', label: 'Pump & Motor Upgrades' },
        { id: 'service-agricultural-decommissioning', label: 'Decommissioning' },
      ],
    },
    {
      id: 'service-commercial',
      title: 'Commercial & Industrial Wells',
      description:
        'Reliable water supply for commercial developments, municipalities, and industrial operations. We bring the right equipment and experience for large-scale projects.',
      image: {
        key: 'service-commercial-image',
        url: '/assets/img/rig-field.jpg',
        alt: 'Commercial water well drilling rig',
        fallback: '🏗',
      },
      features: [
        { id: 'service-commercial-new-well', label: 'New Commercial Wells' },
        { id: 'service-commercial-municipal', label: 'Municipal Supply Wells' },
        { id: 'service-commercial-deepening', label: 'Well Deepening' },
        { id: 'service-commercial-testing', label: 'Flow & Quality Testing' },
      ],
    },
    {
      id: 'service-pump-repair',
      title: 'Pump Installation & Well Repair',
      description:
        'Low flow, sediment, or equipment failure? We diagnose and restore your existing well. Submersible and jet pump systems installed right and built to last.',
      image: {
        key: 'service-pump-repair-image',
        url: '/assets/img/rig-truck.jpg',
        alt: 'Well pump installation and repair',
        fallback: '🔧',
      },
      features: [
        { id: 'service-pump-installation', label: 'Submersible Pump Installation' },
        { id: 'service-pressure-tank', label: 'Pressure Tank Systems' },
        { id: 'service-water-testing', label: 'Water Quality Testing' },
        { id: 'service-permits', label: 'Permits & State Compliance' },
      ],
    },
  ],

  about: {
    eyebrow: 'About Our Company',
    title: 'Locally Owned.',
    titleAccent: 'Texas Proud.',
    paragraphs: [
      {
        id: 'about-company-intro',
        lead: 'Motal Well Services',
        text: ' is a locally owned company serving Central Texas and surrounding areas. We are committed to providing a quality product and professional service for every customer — from small residential wells to large commercial projects.',
      },
      {
        id: 'about-experience',
        text: 'Our team of experienced drillers brings deep knowledge of Texas geology and groundwater. We take pride in protecting your water resource while delivering personalized, professional service from the first call to final handoff.',
      },
      {
        id: 'about-permits',
        text: 'We handle all permits, filings, and inspections so you can stay focused on what matters most — your home, your farm, your business.',
      },
    ],
    badges: [
      { id: 'badge-licensed-well-driller', label: 'Texas LIC. Well Driller' },
      { id: 'badge-bonded-insured', label: 'Bonded & Insured' },
      { id: 'badge-tgpc-member', label: 'TGPC Member' },
    ],
    image: {
      key: 'about-image',
      url: '/assets/img/rig-truck.jpg',
      alt: 'Motal Well Services drilling rig at work',
    },
    years: '25+',
    yearsLabel: 'Years of Experience',
  },

  photoCallout: {
    image: {
      key: 'photo-callout-image',
      url: '/assets/img/rig-tower.jpg',
      alt: 'Water well drilling rig in Texas',
    },
    title: 'Ready to Find',
    titleAccent: 'Your Water?',
    description: 'Get straight answers and a fair price. No runaround — just results.',
    button: { label: 'Get a Free Quote Today', href: '#contact' },
  },

  process: {
    eyebrow: 'How It Works',
    title: 'From First Call to',
    titleAccent: 'Flowing Water.',
    intro: "Our streamlined process takes the stress out of getting a new well. Here's what to expect from start to finish.",
    steps: [
      {
        id: 'process-site-assessment',
        number: '01',
        title: 'Site Assessment',
        description:
          'We evaluate your land, pull geological data, and identify the optimal drill location before any equipment is mobilized.',
      },
      {
        id: 'process-permitting',
        number: '02',
        title: 'Permitting',
        description:
          'Every Texas permit, state filing, and required inspection is handled by our team. You stay focused on your property.',
      },
      {
        id: 'process-drilling',
        number: '03',
        title: 'Drilling',
        description:
          'We bring modern rigs, experienced operators, and real-time formation logging to reach the best aquifer for your land.',
      },
      {
        id: 'process-testing-handoff',
        number: '04',
        title: 'Testing & Handoff',
        description:
          'Full yield and water quality testing, pump installation, and a reliable water source handed to you — ready to use.',
      },
    ],
  },

  faq: {
    eyebrow: "FAQ's",
    title: "Let's Talk About",
    titleAccent: 'Drilling',
    intro:
      "Over the years we've been asked a lot of questions. Here are the most common ones about water well drilling in Central Texas.",
    items: [
      {
        id: 'faq-well-depth',
        question: 'How deep does the well need to be?',
        answer:
          'Well depth varies based on your specific location, local geology, and how much water you need. Central Texas wells typically range from 200 to 600+ feet depending on the aquifer. We assess your land and geological data to recommend the right depth before drilling begins.',
      },
      {
        id: 'faq-well-cost',
        question: 'How much does a new well cost?',
        answer:
          "Costs depend on depth, soil and rock conditions, location, and any additional services like pump installation or water testing. We provide transparent, no-surprise quotes after evaluating your property. Every site is unique — we'll give you a fair price based on your actual conditions.",
      },
      {
        id: 'faq-water-safety',
        question: 'Is well water safe to drink?',
        answer:
          'Properly drilled and cased wells in Central Texas can provide clean, safe drinking water. We perform water quality testing after every new well to verify safety. Periodic re-testing is recommended, as groundwater quality can change over time.',
      },
      {
        id: 'faq-equipment',
        question: 'What equipment do you use?',
        answer:
          "We operate modern rotary drill rigs capable of handling Texas's varied geology — from soft clay and caliche to hard limestone and granite. Our equipment is maintained to industry standards and operated by experienced, licensed Texas drillers.",
      },
      {
        id: 'faq-drilling-time',
        question: 'How long does it take to drill a well?',
        answer:
          "Most residential wells can be drilled in 1–3 days, depending on depth and conditions. Agricultural and commercial projects may take longer. We'll give you a realistic timeline upfront and keep you updated throughout the job.",
      },
      {
        id: 'faq-permits-inspections',
        question: 'Do you handle permits and inspections?',
        answer:
          "Yes — we take care of all required Texas Water Well permits, groundwater conservation district filings, and any required inspections. You don't have to navigate state bureaucracy on your own.",
      },
    ],
  },

  contact: {
    eyebrow: 'Get in Touch',
    title: 'Ready to Get',
    titleAccent: 'Started?',
    intro:
      "If you're considering a new well or need help with an existing one, we're here to help. Fill out the form and our team will get back to you with a quote and answers to your questions.",
    items: [
      { id: 'contact-phone', icon: '📞', label: 'Phone', type: 'phone' },
      { id: 'contact-email', icon: '✉', label: 'Email', type: 'email' },
      { id: 'contact-service-area', icon: '📍', label: 'Service Area', value: 'Central Texas & Surrounding Counties' },
      {
        id: 'contact-hours',
        icon: '🕐',
        label: 'Hours',
        lines: [
          { id: 'contact-hours-standard', text: 'Mon–Fri 7am–6pm · Sat 8am–2pm' },
          { id: 'contact-hours-emergency', text: 'Emergency Service Available 24/7' },
        ],
      },
    ],
  },

  quoteForm: {
    title: 'Free Quote Request',
    subtitle: "Fill out the form below and we'll respond as quickly as possible.",
    fields: {
      name: 'Full Name *',
      phone: 'Phone Number *',
      email: 'Email Address',
      location: 'Property Location / County',
      service: 'Type of Service Needed',
      message: 'Questions or additional details about your project...',
    },
    serviceOptions: [
      { id: 'quote-service-residential', label: 'New Residential Well' },
      { id: 'quote-service-agricultural', label: 'New Agricultural / Irrigation Well' },
      { id: 'quote-service-commercial', label: 'New Commercial Well' },
      { id: 'quote-service-deepening', label: 'Well Deepening' },
      { id: 'quote-service-repair', label: 'Well Repair / Rehabilitation' },
      { id: 'quote-service-pump', label: 'Pump Installation' },
      { id: 'quote-service-testing', label: 'Water Testing' },
      { id: 'quote-service-decommissioning', label: 'Well Decommissioning' },
      { id: 'quote-service-advice', label: 'Not Sure / Need Advice' },
    ],
    submitLabel: 'Submit Request →',
    sendingLabel: 'Sending…',
    errorMessage: 'There was an issue sending your request. Please call us directly at (512) 350-8061.',
  },

  footer: {
    copyright: '© 2025 Motal Well Services — All Rights Reserved',
    license: 'Licensed Well Driller — Texas',
  },

  successModal: {
    title: 'Request',
    titleAccent: 'Sent!',
    body: "Thanks for reaching out. Your request was received successfully. We'll review the details and get back to you as soon as possible.",
    closeLabel: 'Close',
  },
};
