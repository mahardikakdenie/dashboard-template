export type ThemeDatas = {
    id: string;
    created_at: string;
    author: string;
    image: string;
    name: string;
}

export type Themes = {
    name: string;
    createdAt: string;
    id: number;
    datas: ThemeDatas[];
}

export type ThemeResult = {
    themes: {
        name: string;
        image: string;
    },
    author: string;
}
