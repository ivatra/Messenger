import { create } from "zustand";
import produce from "immer";

import { IUser } from "../types/UserModel";
import { IUserStore, IUserStoreVariables } from "../types/UserStoreType";

import { api } from "../../../app";
import { SharedHelpers } from "../../../shared";


const initialState: IUserStoreVariables = {
    users: {},
    state: 'idle'
}


const baseUrl = 'content/user/get/'

export const useUserStore = create<IUserStore>()((set, get) => ({
    ...initialState,
    async receiveById(userId) {
        const request = () => api.post(`${baseUrl}get/${userId}`);

        const response = await SharedHelpers.handleRequest<IUser>(request, set);

        if (!response) return

        set(produce((state: IUserStore) => {
            state.users[response.id] = response
        }));
    },
}))

