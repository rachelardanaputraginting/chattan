<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Chat;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function store(Request $request, User $user)
    {

        $timestamp = Carbon::now('Asia/Jakarta');

        // Membuat objek Carbon dari timestamp
        $carbon = Carbon::parse($timestamp);

        $request->validate([
            "message" => ['required'],
        ]);

        $chat = Auth::user()->chats()->create([
            "message" => $request->message,
            "receiver_id" => $user->id,
            "created_at" => $carbon,
        ]);

        broadcast(new MessageSent($chat))->toOthers();

        return back();
    }

    public function show(User $user)
    {

        $chats = Chat::where(
            fn ($q) => $q->where('sender_id', Auth::id())->where('receiver_id', $user->id)
        )->orWhere(
            fn ($q) => $q->where('sender_id', $user->id)->where('receiver_id', Auth::id())
        )->get();


        return inertia('Chats/Show', [
            "user" => $user,
            "chats" => $chats
        ]);
    }
}
