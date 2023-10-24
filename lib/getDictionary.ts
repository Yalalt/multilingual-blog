const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  de: () => import('../dictionaries/de.json').then((module) => module.default),
  mn: () => import('../dictionaries/mn.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  if (!locale || locale === undefined) {
    return dictionaries['en']();
  } else if (locale === 'de') {
    return dictionaries['de']();
  } else if (locale === 'mn') {
    return dictionaries['mn']();
  } else {
    return dictionaries['en']();
  }
};
