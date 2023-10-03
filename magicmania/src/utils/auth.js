import decode from 'jwt-decode';


class GetUser {
    getProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token); 
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
            return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        return localStorage.getItem('authToken');
    }

    login(authToken) {
        localStorage.setItem('authToken', authToken);
        window.location.assign('/User');
    }

    logout() {
        localStorage.removeItem('authToken');
        // this will reload the page and reset the state of the application
        window.location.assign('/');
    }
}

export default new GetUser();