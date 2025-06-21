import { create } from "zustand";

export const useVisualStore = create((set)=> ({
    isSidebarHidden: false,
    toggleSidebar: () => set((state)=> ({isSidebarHidden: !state.isSidebarHidden})),

    isChatOpened: false,
    toggleChat: () => set((state)=> ({isChatOpened: true, chatInstantEnabled: true})),
    closeChat: () => set((state)=> ({isChatOpened: false, chatInstantEnabled: false})),

    chatInstantEnabled: false,
    setChatInstantEnabled: (value) => set((state) => ({chatInstantEnabled: value})),

    pointerEvents: true,

    disablePointerEvents: (timeout) => {

        set({ pointerEvents: false })

        setTimeout(() => {
            set({ pointerEvents: true })
        }, timeout)
    } 

    
    
}))