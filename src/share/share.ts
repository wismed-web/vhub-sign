import { fetchBodyForm, mEmpty } from "@/share/fetch";

export const loginOK = ref(false);
export const loginUser = ref("");
export const loginToken = ref(""); // without 'Bearer '

export const postLogin = async (uname: string, pwd: string) => {
    const mForm = new Map<string, any>([
        ["uname", uname.trim()],
        ["pwd", pwd.trim()],
    ]);
    const rt = (await fetchBodyForm(
        `/api/user/pub/sign-in`,
        "POST",
        mEmpty,
        mForm,
        ""
    )) as any[];
    if (rt[1] != 200) {
        alert(rt[0]);
        return false;
    }
    const auth: string = rt[0].auth;
    loginToken.value = auth.replace("Bearer ", "");
    return true;
};

export const postSignUp = async (uname: string, email: string, pwd: string) => {
    const mForm = new Map<string, any>([
        ["uname", uname.trim()],
        ["email", email.trim()],
        ["pwd", pwd.trim()],
    ]);
    const rt = (await fetchBodyForm(
        `/api/user/pub/sign-up`,
        "POST",
        mEmpty,
        mForm,
        ""
    )) as any[];
    if (rt[1] != 200) {
        alert(rt[0]);
        return false;
    }
    return true;
};

export const postEmailVerify = async (uname: string, code: string) => {
    const mForm = new Map<string, any>([
        ["uname", uname.trim()],
        ["code", code.trim()],
    ]);
    const rt = (await fetchBodyForm(
        `/api/user/pub/verify-email`,
        "POST",
        mEmpty,
        mForm,
        ""
    )) as any[];
    if (rt[1] != 200) {
        alert(rt[0]);
        return false;
    }
    return true;
};