import { language } from "../../config";

import englishLang from "../../config/image/flag/uk.svg";
import chineseLang from "../../config/image/flag/china.svg";
import spanishLang from "../../config/image/flag/spain.svg";
import frenchLang from "../../config/image/flag/france.svg";
import italianLang from "../../config/image/flag/italy.svg";

const config = {
  defaultLanguage: language,
  options: [
    {
      languageId: "english",
      locale: "en",
      text: "English",
      icon: englishLang
    },
    {
      languageId: "chinese",
      locale: "zh",
      text: "Chinese",
      icon: chineseLang
    },
    {
      languageId: "spanish",
      locale: "es",
      text: "Spanish",
      icon: spanishLang
    },
    {
      languageId: "french",
      locale: "fr",
      text: "French",
      icon: frenchLang
    },
    {
      languageId: "italian",
      locale: "it",
      text: "Italian",
      icon: italianLang
    }
  ]
};

export function getCurrentLanguage(lang) {
  let selecetedLanguage = config.options[0];
  config.options.forEach(language => {
    if (language.languageId === lang) {
      selecetedLanguage = language;
    }
  });
  return selecetedLanguage;
}
export default config;
