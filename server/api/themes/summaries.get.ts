import { Themes, ThemeSummaryResp } from '~/types/themes.types';

/**
 * Handler Response Theme Summary
 * 
 * @return ThemeSummaryResp
 */
export default defineEventHandler<Promise<ThemeSummaryResp>>(async () => {
	const themes = await $fetch<Themes[]>(
		'https://685bc2c289952852c2dadda2.mockapi.io/api/databases?name=themes'
	);

  const themesData: Themes | null = themes.find((theme: Themes) => theme.name === 'themes') ?? null;

	return {
		all: themesData?.datas.length ?? 0,
	};
});
