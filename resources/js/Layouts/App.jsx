import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";

export default function App({ title, children }) {
    const {users} = usePage().props;
    return (
        <div className="flex min-h-screen">
            <Head title={title} />
            <div className="w-1/3">
                <div className="w-1/3 fixed h-full p-x6 py-4 text-right text-right border-r space-y-2">
                    {users.map((user) => (
                        <Link key={user.id} href={route('chat.show', user.username)} className={`block ${route().current('chat.show', user.username) ? 'text-gray-900' : 'text-gray-600'}`}>{user.name}</Link>
                    ))}
                </div>
            </div>
            <div className="w-2/3">{children}</div>
        </div>
    );
}
