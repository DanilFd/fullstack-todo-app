import {BrowserRouter} from "react-router-dom";
import {useRoutes} from "./useRoutes";
import {useAuth} from "./hooks/useAuth";
import {Header} from "./components/header/Header";
import {AuthContext} from "./context/AuthContext";
import {useEffect} from "react";
import Loading from "./components/loading/Loading";

function App() {
    const {isAuth, registration, logout, login, isLoading, checkAuth, user, error} = useAuth()
    const routes = useRoutes(isAuth)
    useEffect(() => {
        if (localStorage.getItem("token")) {
            checkAuth().then()
        }
    }, [checkAuth])
    if (isLoading) {
        return <Loading/>
    }
    return (
        <AuthContext.Provider value={{isAuth, registration, logout, login, user, error}}>
            <BrowserRouter>
                {isAuth && <Header/>}
                {routes}
            </BrowserRouter>
        </AuthContext.Provider>


    );
}

export default App;
