const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Logo / Name */}
                <div className="text-center md:text-left">
                    <h2 className="text-xl font-bold text-white">
                        MeetWith.dev ❤️
                    </h2>
                    <p className="text-sm mt-1">Match. Build. Collaborate.</p>
                </div>

            

                {/* Copyright */}
                <div className="text-xs text-gray-400">
                    © {new Date().getFullYear()} DevTinder. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
