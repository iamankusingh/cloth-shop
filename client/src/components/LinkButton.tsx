// main (primary) button of all places
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface buttonPrope {
  path: string;
  title: string;
}
const LinkButton: React.FC<buttonPrope> = ({ path, title }) => {
  return (
    <NavLink to={path}>
      <div>
        <Button>{title}</Button>
      </div>
    </NavLink>
  );
};

export default LinkButton;
