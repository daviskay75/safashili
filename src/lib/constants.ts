// Constantes globales de l'application

// Export Doctolib configuration
export * from './constants/doctolib'

export const SITE_CONFIG = {
  name: 'Safa Shili Psychologue',
  title: 'Safa Shili - Psychologue Spécialisée Violence & Traumatisme | Rosny-sous-Bois',
  description: 'Psychologue clinicienne à Rosny-sous-Bois spécialisée en violence conjugale, psychotraumatologie et accompagnement adolescents/adultes. Consultation cabinet, domicile et thérapies de groupe.',
  url: 'https://safashili.com',
  author: 'Safa Shili',
  keywords: [
    'psychologue Rosny-sous-Bois',
    'violence conjugale',
    'psychotraumatologie',
    'thérapie adolescent',
    'consultation psychologique 93110',
    'psychologue Seine-Saint-Denis'
  ]
}

export const CONTACT_INFO = {
  phone: '06 51 68 74 30',
  email: 'contact@safa-shili-psychologue.fr',
  address: {
    street: '7 Rue du Quatrième Zouave',
    city: 'Rosny-sous-Bois',
    zipCode: '93110',
    building: 'Centre médical - 1er sous-sol avec ascenseur'
  },
  coordinates: {
    lat: 48.8736,
    lng: 2.4836
  },
  transport: [
    'RER E - Gare de Rosny-sous-Bois',
    'Bus ligne 121 - Arrêt Eglise De Rosny',
    'Bus lignes 143, 121, 118 - Arrêt Église'
  ]
}

export const BUSINESS_HOURS = {
  lundi: { open: '14:00', close: '21:00' },
  mardi: { open: '11:00', close: '13:00', afternoon: '14:00', afternoonClose: '21:00' },
  mercredi: { open: '11:00', close: '13:00', afternoon: '14:00', afternoonClose: '21:00' },
  jeudi: { open: '11:00', close: '13:00', afternoon: '14:00', afternoonClose: '21:00' },
  vendredi: { open: '11:00', close: '13:00', afternoon: '14:00', afternoonClose: '21:00' },
  samedi: { open: '09:00', close: '17:00' },
  dimanche: 'fermé'
}

export const SERVICES = [
  {
    id: 'violence-conjugale',
    title: 'Violence conjugale & familiale',
    description: 'Accompagnement spécialisé pour sortir des situations de violence',
    icon: 'shield-check',
    price: 60,
    duration: 60
  },
  {
    id: 'psychotraumatologie',
    title: 'Psychotraumatologie',
    description: 'Prise en charge des traumatismes et stress post-traumatique',
    icon: 'heart',
    price: 60,
    duration: 60
  },
  {
    id: 'therapie-adolescents',
    title: 'Thérapie adolescents',
    description: 'Accompagnement psychologique des adolescents en difficulté',
    icon: 'academic-cap',
    price: 60,
    duration: 60
  },
  {
    id: 'accompagnement-adultes',
    title: 'Accompagnement adultes',
    description: 'Suivi psychologique pour adultes (anxiété, dépression, etc.)',
    icon: 'user',
    price: 60,
    duration: 60
  },
  {
    id: 'souffrance-travail',
    title: 'Souffrance au travail',
    description: 'Gestion du burn-out, harcèlement professionnel',
    icon: 'briefcase',
    price: 60,
    duration: 60
  },
  {
    id: 'bilans-psychologiques',
    title: 'Bilans psychologiques',
    description: 'Tests projectifs (Rorschach, TAT) et évaluations complètes',
    icon: 'document-text',
    price: 120,
    duration: 120
  }
]

export const SPECIALTIES_DETAIL = {
  'violence-conjugale': {
    id: 'violence-conjugale',
    title: 'Violence conjugale & familiale',
    subtitle: 'Sortir de la violence avec un accompagnement spécialisé',
    description: 'Un accompagnement expert et bienveillant pour vous aider à sortir des situations de violence conjugale et familiale.',
    heroImage: '/images/violence-conjugale-hero.jpg',
    problems: [
      'Vous subissez des violences physiques, psychologiques ou sexuelles',
      'Vous vous sentez isolé(e) et coupé(e) de vos proches',
      'Vous avez peur de votre conjoint et marchez sur des œufs',
      'Vous perdez confiance en vous et doutez de votre perception',
      'Vous ne savez pas comment protéger vos enfants'
    ],
    solutions: [
      'Identification des mécanismes de violence et de manipulation',
      'Reconstruction de l\'estime de soi et de la confiance',
      'Élaboration d\'un plan de sortie sécurisé',
      'Accompagnement dans les démarches juridiques',
      'Soutien pour la protection des enfants'
    ],
    process: [
      {
        step: 1,
        title: 'Évaluation et sécurisation',
        description: 'Analyse de votre situation et évaluation des risques pour établir un cadre sécurisant'
      },
      {
        step: 2,
        title: 'Compréhension des mécanismes',
        description: 'Identification des cycles de violence et des stratégies de manipulation'
      },
      {
        step: 3,
        title: 'Reconstruction personnelle',
        description: 'Travail sur l\'estime de soi, la confiance et la réappropriation de votre pouvoir'
      },
      {
        step: 4,
        title: 'Plan d\'action concret',
        description: 'Élaboration d\'une stratégie de sortie adaptée à votre situation'
      }
    ],
    faqs: [
      {
        question: 'Comment savoir si je suis victime de violence conjugale ?',
        answer: 'La violence conjugale ne se limite pas aux coups. Elle inclut les humiliations, les menaces, le contrôle, l\'isolement, les violences sexuelles et économiques. Si vous ressentez de la peur dans votre relation, c\'est déjà un signal d\'alarme.'
      },
      {
        question: 'Est-ce que tout peut rester confidentiel ?',
        answer: 'Absolument. Le secret professionnel protège nos échanges. Je ne révélerai rien sans votre accord, sauf en cas de danger imminent pour vous ou vos enfants.'
      },
      {
        question: 'Combien de temps dure un accompagnement ?',
        answer: 'Chaque situation est unique. L\'accompagnement peut durer de quelques mois à plusieurs années selon vos besoins et votre rythme de reconstruction.'
      }
    ],
    relatedServices: ['psychotraumatologie', 'accompagnement-adultes'],
    urgencyNote: 'En cas de danger immédiat, appelez le 3919 (numéro national d\'information pour les femmes victimes de violences)'
  },
  
  'psychotraumatologie': {
    id: 'psychotraumatologie',
    title: 'Psychotraumatologie',
    subtitle: 'Guérir des blessures invisibles du traumatisme',
    description: 'Une prise en charge spécialisée pour surmonter les traumatismes et retrouver un équilibre psychologique.',
    heroImage: '/images/psychotraumatologie-hero.jpg',
    problems: [
      'Vous revivez constamment l\'événement traumatisant',
      'Vous évitez certains lieux, personnes ou situations',
      'Vous souffrez d\'insomnie, de cauchemars récurrents',
      'Vous ressentez une anxiété permanente ou des crises de panique',
      'Vous vous sentez détaché(e) de vos émotions et de votre entourage'
    ],
    solutions: [
      'Techniques de stabilisation et de régulation émotionnelle',
      'Traitement du traumatisme par thérapies spécialisées',
      'Reconstruction de la sécurité intérieure',
      'Réintégration progressive dans la vie quotidienne',
      'Prévention des rechutes et renforcement des ressources'
    ],
    process: [
      {
        step: 1,
        title: 'Stabilisation',
        description: 'Apprentissage de techniques pour gérer les symptômes et retrouver un sentiment de sécurité'
      },
      {
        step: 2,
        title: 'Traitement du traumatisme',
        description: 'Travail sur les souvenirs traumatiques avec des techniques adaptées (EMDR, TCC)'
      },
      {
        step: 3,
        title: 'Intégration',
        description: 'Reconstruction du sens et réintégration harmonieuse de l\'expérience'
      },
      {
        step: 4,
        title: 'Consolidation',
        description: 'Renforcement des acquis et prévention des rechutes'
      }
    ],
    faqs: [
      {
        question: 'Qu\'est-ce qu\'un traumatisme psychologique ?',
        answer: 'Un traumatisme survient après un événement qui dépasse nos capacités d\'adaptation : accident, agression, catastrophe, deuil... Il laisse des traces durables dans notre psychisme.'
      },
      {
        question: 'Combien de temps après l\'événement peut-on consulter ?',
        answer: 'Il n\'y a pas de délai. Certaines personnes consultent immédiatement, d\'autres des années après. L\'important est de consulter quand vous en ressentez le besoin.'
      },
      {
        question: 'Les thérapies du traumatisme sont-elles douloureuses ?',
        answer: 'Les thérapies modernes permettent de traiter le traumatisme en douceur, à votre rythme. L\'objectif est de diminuer la souffrance, pas de l\'augmenter.'
      }
    ],
    relatedServices: ['violence-conjugale', 'accompagnement-adultes'],
    urgencyNote: 'En cas de pensées suicidaires, contactez immédiatement le 3114 (numéro national de prévention du suicide)'
  },

  'therapie-adolescents': {
    id: 'therapie-adolescents',
    title: 'Thérapie adolescents',
    subtitle: 'Accompagner les jeunes dans leur construction identitaire',
    description: 'Un soutien psychologique adapté aux spécificités de l\'adolescence pour aider les jeunes à surmonter leurs difficultés.',
    heroImage: '/images/therapie-adolescents-hero.jpg',
    problems: [
      'Votre adolescent se replie sur lui-même ou devient agressif',
      'Il présente des troubles du comportement ou de l\'alimentation',
      'Ses résultats scolaires chutent brutalement',
      'Il exprime des idées noires ou suicidaires',
      'Vous ne savez plus comment communiquer avec lui'
    ],
    solutions: [
      'Espace d\'expression libre et confidentiel pour l\'adolescent',
      'Travail sur la construction identitaire et l\'estime de soi',
      'Gestion des émotions et des relations sociales',
      'Soutien parental pour améliorer la communication familiale',
      'Coordination avec l\'équipe éducative si nécessaire'
    ],
    process: [
      {
        step: 1,
        title: 'Première rencontre',
        description: 'Évaluation des difficultés et création d\'un lien de confiance avec l\'adolescent'
      },
      {
        step: 2,
        title: 'Accompagnement individuel',
        description: 'Séances régulières centrées sur l\'expression et la compréhension des difficultés'
      },
      {
        step: 3,
        title: 'Soutien familial',
        description: 'Guidance parentale pour améliorer la communication et les relations familiales'
      },
      {
        step: 4,
        title: 'Consolidation',
        description: 'Renforcement de l\'autonomie et préparation à l\'âge adulte'
      }
    ],
    faqs: [
      {
        question: 'Mon adolescent refuse de consulter, que faire ?',
        answer: 'Il est fréquent que les adolescents résistent au début. Je peux d\'abord vous recevoir en tant que parents pour vous conseiller sur l\'approche à adopter.'
      },
      {
        question: 'Les parents sont-ils informés de ce qui se dit en séance ?',
        answer: 'La confidentialité est essentielle avec les adolescents. Je partage uniquement les informations nécessaires, toujours en accord avec le jeune.'
      },
      {
        question: 'À partir de quel âge peut-on consulter ?',
        answer: 'Je reçois les adolescents à partir de 12-13 ans. Pour les plus jeunes, je propose un accompagnement familial adapté.'
      }
    ],
    relatedServices: ['accompagnement-adultes', 'violence-conjugale'],
    urgencyNote: 'En cas d\'urgence avec un adolescent, n\'hésitez pas à contacter le 3114 ou à vous rendre aux urgences'
  },

  'accompagnement-adultes': {
    id: 'accompagnement-adultes',
    title: 'Accompagnement adultes',
    subtitle: 'Surmonter les défis de la vie adulte avec un soutien professionnel',
    description: 'Un accompagnement psychologique pour les adultes confrontés à diverses difficultés : anxiété, dépression, transitions de vie...',
    heroImage: '/images/accompagnement-adultes-hero.jpg',
    problems: [
      'Vous ressentez une anxiété persistante ou des crises d\'angoisse',
      'Vous traversez une période de dépression ou de démotivation',
      'Vous vivez une rupture, un deuil ou une transition difficile',
      'Vous avez des difficultés relationnelles récurrentes',
      'Vous vous sentez perdu(e) dans vos choix de vie'
    ],
    solutions: [
      'Écoute bienveillante et espace de parole sécurisé',
      'Analyse des patterns comportementaux et émotionnels',
      'Développement de stratégies d\'adaptation efficaces',
      'Travail sur l\'estime de soi et la confiance',
      'Accompagnement dans les prises de décision importantes'
    ],
    process: [
      {
        step: 1,
        title: 'Évaluation initiale',
        description: 'Compréhension de vos difficultés et définition d\'objectifs thérapeutiques'
      },
      {
        step: 2,
        title: 'Exploration',
        description: 'Analyse approfondie des mécanismes à l\'œuvre dans vos difficultés'
      },
      {
        step: 3,
        title: 'Transformation',
        description: 'Mise en place de nouveaux modes de fonctionnement plus épanouissants'
      },
      {
        step: 4,
        title: 'Autonomisation',
        description: 'Consolidation des acquis et développement de votre autonomie psychologique'
      }
    ],
    faqs: [
      {
        question: 'Combien de temps dure une thérapie ?',
        answer: 'La durée varie selon vos objectifs. Certaines difficultés se résolvent en quelques mois, d\'autres nécessitent un travail plus long. Nous ferons le point régulièrement.'
      },
      {
        question: 'Comment se déroule une séance type ?',
        answer: 'Chaque séance dure 50-60 minutes. Vous parlez librement de ce qui vous préoccupe, je vous aide à analyser et comprendre vos difficultés pour trouver des solutions.'
      },
      {
        question: 'Quelle est la différence avec un psychiatre ?',
        answer: 'Le psychiatre est médecin et peut prescrire des médicaments. En tant que psychologue, je me concentre sur l\'accompagnement par la parole et les thérapies psychologiques.'
      }
    ],
    relatedServices: ['psychotraumatologie', 'souffrance-travail'],
    urgencyNote: 'Si vous ressentez des pensées suicidaires, contactez immédiatement le 3114'
  },

  'souffrance-travail': {
    id: 'souffrance-travail',
    title: 'Souffrance au travail',
    subtitle: 'Retrouver un équilibre professionnel et personnel',
    description: 'Accompagnement spécialisé pour surmonter le burn-out, le harcèlement professionnel et retrouver du sens dans votre travail.',
    heroImage: '/images/souffrance-travail-hero.jpg',
    problems: [
      'Vous êtes épuisé(e) physiquement et émotionnellement',
      'Vous subissez du harcèlement ou des pressions au travail',
      'Vous perdez le sens et la motivation dans votre activité',
      'Vous développez des symptômes physiques liés au stress',
      'Votre vie personnelle est impactée par vos difficultés professionnelles'
    ],
    solutions: [
      'Analyse des facteurs de stress et des dynamiques professionnelles',
      'Techniques de gestion du stress et de prévention du burn-out',
      'Accompagnement dans la résolution de conflits au travail',
      'Aide à la prise de décision (changement, reconversion...)',
      'Reconstruction de l\'équilibre vie professionnelle/vie personnelle'
    ],
    process: [
      {
        step: 1,
        title: 'Diagnostic',
        description: 'Évaluation de votre niveau de stress et identification des facteurs de souffrance'
      },
      {
        step: 2,
        title: 'Stratégies d\'adaptation',
        description: 'Mise en place d\'outils pour gérer le stress et protéger votre santé mentale'
      },
      {
        step: 3,
        title: 'Plan d\'action',
        description: 'Élaboration de solutions concrètes pour améliorer votre situation professionnelle'
      },
      {
        step: 4,
        title: 'Prévention',
        description: 'Consolidation des acquis et prévention des rechutes'
      }
    ],
    faqs: [
      {
        question: 'Comment reconnaître un burn-out ?',
        answer: 'Le burn-out se caractérise par un épuisement physique et émotionnel, un cynisme envers le travail et un sentiment d\'inefficacité. Si vous ressentez ces symptômes, consultez.'
      },
      {
        question: 'Peut-on guérir d\'un burn-out ?',
        answer: 'Oui, le burn-out se soigne. La récupération demande du temps et souvent des changements dans l\'organisation du travail, mais il est possible de retrouver un équilibre.'
      },
      {
        question: 'Comment gérer un conflit avec mon supérieur ?',
        answer: 'Je vous aide à analyser la situation, à développer des stratégies de communication et à prendre les décisions appropriées, y compris les recours possibles.'
      }
    ],
    relatedServices: ['accompagnement-adultes', 'psychotraumatologie'],
    urgencyNote: 'En cas de harcèlement au travail, n\'hésitez pas à contacter l\'inspection du travail ou un avocat spécialisé'
  }
}

export const CITIES = [
  {
    name: 'Rosny-sous-Bois',
    slug: 'rosny-sous-bois',
    zipCode: '93110',
    transport: ['RER E', 'Bus 121, 143, 118'],
    description: 'Cabinet principal au centre médical',
    subtitle: 'Votre psychologue spécialisée au cœur de Rosny-sous-Bois',
    longDescription: 'Cabinet de psychologie clinique situé dans le centre médical de Rosny-sous-Bois. Spécialisée en violence conjugale, psychotraumatologie et accompagnement des victimes.',
    availableServices: ['consultation-cabinet', 'consultation-domicile', 'therapie-groupe', 'suivi-distance'],
    transportDetails: {
      'RER E': 'Gare de Rosny-sous-Bois (3 min à pied)',
      'Bus 121': 'Arrêt Eglise De Rosny (1 min)',
      'Bus 143': 'Arrêt Église (2 min)',
      'Bus 118': 'Arrêt Église (2 min)'
    },
    localTestimonial: {
      name: 'Marie L.',
      text: 'Un cabinet facilement accessible depuis Rosny. L\'accompagnement de Safa m\'a permis de retrouver confiance en moi.',
      rating: 5
    },
    nearbyAreas: ['Neuilly-Plaisance', 'Fontenay-sous-Bois', 'Villemomble'],
    distanceFromParis: '15 km à l\'est de Paris'
  },
  {
    name: 'Montreuil',
    slug: 'montreuil',
    zipCode: '93100',
    transport: ['Métro 9', 'RER A'],
    description: 'Consultations à domicile et en cabinet',
    subtitle: 'Accompagnement psychologique pour les habitants de Montreuil',
    longDescription: 'Interventions à domicile et possibilité de consultation au cabinet de Rosny-sous-Bois pour les résidents de Montreuil.',
    availableServices: ['consultation-domicile', 'consultation-cabinet', 'suivi-distance'],
    transportDetails: {
      'Métro 9': 'Mairie de Montreuil, Croix de Chavaux',
      'RER A': 'Vincennes puis bus',
      'Bus': 'Lignes 115, 122 vers Rosny'
    },
    localTestimonial: {
      name: 'Sophie M.',
      text: 'Les consultations à domicile ont été parfaites pour notre famille. Ma fille de 16 ans a enfin trouvé quelqu\'un qui la comprend.',
      rating: 5
    },
    nearbyAreas: ['Vincennes', 'Bagnolet', 'Romainville'],
    distanceFromParis: '7 km à l\'est de Paris'
  },
  {
    name: 'Bondy',
    slug: 'bondy',
    zipCode: '93140',
    transport: ['RER E', 'Tramway T4'],
    description: 'Consultations à domicile disponibles',
    subtitle: 'Soutien psychologique pour les habitants de Bondy',
    longDescription: 'Accompagnement psychologique avec consultations à domicile privilégiées pour les résidents de Bondy.',
    availableServices: ['consultation-domicile', 'suivi-distance', 'consultation-cabinet'],
    transportDetails: {
      'RER E': 'Bondy (10 min en RER vers Rosny)',
      'Tramway T4': 'Bondy - Aulnay-sous-Bois',
      'Bus': 'Lignes 146, 234 vers Rosny'
    },
    localTestimonial: {
      name: 'Thomas R.',
      text: 'Le suivi à distance proposé par Safa m\'a aidé à gérer mon burn-out tout en gardant mes habitudes à Bondy.',
      rating: 5
    },
    nearbyAreas: ['Bobigny', 'Drancy', 'Pavillons-sous-Bois'],
    distanceFromParis: '12 km au nord-est de Paris'
  },
  {
    name: 'Bagnolet',
    slug: 'bagnolet',
    zipCode: '93170',
    transport: ['Métro 3', 'Bus'],
    description: 'Proche Paris, consultations flexibles',
    subtitle: 'Psychologue accessible depuis Bagnolet',
    longDescription: 'Proximité avec Paris et excellente desserte pour rejoindre le cabinet ou bénéficier de consultations à domicile.',
    availableServices: ['consultation-cabinet', 'consultation-domicile', 'suivi-distance'],
    transportDetails: {
      'Métro 3': 'Gallieni puis bus vers Rosny',
      'Bus': 'Lignes 76, 318 vers Rosny-sous-Bois',
      'Voiture': '15 min via A86'
    },
    localTestimonial: {
      name: 'David K.',
      text: 'Facilement accessible depuis Bagnolet. L\'expertise en psychotraumatologie de Safa m\'a permis de me reconstruire.',
      rating: 5
    },
    nearbyAreas: ['Montreuil', 'Pantin', 'Les Lilas'],
    distanceFromParis: '5 km à l\'est de Paris'
  },
  {
    name: 'Noisy-le-Sec',
    slug: 'noisy-le-sec',
    zipCode: '93130',
    transport: ['RER E', 'Bus'],
    description: 'Secteur d\'intervention prioritaire',
    subtitle: 'Accompagnement psychologique spécialisé à Noisy-le-Sec',
    longDescription: 'Zone d\'intervention privilégiée avec consultations au cabinet facilement accessible et possibilité de déplacements à domicile.',
    availableServices: ['consultation-cabinet', 'consultation-domicile', 'therapie-groupe', 'suivi-distance'],
    transportDetails: {
      'RER E': 'Noisy-le-Sec (5 min en RER vers Rosny)',
      'Bus': 'Lignes 145, 303 vers centre de Rosny',
      'Voiture': '8 min via D116'
    },
    localTestimonial: {
      name: 'Amélie D.',
      text: 'Très proche de Noisy-le-Sec. Safa a su m\'accompagner avec bienveillance dans ma reconstruction après des violences.',
      rating: 5
    },
    nearbyAreas: ['Romainville', 'Bobigny', 'Bondy'],
    distanceFromParis: '11 km au nord-est de Paris'
  }
]

export const LEAD_MAGNETS = [
  {
    id: 'violence-conjugale',
    title: 'Guide : Sortir de la violence conjugale',
    description: 'Un guide pratique pour comprendre, identifier et sortir d\'une relation toxique',
    filename: 'guide-violence-conjugale.pdf'
  },
  {
    id: 'signes-consulter',
    title: '10 signes qu\'il faut consulter un psychologue',
    description: 'Checklist pour identifier le bon moment pour consulter',
    filename: 'checklist-consulter-psychologue.pdf'
  },
  {
    id: 'gerer-anxiete',
    title: 'Techniques pour gérer l\'anxiété au quotidien',
    description: 'Méthodes pratiques et exercices pour apaiser l\'anxiété',
    filename: 'techniques-gestion-anxiete.pdf'
  }
]

export const NAVIGATION = [
  { name: 'Accueil', href: '/' },
  { name: 'À propos', href: '/about' },
  { 
    name: 'Spécialités', 
    href: '/specialites',
    submenu: [
      { name: 'Violence conjugale', href: '/specialites/violence-conjugale' },
      { name: 'Psychotraumatologie', href: '/specialites/psychotraumatologie' },
      { name: 'Thérapie adolescents', href: '/specialites/therapie-adolescents' },
      { name: 'Accompagnement adultes', href: '/specialites/accompagnement-adultes' },
      { name: 'Souffrance au travail', href: '/specialites/souffrance-travail' }
    ]
  },
  { 
    name: 'Modalités', 
    href: '/modalites',
    submenu: [
      { name: 'Consultation cabinet', href: '/modalites/consultation-cabinet' },
      { name: 'Thérapies de groupe', href: '/modalites/therapie-groupe' },
      { name: 'Suivi à distance', href: '/modalites/suivi-distance' },
      { name: 'Consultations domicile', href: '/modalites/consultation-domicile' }
    ]
  },
  { 
    name: 'Ressources', 
    href: '/ressources',
    submenu: [
      { name: 'Guide Violence Conjugale', href: '/ressources/sortir-violence-conjugale' },
      { name: 'Gérer l\'Anxiété', href: '/ressources/gerer-anxiete-quotidien' },
      { name: '10 Signes Consultation', href: '/ressources/10-signes-consultation' }
    ]
  },
  { name: 'Infos pratiques', href: '/infos-pratiques' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' }
]

export const TESTIMONIALS = [
  {
    id: 'testimonial-1',
    name: 'Marie L.',
    initials: 'ML',
    location: 'Rosny-sous-Bois',
    specialty: 'Violence conjugale',
    text: 'Grâce à l\'accompagnement de Safa, j\'ai pu retrouver confiance en moi et sortir d\'une situation difficile. Son écoute bienveillante et son expertise m\'ont permis de me reconstruire.',
    rating: 5
  },
  {
    id: 'testimonial-2', 
    name: 'Thomas R.',
    initials: 'TR',
    location: 'Montreuil',
    specialty: 'Souffrance au travail',
    text: 'Le suivi avec Safa m\'a aidé à gérer mon burn-out et à retrouver un équilibre professionnel. Ses conseils pratiques ont fait toute la différence dans mon quotidien.',
    rating: 5
  },
  {
    id: 'testimonial-3',
    name: 'Sophie M.',
    initials: 'SM', 
    location: 'Bondy',
    specialty: 'Thérapie adolescent',
    text: 'Ma fille de 16 ans a enfin trouvé quelqu\'un qui la comprend. Safa a su créer un lien de confiance et l\'aider à traverser cette période difficile. Nous recommandons vivement.',
    rating: 5
  },
  {
    id: 'testimonial-4',
    name: 'David K.',
    initials: 'DK',
    location: 'Bagnolet', 
    specialty: 'Psychotraumatologie',
    text: 'Après un événement traumatisant, Safa m\'a accompagné avec une grande expertise. Sa spécialisation en psychotraumatologie m\'a permis de me reconstruire petit à petit.',
    rating: 5
  }
]

export const FAQS = [
  {
    question: 'Comment se déroule une première consultation ?',
    answer: 'La première consultation dure environ 60 minutes. C\'est un moment d\'échange où nous faisons connaissance, vous exposez votre situation et vos attentes. Je vous explique mon approche thérapeutique et nous définissons ensemble les objectifs de l\'accompagnement.'
  },
  {
    question: 'Les consultations sont-elles remboursées ?',
    answer: 'Les consultations ne sont pas remboursées par la Sécurité Sociale car je ne suis pas conventionnée. Cependant, de nombreuses mutuelles proposent un forfait annuel pour les consultations psychologiques. Je vous fournis une facture pour vos démarches de remboursement.'
  },
  {
    question: 'À quelle fréquence dois-je consulter ?',
    answer: 'La fréquence des séances varie selon vos besoins et votre situation. En général, je recommande une séance par semaine au début, puis nous pouvons espacer selon vos progrès. Cette fréquence est toujours discutée et adaptée ensemble.'
  },
  {
    question: 'Proposez-vous des consultations à distance ?',
    answer: 'Oui, je propose des consultations en visioconférence et un suivi par message pour un accompagnement à distance. Ces modalités peuvent compléter les séances en cabinet ou être une alternative si vous ne pouvez pas vous déplacer.'
  },
  {
    question: 'Que se passe-t-il si je ne peux pas venir à un rendez-vous ?',
    answer: 'Je vous demande de prévenir au moins 48h à l\'avance en cas d\'annulation. Les séances annulées ou déplacées avec moins de 48h de préavis sont facturées 60€. Cette règle permet une organisation optimale pour tous les patients.'
  },
  {
    question: 'Spécialisez-vous dans certaines problématiques ?',
    answer: 'Oui, j\'ai une expertise particulière en violence conjugale et familiale, psychotraumatologie, et accompagnement des victimes. Je suis également formée pour l\'accompagnement des adolescents, la souffrance au travail et les bilans psychologiques approfondis.'
  }
]

export const MODALITES_DETAIL = {
  'consultation-cabinet': {
    id: 'consultation-cabinet',
    title: 'Consultation au cabinet',
    subtitle: 'Un espace confidentiel et sécurisé pour votre bien-être',
    description: 'Consultations individuelles dans un cadre professionnel au cœur de Rosny-sous-Bois',
    price: 60,
    duration: 60,
    location: 'Cabinet médical - 7 Rue du Quatrième Zouave, Rosny-sous-Bois',
    advantages: [
      'Cadre thérapeutique optimal et confidentiel',
      'Équipement professionnel (tests psychologiques)',
      'Facilité d\'accès (RER E, Bus)',
      'Parking disponible à proximité',
      'Accessibilité PMR (ascenseur)'
    ],
    process: [
      {
        step: 1,
        title: 'Prise de rendez-vous',
        description: 'Contactez-moi par téléphone ou via le formulaire pour fixer votre première consultation'
      },
      {
        step: 2,
        title: 'Première rencontre',
        description: 'Évaluation de votre situation et définition des objectifs thérapeutiques (60 minutes)'
      },
      {
        step: 3,
        title: 'Suivi personnalisé',
        description: 'Séances régulières adaptées à votre rythme et vos besoins'
      },
      {
        step: 4,
        title: 'Évaluation des progrès',
        description: 'Bilans réguliers pour ajuster l\'accompagnement selon votre évolution'
      }
    ],
    practicalInfo: {
      schedule: 'Du lundi au samedi selon planning',
      payment: 'Espèces, chèque, virement',
      cancellation: '48h de préavis requis',
      insurance: 'Remboursement partiel par certaines mutuelles'
    }
  },
  
  'therapie-groupe': {
    id: 'therapie-groupe',
    title: 'Thérapies de groupe',
    subtitle: 'Partager et grandir ensemble dans un cadre bienveillant',
    description: 'Groupes thérapeutiques spécialisés pour un accompagnement collectif et un soutien mutuel',
    price: 40,
    duration: 90,
    groupSize: '6-8 participants maximum',
    advantages: [
      'Partage d\'expériences avec des pairs',
      'Soutien mutuel et entraide',
      'Dynamique de groupe thérapeutique',
      'Coût réduit par rapport au suivi individuel',
      'Apprentissage par l\'observation'
    ],
    process: [
      {
        step: 1,
        title: 'Entretien préalable',
        description: 'Évaluation individuelle pour vérifier l\'adéquation avec le groupe'
      },
      {
        step: 2,
        title: 'Intégration progressive',
        description: 'Présentation au groupe et définition du cadre thérapeutique'
      },
      {
        step: 3,
        title: 'Participation active',
        description: 'Engagement dans les échanges et exercices thérapeutiques de groupe'
      },
      {
        step: 4,
        title: 'Évolution collective',
        description: 'Progression personnelle accompagnée par la dynamique du groupe'
      }
    ],
    groupTypes: [
      'Groupe femmes victimes de violence',
      'Groupe gestion de l\'anxiété',
      'Groupe affirmation de soi',
      'Groupe adolescents (13-17 ans)'
    ],
    practicalInfo: {
      schedule: 'Séances hebdomadaires de 90 minutes',
      commitment: 'Engagement sur 3 mois minimum',
      confidentiality: 'Règles strictes de confidentialité',
      prerequisite: 'Entretien individuel obligatoire'
    }
  },
  
  'suivi-distance': {
    id: 'suivi-distance',
    title: 'Suivi à distance',
    subtitle: 'Un accompagnement professionnel où que vous soyez',
    description: 'Consultations en visioconférence et suivi par messages sécurisés pour plus de flexibilité',
    price: 55,
    duration: 50,
    platforms: 'WhatsApp Video, Zoom, ou téléphone',
    advantages: [
      'Flexibilité géographique et horaire',
      'Pas de temps de transport',
      'Confort de votre environnement personnel',
      'Suivi continu même en déplacement',
      'Tarif légèrement réduit'
    ],
    process: [
      {
        step: 1,
        title: 'Configuration technique',
        description: 'Test de connexion et choix de la plateforme de communication'
      },
      {
        step: 2,
        title: 'Première séance',
        description: 'Adaptation au format distanciel et évaluation de votre situation'
      },
      {
        step: 3,
        title: 'Suivi régulier',
        description: 'Séances programmées avec possibilité de messages entre les rendez-vous'
      },
      {
        step: 4,
        title: 'Évaluation continue',
        description: 'Ajustement du format selon vos besoins et votre évolution'
      }
    ],
    requirements: [
      'Connexion internet stable',
      'Smartphone, tablette ou ordinateur avec caméra',
      'Espace calme et confidentiel',
      'Application de visioconférence installée'
    ],
    practicalInfo: {
      schedule: 'Créneaux étendus incluant soirées',
      payment: 'Virement ou PayPal',
      security: 'Communications chiffrées et sécurisées',
      backup: 'Possibilité de basculer en présentiel si besoin'
    }
  },
  
  'consultation-domicile': {
    id: 'consultation-domicile',
    title: 'Consultations à domicile',
    subtitle: 'Un accompagnement personnalisé dans votre environnement',
    description: 'Consultations individuelles ou familiales directement chez vous pour un confort optimal',
    price: 80,
    duration: 60,
    travelZone: 'Rosny-sous-Bois et communes limitrophes (15km max)',
    advantages: [
      'Confort de votre domicile',
      'Idéal pour les familles avec enfants',
      'Observation du contexte familial',
      'Pas de contrainte de déplacement',
      'Approche systémique possible'
    ],
    process: [
      {
        step: 1,
        title: 'Évaluation de faisabilité',
        description: 'Vérification de la zone géographique et des conditions pratiques'
      },
      {
        step: 2,
        title: 'Préparation de l\'espace',
        description: 'Conseils pour aménager un espace propice à la consultation'
      },
      {
        step: 3,
        title: 'Première visite',
        description: 'Découverte de votre environnement et premier entretien thérapeutique'
      },
      {
        step: 4,
        title: 'Suivi personnalisé',
        description: 'Accompagnement adapté à votre contexte familial et personnel'
      }
    ],
    targetAudience: [
      'Personnes à mobilité réduite',
      'Familles avec jeunes enfants',
      'Accompagnement couples et familles',
      'Situations d\'agoraphobie',
      'Préférence pour l\'environnement familier'
    ],
    practicalInfo: {
      schedule: 'Créneaux sur mesure selon disponibilités',
      travel: 'Frais de déplacement inclus dans le tarif',
      conditions: 'Espace calme et discret requis',
      limitation: 'Certains outils spécialisés non disponibles'
    }
  }
}

export const EMERGENCY_CONTACTS = [
  {
    name: 'Urgences médicales',
    number: '15',
    description: 'SAMU - Urgences vitales'
  },
  {
    name: 'Violence conjugale',
    number: '3919',
    description: 'Numéro national - 24h/24, 7j/7'
  },
  {
    name: 'SOS Amitié',
    number: '09 72 39 40 50',
    description: 'Écoute 24h/24'
  },
  {
    name: 'Suicide Écoute',
    number: '01 45 39 40 00',
    description: '24h/24, 7j/7'
  }
]