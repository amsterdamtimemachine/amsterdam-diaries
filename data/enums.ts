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
  ],
  'dien-kiewit-de-jonge': [
    'Dagboek van Dien Kiewit de Jonge - Kaft',
    'Dagboek van Dien Kiewit de Jonge - Binnenwerk',
    'Dagboek van Dien Kiewit de Jonge - Binnenwerk 2',
    'Dagboek van Dien Kiewit de Jonge - Distributiebonnen',
    'Dagboek van Dien Kiewit de Jonge - Binnenwerk - Krant',
  ],
  'els-polak': ['Dagboek van Els Polak - Kaft', 'Dagboek van Els Polak - Binnenwerk'],
  'gerda-oestreicher-laqueur': [
    'Dagboek van Gerda Oestreicher Laquer - Kaft',
    'Dagboek van Gerda Oestreicher Laquer - Binnenwerk',
    'Dagboek van Gerda Oestreicher Laquer - Foto',
    'Dagboek van Gerda Oestreicher Laquer - Geboorte kinderen',
    'Dagboek van Gerda Oestreicher Laquer - Schets',
  ],
  'toby-vos': [
    'Dagboek van Toby Vos - Kaft',
    'Dagboek van Toby Vos - Binnenwerk',
    'Dagboek van Toby Vos - Binnenwerk 2',
    'Dagboek van Toby Vos - Kunst',
    'Dagboek van Toby Vos - Schets',
  ],
} as const;
