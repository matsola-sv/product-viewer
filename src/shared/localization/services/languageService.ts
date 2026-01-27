import { getPublicUrl } from '@/shared/routing/urlHelpers';

import { AppLanguage } from '../models/language';

import { initI18n } from '../i18n';

export const languageService = (() => {
	return {
		/** Initialize i18next with detected or default language. */
		init: async (defaultLng?: AppLanguage): Promise<void> => {
			const lng = defaultLng ?? AppLanguage.en;

			// Init i18next singleton instance
			// fallbackLng - fallback language if translation is missing
			await initI18n({
				defaultLng: lng,
				fallbackLng: AppLanguage.en,
				loadPath: getPublicUrl('locales/{{lng}}/{{ns}}.json'),
			});
		},
	};
})();
