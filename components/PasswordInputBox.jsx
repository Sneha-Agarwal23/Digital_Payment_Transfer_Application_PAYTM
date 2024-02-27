export function PasswordInputBox({label, placeholder, onChange}) {
    return (
        <div>
            <div className="text-sm font-medium text-left py-2"> 
                {label}
            </div>
            <input type="password" onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-300"></input>
        </div>
    )
}