import { fetchBodyForm, fetchNoBody, mEmpty, fetchErr } from "@/share/fetch";

export const loginOK = ref(false);
export const loginUser = ref("");
export const loginToken = ref(""); // without 'Bearer '
export const CaptchaOK = ref(false)

export const getPing = async () => {
    const rt = await fetchNoBody(`/api/system/ver`, "GET", mEmpty, "");
    const err = await fetchErr(rt)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
};

export const getPwdRule = async () => {
    const rt = await fetchNoBody(`/api/user/pub/pwdrule`, "GET", mEmpty, "");
    const err = await fetchErr(rt)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    }
};

export const postLogin = async (uname: string, pwd: string) => {
    const mForm = new Map<string, any>([
        ["uname", uname.trim()],
        ["pwd", pwd.trim()],
    ]);
    const rt = await fetchBodyForm(`/api/user/pub/sign-in`, "POST", mEmpty, mForm, "");
    const err = await fetchErr(rt)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    }
};

export const postSignUp = async (uname: string, email: string, pwd: string) => {
    const mForm = new Map<string, any>([
        ["uname", uname.trim()],
        ["email", email.trim()],
        ["pwd", pwd.trim()],
    ]);
    const rt = await fetchBodyForm(`/api/user/pub/sign-up`, "POST", mEmpty, mForm, "");
    const err = await fetchErr(rt)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    }
};

export const postEmailVerify = async (uname: string, code: string) => {
    const mForm = new Map<string, any>([
        ["uname", uname.trim()],
        ["code", code.trim()],
    ]);
    const rt = await fetchBodyForm(`/api/user/pub/verify-email`, "POST", mEmpty, mForm, "");
    const err = await fetchErr(rt)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    }
};
