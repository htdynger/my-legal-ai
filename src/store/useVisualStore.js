import { create } from "zustand";

export const useVisualStore = create((set)=> ({
    isSidebarHidden: false,
    toggleSidebar: () => set((state)=> ({isSidebarHidden: !state.isSidebarHidden})),

    visiblePage: 'none',
    setVisiblePage: (value) => set(() => ({visiblePage: value})),

    isMobileSidebarHidden: true,
    setIsMobileSidebarHidden: (boolean) => set(() => ({isMobileSidebarHidden: boolean})),

    isChatOpened: false,
    toggleChat: () => set((state)=> ({isChatOpened: true, chatInstantEnabled: true})),
    closeChat: () => set((state)=> ({isChatOpened: false, chatInstantEnabled: false})),

    chatInstantEnabled: false,
    setChatInstantEnabled: (value) => set((state) => ({chatInstantEnabled: value})),

    visualPathname: '/',
    setVisualPathname: (value) => set(() => ({visualPathname: value})),

    windowLayout: {
        width: 1980,
        height: null,
    },

    setLayoutWidth: (int) => set((state) => ({windowLayout: {
        ...state.windowLayout,
        width: int,
    }})),

    pointerEvents: true,

    disablePointerEvents: (timeout) => {

        set({ pointerEvents: false })

        setTimeout(() => {
            set({ pointerEvents: true })
        }, timeout)
    } 

    
    
}))