const usePostHook = () => {
    const tabs = ref<{
        name: string;
        key: string;
    }[]>([
        {
            name: 'table_list',
            key: 'table',
        },
        {
            name: 'box_list',
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
