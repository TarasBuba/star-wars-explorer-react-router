const OpeningCrawl = () => {
  return (
    <div className="crawl flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-black text-yellow-500 perspective-[400px]">
      <div className="crawl-container transform-[rotateX(25deg)]">
        <div className="crawl-content">
          <p>Episode IV</p>
          <h1>A NEW HOPE</h1>
          <p>
            It is a period of civil war. Rebel spaceships, striking from a
            hidden base, have won their first victory against the evil Galactic
            Empire.
          </p>
          <p>
            During the battle, Rebel spies managed to steal secret plans to the
            Empire's ultimate weapon, the DEATH STAR, an armored space station
            with enough power to destroy an entire planet.
          </p>
          <p>
            Pursued by the Empire's sinister agents, Princess Leia of Alderaan
            is forced to hide in secret plans to the Empire's ultimate weapon,
            the DEATH STAR, an armored space station with enough power to
            destroy an entire planet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OpeningCrawl;
