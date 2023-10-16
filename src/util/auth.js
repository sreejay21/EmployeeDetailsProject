export function getAuthToken(){
    const token=localStorage.getItem('authToken')
    return token;
}