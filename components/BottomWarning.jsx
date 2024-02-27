import {Link} from "react-router-dom";
export function BottomWarning({label, buttonText, toWhere}){
    return (
        <div className="py-2 text-sm flex justify-center">
            <div>
                {label}
            </div>
            <Link className="underline pl-1 cursor-pointer hover:text-blue-500 hover:underline" to={toWhere}>{buttonText}</Link>
        </div>
    )
};