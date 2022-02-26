import { ReactElement } from "react";
import { ChildrenProps } from "../../types";

const MainSection = ({ children }: ChildrenProps): ReactElement => {
  return (
    <main className="h-full overflow-y-auto">
      <div className="container px-6 mx-auto grid">{children}</div>
    </main>
  );
};

export default MainSection;
