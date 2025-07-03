import { create } from "zustand";

export const useChatStore = create((set, get)=> ({

    selectedChat: false,
    isExplainEnabled: false,

    sendButtonEnabled: true,
    setSendButtonEnabled: (boolean) => set(() => ({sendButtonEnabled: boolean})),

    setIsExplainEnabled: (boolean) => set({isExplainEnabled: boolean}),


    unSelectChat: () => set({
        selectedChat: false,
        isExplainEnabled: false,
        sendButtonEnabled: true,
    }),
    
    handleSelectChat: (id) => {
        const chat = get().data.find((e) => e.id === id);
        set({ selectedChat: chat ? chat : false });
    },
    hardSetSelectedChat: (object) => set({
        selectedChat: object,
    }),

    setData: (value) => set({data: value}),
    
    data: [

        {

            title: "как оправдать убийстSSSSSSSSSSSSво",
            id: "A1",
            message: [
                {
                    "author": "user",
                    "message": "lorem ipsum dolor sit lorem ipsum dolor sit",
                    "date": "1",
                },
                {
                    "author": "ai",
                    "title": "lorem ipsum",
                    "message": "lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sit",
                    "date": "1",
                },
            ]
        },

    ],


}))