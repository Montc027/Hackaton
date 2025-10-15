    import React from "react";
    import { Link } from "react-router-dom";

    function Header() {
    return (
        <header className="flex flex-col sm:flex-row items-center justify-center gap-15 py-6 bg-gray-50">
        
        <Link to="/">
            <img
            src="src/assets/logo.png"
            alt="Logo del proyecto"
            className="h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-52 lg:w-52 object-contain drop-shadow-lg mr-15"
            />
        </Link>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#003957] text-center tracking-wider leading-tight drop-shadow-lg">
            Ciudad Viva BCN
        </h1>
        
        </header>
    );
    }

    export default Header;
