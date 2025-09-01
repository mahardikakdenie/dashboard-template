import { Themes } from "~/types/themes.types";

export default defineEventHandler(async () => {
  const themes = await $fetch<Themes[]>('https://685bc2c289952852c2dadda2.mockapi.io/api/databases?name=themes');
  return themes[0].datas.map((data) => ({
    themes: {
        name: data.name,
        image: data.image
    },
    author: data.author,
    actions: null,
  }));
});
