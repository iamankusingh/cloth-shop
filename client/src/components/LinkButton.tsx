// main (primary) button of all places
import { NavLink } from "react-router-dom";

interface buttonPrope {
  path: string;
  title: string;
}
const LinkButton: React.FC<buttonPrope> = ({ path, title }) => {
  return (
    <NavLink
      to={path}
      className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {title}
    </NavLink>
  );
};

export default LinkButton;
