import { ReactElement, Fragment } from "react";
import { AlertProps, AlertTypeClasses } from "../../types";

const alertTypeClasses: AlertTypeClasses = {
  success:
    "bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-2 rounded relative",
  warning:
    "bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative",
};

export default function Alert({
  alertType,
  alertMessage,
}: AlertProps): ReactElement {
  return (
    <div className={alertTypeClasses[alertType]} role="alert">
      <span className="block sm:inline">{alertMessage}</span>
    </div>
  );
}
