    import React from "react";
        import { Link } from "react-router-dom";



    function Header() {
    return (
        <header className="flex items-center justify-center py-6 bg-gray-50">
        <Link to="/"><img src="src/assets/logo.png" alt="Logo del proyecto" className="h-24 w-24 sm:h-32 sm:w-32"/></Link>
        <h1 className="text-5xl sm:text-6xl font-bold text-black-800">Ciudad Viva BCN</h1>
        </header>
    );
    }

    export default Header;
