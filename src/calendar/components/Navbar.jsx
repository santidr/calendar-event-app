export const Navbar = () => {
    return (
        <div className="navbar navbar-dark bg-dark mb-3 px-4">
            <span className="navbar-brand">
                <i className="fa-regular fa-calendar"></i>
                &nbsp;
                Santiago
            </span>
            <button className="btn btn-outline-danger">
                <i className="fas fa-sign-out-alt me-2"></i>
                <span>Salir</span>
            </button>
        </div>
    )
}
