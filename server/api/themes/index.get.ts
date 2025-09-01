import { Themes } from "~/types/themes.types";

export default defineEventHandler(async () => {
  const themes = await $fetch<Themes[]>('https://685bc2c289952852c2dadda2.mockapi.io/api/databases?name=themes');
  return themes[0].datas.map((data) => ({
    themes: {
        id: data.id ?? '',
        name: data.name,
        image: data.image,
        created_at: new Date(data.created_at)
    },
    author: data.author,
    created_at: themes[0].createdAt,
    actions: null,
  }));
});
