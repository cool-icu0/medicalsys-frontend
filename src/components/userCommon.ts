

export const defaultPicture = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

// @ts-ignore
export const jsonParseTag = (usersList) => {
    // @ts-ignore
    usersList.forEach(user => {
        if (user.tags) {
            user.tags = user.tags ? JSON.parse(user.tags) : '该用户暂未设置';
        }
    })
}