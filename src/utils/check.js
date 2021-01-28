export default function (authority) {
    const authList = ['admin']
    return authList.some(it => authority.includes(it))
}