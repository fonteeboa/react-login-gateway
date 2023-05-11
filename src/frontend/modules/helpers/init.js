import { postService } from './requests'

export const validAuthCookie = async () => {
    const authToken = await sessionStorage.getItem('authToken');
    if (authToken == undefined || authToken == null) return false;

    const response = await postService('/initAuth');
    return response !== false && response.ok ? true : false;
};
