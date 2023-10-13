type TmdbButtonProps = {
  tmdbId: string | number;
  className?: string
};

export function TmdbButton({ tmdbId, className }: TmdbButtonProps) {
  return (
    <a className={`${className} flex justify-center items-center`} href={`https://www.themoviedb.org/movie/${tmdbId}`} target='_blank' rel="noreferrer noopener">
      <img width="160" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDB" />
    </a>
  );
}
