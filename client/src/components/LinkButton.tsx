// main (primary) button of all places
import { NavLink } from "react-router-dom";

interface buttonPrope {
  path: string;
  title: string;
}
const LinkButton: React.FC<buttonPrope> = ({ path, title }) => {
  return (
    <NavLink to={path} className="button">
      {title}
    </NavLink>
  );
};

export default LinkButton;
