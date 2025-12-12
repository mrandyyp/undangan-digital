import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Comment {
    id: string;
    guest_name: string;
    comment: string;
    created_at: string;
}

export default function GuestCommentsPage() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchComments();

        // Real-time subscription
        const channel = supabase
            .channel('wedding_comments_page')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'wedding_comments',
                },
                (payload) => {
                    setComments((current) => [payload.new as Comment, ...current]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchComments = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('wedding_comments')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching comments:', error);
        } else {
            setComments(data || []);
        }
        setIsLoading(false);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return 'Baru saja';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;

        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="p-2 hover:bg-rose-50 rounded-full transition-colors"
                            aria-label="Kembali"
                        >
                            <ArrowLeft className="w-6 h-6 text-rose-600" />
                        </button>
                        <div>
                            <h1 className="font-serif text-2xl text-gray-800">Ucapan & Doa</h1>
                            <p className="text-sm text-gray-600">
                                {comments.length} ucapan dari tamu undangan
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
                    </div>
                ) : comments.length === 0 ? (
                    <div className="bg-white rounded-xl shadow p-12 text-center text-gray-500">
                        <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg">Belum ada ucapan.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {comments.map((commentItem) => (
                            <div
                                key={commentItem.id}
                                className="bg-white rounded-xl shadow-md p-6 transform hover:scale-[1.02] hover:shadow-lg transition-all"
                            >
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-rose-200 to-rose-300 rounded-full flex items-center justify-center">
                                        <span className="text-rose-600 font-semibold text-lg">
                                            {commentItem.guest_name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-800 truncate">
                                            {commentItem.guest_name}
                                        </h4>
                                        <span className="text-xs text-gray-500">
                                            {formatDate(commentItem.created_at)}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-gray-700 whitespace-pre-wrap break-words">
                                    {commentItem.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
