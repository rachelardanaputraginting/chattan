import App from "@/Layouts/App";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";

const sts = (x, y, option = "justify") => {
    if (option == "justify") {
        return x == y ? "justify-end" : "justify-start";
    }
    if (option == "background") {
        return x == y
            ? "text-green-900 flex items-end"
            : "text-gray-700 flex items-start";
    }

    if (option == "bubble") {
        return x == y ? "w-auto bg-green-100" : "w-auto  bg-gray-100";
    }
};

export default function Show(props) {
    const { auth } = usePage().props;

    const [typing, setTyping] = useState(false);

    const scrollRef = useRef(null);
    const messageRef = useRef(null);

    const { user, chats } = props;

    const { data, setData, reset, errors } = useForm({
        message: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();
        router.post(
            `/chat/${user.username}`,
            {
                ...data,
                message: data.message,
            },
            {
                onSuccess: () => {
                    reset("message");
                    scrollRef.current.scrollTo(0, 999999999);
                },
            }
        );
    };

    const onTyping = () => {
        setTimeout(() => {
            Echo.private(`chats.${user.uuid}`).whisper("isTyping", {
                name: user.name,
            });
        }, 500);
    };

    Echo.private("chats." + auth.user.uuid)
    .listenForWhisper('isTyping', () => {
        setTyping(true)

        setTimeout(() => setTyping(false), 5000)
    })
    .listen("MessageSent", () => {
        router.reload({
            preserveScroll: true,
            onSuccess: () => {
                scrollRef.current.scrollTo(0, 999999999);
            },
        });
    });
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
        }
        messageRef.current.focus();
    }, [chats]); //

    return (
        <div>
            <Head title={`Chat with ${user.username}`} />

            <div className="flex flex-col justify-between h-screen">
                <div className="border-b px-4 py-2">
                    <h1 className="font-semibold">{user.name}</h1>
                    {typing && (
                        <div className="text-xs text-gray-500">
                            is typing...
                        </div>
                    )}
                </div>
                <div
                    className="overflow-y-auto flex flex-col h-full px-4 py-2 space-y-2"
                    ref={scrollRef}
                >
                    {chats.length ? (
                        chats.map((chat) => (
                            <div
                                className={`flex text-sm
                            ${sts(auth.user.id, chat.sender_id)}`}
                                key={chat.id}
                            >
                                <div
                                    className={`p-4 rounded-xl w-3/4 flex flex-col  ${sts(
                                        auth.user.id,
                                        chat.sender_id,
                                        "background"
                                    )}`}
                                >
                                    <div
                                        className={`p-4 rounded-xl flex flex-col items-end ${sts(
                                            auth.user.id,
                                            chat.sender_id,
                                            "bubble"
                                        )}`}
                                    >
                                        {chat.message}
                                    </div>
                                    <span className="text-[10px]">
                                        {moment(chat.created_at)
                                            .locale("id")
                                            .format("HH:mm")}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500">
                            Start chat with someone...
                        </div>
                    )}
                </div>
                <div className="border-t">
                    <form onSubmit={submitHandler}>
                        <input
                            value={data.message}
                            onChange={(e) =>
                                setData({ ...data, message: e.target.value })
                            }
                            onKeyUp={onTyping}
                            type="text"
                            ref={messageRef}
                            name="message"
                            autoComplete={"off"}
                            id="message"
                            placeholder="Start typing..."
                            className="w-full px-4 py-2 border-none p-0 border-0 focus:ring-0 focus:ring-none"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

Show.layout = (page) => <App children={page} />;
