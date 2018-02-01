export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.id_token) {
        return { 'Authorization': 'Bearer ' + user.id_token };
    } else {
        return {};
    }
}