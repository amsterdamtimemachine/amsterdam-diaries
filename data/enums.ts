export const AuthorPhotoData: Record<string, string[]> = {
  'berdi-pront': [
    'Dagboek van Berdi - Kaft',
    'Dagboek van Berdi - Binnenwerk',
    'Dagboek van Berdi - Binnenwerk 2',
    'Dagboek van Berdi - Binnenwerk - Krantenknipsels',
  ],
  'celina-veffer': [
    'Dagboek van Celina Veffer - Kaft',
    'Dagboek van Celina Veffer - Binnenwerk',
    'Dagboek van Celina Veffer - Binnenwerk 2',
    'Dagboek van Celina Veffer - Bon',
    'Celina Veffer - Foto - Collectie Verzetsmuseum Amsterdam',
    'Celina Veffer - Foto 2 - Collectie Verzetsmuseum Amsterdam',
    'Celina Veffer - Foto 3 - Collectie Verzetsmuseum Amsterdam',
    'Celina Veffer - Foto 4 - Collectie Verzetsmuseum Amsterdam',
  ],
  'dien-kiewit-de-jonge': [
    'Dagboek van Dien Kiewit de Jonge - Kaft',
    'Dagboek van Dien Kiewit de Jonge - Binnenwerk',
    'Dagboek van Dien Kiewit de Jonge - Binnenwerk 2',
    'Dagboek van Dien Kiewit de Jonge - Distributiebonnen',
    'Dagboek van Dien Kiewit de Jonge - Binnenwerk - Krant',
  ],
  'els-polak': [
    'Dagboek van Els Polak - Kaft',
    'Dagboek van Els Polak - Binnenwerk',
    'Els Polak - Foto',
    'Els Polak - Foto 2',
    'Els Polak - Foto 3',
    'Els Polak - Foto 4',
    'Els Polak - Foto 5',
  ],
  'gerda-oestreicher-laqueur': [
    'Dagboek van Gerda Oestreicher Laquer - Kaft',
    'Dagboek van Gerda Oestreicher Laquer - Binnenwerk',
    'Dagboek van Gerda Oestreicher Laquer - Foto',
    'Dagboek van Gerda Oestreicher Laquer - Foto 2',
    'Dagboek van Gerda Oestreicher Laquer - Schets',
    'Gerda Oestreicher Laquer - Foto',
    'Gerda Oestreicher Laquer - Foto 2',
    'Gerda Oestreicher Laquer - Foto 3',
    'Gerda Oestreicher Laquer - Foto 4',
  ],
  'neeltje-toby-vos': [
    'Dagboek van Neeltje (Toby) Vos - Kaft',
    'Dagboek van Neeltje (Toby) Vos - Binnenwerk',
    'Dagboek van Neeltje (Toby) Vos - Binnenwerk 2',
    'Dagboek van Neeltje (Toby) Vos - Kunst',
    'Dagboek van Neeltje (Toby) Vos - Schets',
    'Neeltje (Toby) Vos - Foto',
    'Neeltje (Toby) Vos - Foto 2',
    'Neeltje (Toby) Vos - Foto 3',
  ],
} as const;

export const AuthorDiaryPreviews: Record<string, string> = {
  'berdi-pront':
    'Ik ben Berdi Pront, 16 jaar oud en woon in Amsterdam. Ik zit in de 4e klas van de HBS. Ik ben Joods en heb een zusje van 14 jaar. Mijn vader is overleden en mijn moeder is ziek.',
  'celina-veffer':
    "Eigenlijk is Dinsdag geen goede dag om een dagboek te beginnen, maar 's Maandags had ik er nog niet aangedacht.",
  'dien-kiewit-de-jonge':
    'Onophoudelijke bombardementen door de geallieerden op Duits grondgebied. Italiaanse leger capituleert, Mussolini gevangen genomen, Badoglio neemt de legerleiding.',
  'els-polak':
    'Vanmorgen hebben we weer de Montessorischool bezocht. Het was veel rumoeriger in de klas als dan verleden keer.',
  'gerda-oestreicher-laqueur':
    "Ich war 4 Tage in A'dam. Sonderbarwie viel dort los ist. Gehöre ichdort noch hin? Freitag 15. Nov. Früh um 8 Uhr fuhrenwir mit Bhs. Forderen los.",
  'neeltje-toby-vos':
    'Eens zal ik een dame zijn van een jaar of veertig of misschien vijftig.Ik stel mij voor, dat ik dan op een zomerse dag in de Haarlemse tram zit omgroenteofaardappelente halen ten behoeve van mijn gezin.',
} as const;

export const AuthorDiaryOverviewGradients: Record<string, string> = {
  'berdi-pront': 'gradient-1',
  'celina-veffer': 'gradient-2',
  'dien-kiewit-de-jonge': 'gradient-3',
  'els-polak': 'gradient-4',
  'gerda-oestreicher-laqueur': 'gradient-2',
  'neeltje-toby-vos': 'gradient-1',
} as const;

export const ResourceInfo: Record<string, ResourceInfo | LocationResourceInfo | DateResourceInfo> = {
  organisaties: {
    title: 'Alle organisaties',
    description: 'Ontdek de diverse perspectieven over specifieke organisaties die terugkomen in diverse dagboeken.',
    defaultImage: 'default-organization.svg',
    readMore: 'Bekijk meer over {X}',
    overviewLabel: 'organisaties',
    table: 'organization',
    snippetField: 'identifyingid',
  },
  themas: {
    title: "Alle thema's",
    description: `Thema's worden beïnvloed door diverse perspectieven en grote gebeurtenissen.
  Schrijvers, als weerspiegeling van hun tijd, verwerken deze invloeden in hun werk, waardoor unieke en veelzijdige
  verhalen ontstaan.`,
    defaultImage: 'default-theme.svg',
    readMore: 'Bekijk dit thema',
    overviewLabel: "thema's",
    table: 'concept',
    snippetField: 'classifyingid',
  },
  personen: {
    title: 'Alle personen',
    description: 'Ontdek personen die worden genoemd in diverse dagboeken.',
    defaultImage: 'default-person.svg',
    readMore: 'Lees meer over {X}',
    overviewLabel: 'personen',
    table: 'person',
    snippetField: 'identifyingid',
  },
  dagboekschrijfsters: {
    title: 'Alle dagboekschrijfsters',
    description:
      'Ontdek de diverse perspectieven die dagboeken ons bieden en laat je inspireren door de persoonlijke verhalen van anderen.',
    defaultImage: 'default-author.svg',
    readMore: 'Lees meer over {X}',
    overviewLabel: 'schrijfsters',
    table: 'author',
    snippetField: 'identifyingid',
  },
  locaties: {
    title: 'Wat beleefden de dagboekschrijfsters in Amsterdam?',
    description: `In de dagboeken was veel aandacht voor de beslommeringen van alle dag. Onvermijdelijk drong ook de oorlog daarin
       door. Bekijk op deze kaart waar in Amsterdam het dagelijks leven van de dagboekschrijfsters zich afspeelde en
       wat ze erover in hun dagboeken noteerden.`,
    defaultLocation: 'http://www.wikidata.org/entity/Q727', // Amsterdam
    defaultLabel: `Dagboekteksten uit`,
    aboutLabel: `Dagboekteksten over`,
    table: 'resource',
    snippetField: 'identifyingid',
  },
  datums: {
    selectedDescription: `Dagboekpassages geschreven op __DATETIME__. Klik op andere geselecteerde data om te ontdekken wat er op een specifieke moment gebeurde in Amsterdam.`,
    description: `Klik op geselecteerde data om te ontdekken wat er op een specifieke moment gebeurde in Amsterdam.`,
    table: 'resource',
    snippetField: 'id',
  },
} as const;

export const AnnotationDetailsInfo: Record<string, AnnotationDetailsInfo> = {
  date: {
    icon: 'mdi-calendar',
    label: 'datum',
    variant: 'blue',
  },
  place: {
    icon: 'mdi-location',
    label: 'locatie',
    variant: 'green',
    useExternalLink: true,
  },
  etenswaren: {
    icon: 'gridicons:themes',
    label: 'topic',
    variant: 'purple',
    path: 'themas',
    useTypeForNameAndPath: true,
  },
  person: {
    icon: 'mdi-account',
    label: 'persoon',
    variant: 'blue',
    path: 'personen',
  },
  organization: {
    icon: 'bi:building',
    label: 'organisatie',
    variant: 'maroon',
    path: 'organisaties',
  },
} as const;
