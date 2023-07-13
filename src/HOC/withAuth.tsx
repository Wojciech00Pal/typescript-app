const withAuth = (WrappedComponent : any) =>
{
    return(props : any) => {
        const accessToken = localStorage.getItem("token");
        if(!accessToken){
            window.location.replace("/login"); //user not log in
            return null;
        }
        return <WrappedComponent {...props}/>
    }
}

export default withAuth;