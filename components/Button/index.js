import {colors} from "../../styles/theme";

export default function Button({children, onClick}) {
  return (
    <>
      <button onClick={onClick}>{children}</button>
      <style jsx>{`
        button {
          align-items: center;
          background: ${colors.black};
          border-radius: 624.9375rem;
          border: 0;
          color: ${colors.white};
          cursor: pointer;
          display: flex;
          font-size: 1rem;
          font-weight: 800;
          padding: 0.5rem 1.5rem;
          transition: opacity 0.3s ease;
        }

        button > :global(svg) {
          margin-right: 0.5rem;
        }

        button:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  );
}
