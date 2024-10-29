interface Props {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeSelector: React.FC<Props> = ({ theme, setTheme }) => {
  const themeOptions = ["light", "dark", "cyberpunk", "retro", "lemonade"];

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn">
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] w-52 rounded-box bg-base-300 p-2 shadow-2xl"
      >
        {themeOptions.map((themeValue) => (
          <li key={themeValue}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
              aria-label={
                themeValue.charAt(0).toUpperCase() + themeValue.slice(1)
              }
              value={themeValue}
              checked={theme === themeValue}
              onChange={() => setTheme(themeValue)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelector;
