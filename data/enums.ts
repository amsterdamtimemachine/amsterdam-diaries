export const AnnotationDefault = {
  icon: 'mdi:menu',
  lblType: 'titel',
  variant: 'blue',
  lblUrl: '',
  isExternal: false,
} as const;

export const AnnotationPlace = {
  icon: 'mdi-location',
  lblType: 'locatie',
  variant: 'green',
  lblUrl: 'bekijk locaties in Amsterdam',
  isExternal: false,
} as const;

export const AnnotationDate = {
  icon: 'mdi-calendar',
  lblType: 'datum',
  variant: 'blue',
  lblUrl: '',
  isExternal: true,
} as const;

export const AnnotationOrganization = {
  icon: 'mdi-domain',
  lblType: 'organisatie',
  variant: 'blue',
  lblUrl: '',
  isExternal: true,
} as const;

export const AnnotationPerson = {
  icon: 'mdi-account',
  lblType: 'persoon',
  variant: 'blue',
  lblUrl: '',
  isExternal: true,
} as const;

export const AnnotationTheme = {
  icon: 'gridicons:themes',
  lblType: 'topic',
  variant: 'purple',
  lblUrl: '',
  isExternal: false,
} as const;

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
