export const Label = ({ htmlFor, children }) => {
    return (
      <label
        htmlFor={htmlFor}
        className="font-semibold dark:text-white text-primary text-xl"
      >
        {children}
      </label>
    );
  };

export const LabelWithBadge = ({ children, className, htmlFor, badge = 0 }) => {
    if (!badge) return <Label htmlFor={htmlFor}>{children}</Label>;
  
    return (
      <div className="relative">
        <Label htmlFor={htmlFor}>{children}</Label>
        <span
          className={
            className +
            " dark:bg-dark-subtle bg-light-subtle text-white absolute h-5 w-5 rounded-full p-1 flex justify-center items-center "
          }
        >
          {badge}
        </span>
      </div>
    );
  };

export const ViewAllBtn = ({ children, onClick, visible }) => {
    if (!visible) return null;
  
    return (
      <button
        onClick={onClick}
        type="button"
        className="dark:text-dark-subtle text-secondary dark:hover:text-white hover:text-primary transition"
      >
        {children}
      </button>
    );
  };