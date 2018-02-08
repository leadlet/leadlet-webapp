export function isAuthorized(allowedAuthorities) {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if( user && user.authorities && allowedAuthorities){
        let overlappedAuthorities = user.authorities.map(auth => (auth.name)).filter(authName => allowedAuthorities.includes(authName));
        return overlappedAuthorities.length > 0;

    } else if( !allowedAuthorities ){
        return true;
    } else{
        return false;
    }
}