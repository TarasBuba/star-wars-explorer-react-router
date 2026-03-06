


const MainLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
            <header>
                <nav>
                    <ul className="flex justify-center gap-4 p-4 bg-gray-800 text-amber-400">
                        <li>
                            <a href="/" className="hover:underline">Home</a>
                        </li>
                        <li>                    <a href="/people" className="hover:underline">People</a>
                        </li>
                        <li>                    <a href="/films" className="hover:underline">Films</a>
                        </li>
                        <li>                    <a href="/planets" className="hover:underline">Planets</a>
                        </li>
                        <li>                    <a href="/species" className="hover:underline">Species</a>
                        </li>
                        <li>                    <a href="/starships" className="hover:underline">Starships</a>
                        </li>
                        <li>                    <a href="/vehicles" className="hover:underline">Vehicles</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                {children}
            </main>
        </>
    )
}

export default MainLayout;