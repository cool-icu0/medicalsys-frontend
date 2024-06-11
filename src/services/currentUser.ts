import MyAxios from "../config/myAxios.js";


export const getCurrent = async () => {
    let getCurrentUser = await MyAxios.get("/user/current")
    // @ts-ignore
    sessionStorage.setItem("longUser", getCurrentUser ? JSON.stringify(getCurrentUser) : JSON.stringify({}))
    return getCurrentUser.data
}

export default getCurrent