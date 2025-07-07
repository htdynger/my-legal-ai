import { create } from "zustand";

export const useChatStore = create((set, get)=> ({

    selectedChat: false,
    isExplainEnabled: false,

    sendButtonEnabled: true,
    setSendButtonEnabled: (boolean) => set(() => ({sendButtonEnabled: boolean})),

    setIsExplainEnabled: (boolean) => set({isExplainEnabled: boolean}),


    apiChatsData: [],
    setApiChatsData: (array) => set({apiChatsData: array}),



    unSelectChat: () => set({
        selectedChat: false,
        isExplainEnabled: false,
        sendButtonEnabled: true,
    }),
    
    handleSelectChat: (id) => {
        // const chat = get().data.find((e) => e.id === id);
        // set({ selectedChat: chat ? chat : false });

        set({ selectedChat: id ? id : false });
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
                    "message": "4343234 ipsum 4343234 sit lorem ipsum dolor sitlorem 4343234 dolor sit lorem 4343234 dolor sitlorem ipsum 4343234 sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sit",
                    "date": "1",
                },
            ]
        },

    ],


}))