const usePostHook = () => {
    const tabs = ref<{
        name: string;
        key: string;
    }[]>([
        {
            name: 'Table List',
            key: 'table',
        },
        {
            name: 'Box List',
            key: 'box',
        },
    ]);
    const currentTabs = ref<string>('table');
    return {
        tabs,
        currentTabs,
    };
};

export default usePostHook;
