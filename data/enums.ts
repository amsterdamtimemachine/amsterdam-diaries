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
